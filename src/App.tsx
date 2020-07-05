import React, { useState, useEffect, useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { FirebaseContext } from "./components/Firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    textFieldRoot: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

function App() {
  const classes = useStyles();
  const [penerimaan, updatePenerimaan] = useState<number | "">("");
  const [penyaluran, updatePenyaluran] = useState<number | "">("");
  const [listPenerimaan, updateListPenerimaan] = useState<any[]>([]);
  const [listPenyaluran, updateListPenyaluran] = useState<any[]>([]);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    // firebase?.getListIncoming().then((querySnapshot) => {
    //   const data = querySnapshot.docs.map((doc: any) => doc.data());
    //   updateListPenerimaan(data);
    // });

    const incomingUnsub = firebase
      ?.getListIncoming()
      .onSnapshot((snapshot: any) => {
        const semuaPenerima = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        updateListPenerimaan(semuaPenerima);
      });

    const outgoingUnsub = firebase
      ?.getListOutgoing()
      .onSnapshot((snapshot: any) => {
        const semuaPenyalur = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        updateListPenyaluran(semuaPenyalur);
      });

    return () => {
      incomingUnsub();
      outgoingUnsub();
    };
  }, [listPenerimaan, listPenyaluran, firebase]);

  const onChangePenerimaan = (event: any) => {
    if (Number(event.target.value)) {
      updatePenerimaan(parseInt(event.target.value, 10));
    } else {
      updatePenerimaan("");
    }
  };

  const onChangePenyaluran = (event: any) => {
    if (Number(event.target.value)) {
      updatePenyaluran(parseInt(event.target.value, 10));
    } else {
      updatePenyaluran("");
    }
  };

  const submitPenerimaan = () => {
    const currentInput = parseInt(String(penerimaan), 10);

    if (currentInput) {
      firebase?.insertIncoming(currentInput);
    } else {
      console.error("Invalid input penerimaan");
    }

    updatePenerimaan("");
  };

  const submitPenyaluran = () => {
    const currentInput = parseInt(String(penyaluran), 10);

    if (currentInput) {
      firebase?.insertOutgoing(currentInput);
    } else {
      console.error("Invalid input penyaluran");
    }

    updatePenyaluran("");
  };

  return (
    <div className={classes.layout}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.textFieldRoot}>
                <TextField
                  type="number"
                  id="penerimaan"
                  label="Penerimaan"
                  style={{ margin: 8 }}
                  placeholder="Masukkan angka penerimaan"
                  helperText="Penerimaan hari ini"
                  margin="normal"
                  value={penerimaan}
                  onChange={onChangePenerimaan}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={submitPenerimaan}
                >
                  Simpan
                </Button>
              </div>
              <div className={classes.textFieldRoot}>
                <TextField
                  type="number"
                  id="penyaluran"
                  label="Penyaluran"
                  style={{ margin: 8 }}
                  placeholder="Masukkan angka penyaluran"
                  helperText="Penyaluran hari ini"
                  margin="normal"
                  value={penyaluran}
                  onChange={onChangePenyaluran}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onClick={submitPenyaluran}
                >
                  Simpan
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Typography>Penerimaan</Typography>
              <Divider />
              <List>
                {listPenerimaan &&
                  listPenerimaan.map((data, index) => {
                    return (
                      <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Typography component="span">
                                {data.total}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Typography>Penyaluran</Typography>
              <Divider />
              <List>
                {listPenyaluran &&
                  listPenyaluran.map((data, index) => {
                    return (
                      <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Typography component="span">
                                {data.total}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Stok Akhir</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <a
                className="App-link"
                href="https://terpusat.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Print Laporan
              </a>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
