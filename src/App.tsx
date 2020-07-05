import React, { useState, useEffect, useContext } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { FirebaseContext } from "./components/Firebase";

interface IFirstValue {
  total: number;
  date: {
    nanoseconds: number;
    seconds: number;
  };
}

function App() {
  const [firstValue, updateFirstValue] = useState<IFirstValue | undefined>();
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase?.updateStartFrom().then((doc) => {
      const data: any = doc.data();
      // console.log("============= data =============");
      // console.log(doc.id);
      // console.log(data);
      // console.log("============= data =============");
      updateFirstValue(data);
    });
  }, [firebase, firstValue]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Ubah Data</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Laporan {firstValue?.total}
        </a>
      </header>
    </div>
  );
}

export default App;
