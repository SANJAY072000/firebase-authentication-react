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
  constructor(props){
    super(props);
    this.state = {
      err:'',
      url:''
    };
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
    this.logout=this.logout.bind(this);
    this.google=this.google.bind(this);
  }
  login(e){
    const email=this.refs.email.value,pass=this.refs.pass.value;
    console.log(email);
    console.log(pass);
    const auth=firebase.auth();
    auth.signInWithEmailAndPassword(email,pass)
        .then(user=>{
          let lout=document.getElementById('logout');
          lout.classList.remove('hide');
        })
        .catch(err=>{
          console.log(err.message);
          this.setState({err:err.message});
        });
  }
  signup(e){
    const email=this.refs.email.value,pass=this.refs.pass.value;
    console.log(email);
    console.log(pass);
    const auth=firebase.auth();
    auth.createUserWithEmailAndPassword(email,pass)
        .then(user=>{
          let err="Welcome, "+user.user.email;
          firebase.database().ref('users/'+user.user.uid).set({email:user.user.email});
          console.log(user);
          this.setState({err:err});
        })
        .catch(err=>{
          console.log(err.message);
          this.setState({err:err.message});
        });
  }
  logout(e){
    const auth=firebase.auth();
    auth.signOut()
        .then(()=>{
          let lout=document.getElementById('logout');
          lout.classList.add('hide');
        })
  }
  google(e){
    console.log('Redirect method');
    let provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
            .then(res=>{
              const user=res.user;
              console.log(res);
              firebase.database().ref(`users/${user.uid}`).set({
                email:user.email,
                name:user.displayName
              });
              this.setState({url:user.photoURL});
            })
            .catch(err=>{
              let msg=err.message;
              console.log(msg);
            });

  }
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email"/><br/>
        <input id="pass" ref="pass" type="password" placeholder="Enter your password"/><br/>
        <p>{this.state.err}</p>
        <button onClick={this.login} id="login">Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log Out</button><br/>
        <button onClick={this.google} id="google" className="google">SignIn with google</button>
        <br/>
        <br/>
        <img src={this.state.url} style={{"height":"200px","width":"200px"}}/>

      </div>
    );
  }
}
