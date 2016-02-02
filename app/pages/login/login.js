import {Page, ViewController} from 'ionic/ionic';
//import {TabsPage} from './pages/tabs/tabs';
 
//import {AuthService}
//import {Component,FormBuilder, Validators} from 'angular2/common';

@Page({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  constructor( viewCtrl: ViewController) {
    
    this.viewCtrl = viewCtrl;
    
    this.ref=new Firebase("https://runinto.firebaseio.com");
    this.ref.onAuth(this.authDataCallback);
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
    
    let self = this;
    
    this.ref.authWithPassword({
      email : this.user.email,
      password: this.user.password
    }, function (error, authData){
      
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfuly with payload:", authData);
        self.dismiss(authData);
      }
    });
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data); 
  }
  
  // Create a callback which logs the current auth state
  authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      
    } else {
      console.log("User is logged out");
    }
  }
  
}
  
  
