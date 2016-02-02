import {Page} from 'ionic/ionic';
//import {AuthService}
//import {Component,FormBuilder, Validators} from 'angular2/common';

@Page({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  constructor() {
    
    this.ref=new Firebase("https://runinto.firebaseio.com");
    this.ref.onAuth(authDataCallback);
    console.log(Firebase);
    
    
    this.movie = {
      title: "Dinosaur"
    }
    
    this.user = {
      email:"",
      password:""
    }
  }
  
  searchMovie(text){
    console.log(text);
    console.log(text.value);
    console.log("hi");
    //this.movie.title = event.target.value;
  }
  
  emailInput(event){
    this.user.email = event.target.value; 
  }
  
  passwordInput(event){
    this.user.password = event.target.value; 
  }
  
  doLogin () {
    
    this.ref.authWithPassword({
      email : this.user.email,
      password: this.user.password
    }, this.authHandler);
    
    /*
      this is for $authWithPassword by 
      firebaseAngular but currently using
      basic firebase
      
    .then( function(authData) {
      alert("login success ");
      console.log("Logged in as:", authData.uid);
      // go to
      //$state.go('tab.dash',{inherit:false});
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });//*/
  }
  
  authHandler (error, authData) {
    if(error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfuly with payload:", authData);
    }
  }
  
}
    
    
//    
//    this.loginForm= form.group({
//      email: ["", Validators.required],
//      password: ["", Validators.required]
//    });
//    
//    
//    
//    this.user = {
//      email:"",
//      password:""
//    }//*/
  
  
  // Create a callback which logs the current auth state
  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }
  }


  /*
  

 

  //console.log(usersRef);

  function doLogin(event)
  {
    console.log("hiajsiodjf");

  }

  
  //*/

  
  //console.log($firebaseAuth);
