import React from "react";
import { IFirebaseClass } from './../../connection';

const FirebaseContext = React.createContext<IFirebaseClass | null>(null);

export default FirebaseContext;
