import React,{Component} from 'react';
const firebase=require('firebase');
var firebaseConfig = {
   apiKey: "AIzaSyBeT7Sf_XiwnDf6vR_22WLT8NX-U3U57XE",
   authDomain: "authenticatereact.firebaseapp.com",
   databaseURL: "https://authenticatereact.firebaseio.com",
   projectId: "authenticatereact",
   storageBucket: "",
   messagingSenderId: "184241986624",
   appId: "1:184241986624:web:3d4b7c8c0a622474"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

export default class Authen extends Component {
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email"/><br/>
        <input id="pass" ref="pass" type="password" placeholder="Enter your password"/><br/>

      </div>
    );
  }
}
