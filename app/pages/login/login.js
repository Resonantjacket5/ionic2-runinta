import {Page, Modal, ViewController, NavController} from 'ionic/ionic';
//import {TabsPage} from './pages/tabs/tabs';
import {AuthService} from '../../providers/auth-service/auth-service';
import {SignupPage} from './signup/signup';

//import {Component,FormBuilder, Validators} from 'angular2/common';

@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthService]
})

export class LoginPage {
  constructor( viewCtrl: ViewController, auth: AuthService, nav: NavController) {
    _this = this;
    // needed to dismiss LoginModal
    this.viewCtrl = viewCtrl;
    this.nav = nav;
    this.auth = auth;
    
    
    //this.ref=new Firebase("https://runinto.firebaseio.com");
    this.ref = this.auth.getFireBaseRef();
    this.ref.onAuth(this.authDataCallback);
    
    this.user = {
      email:"",
      password:""
    }
  }
  
  emailInput(event){
    this.user.email = event.target.value; 
  }
  
  passwordInput(event){
    this.user.password = event.target.value; 
  }
  
  doLogin () {
    
    // must set self to this
    // so one can access the login.js this parameter
    // inside the callback
    let _this = this;
    console.log(this.auth.doLogin(this.auth.doLogin(this.user.email,this.user.password));
    
    this.auth.doLogin(this.user.email,this.user.password)
    .then(function(succeed){
      console.log("succeed login on login.js"); 
      _this.dismiss();
    })
    .catch(function(error){
      console.log("fail login on login.js");
    });
    
//    let self = this;
//    
//    this.ref.authWithPassword({
//      email : this.user.email,
//      password: this.user.password
//    }, function (error, authData){
//      
//      if (error) {
//        console.log("Login Failed!", error);
//      } else {
//        console.log("Authenticated successfuly with payload:", authData);     
//        
//        
//        // when login correctly, save user Data and dismiss login modal
//        self.auth.saveUserData(authData);
//        self.dismiss(/*authData*/);
//      }
//    });*/
  }
  
  /*
    Convert SignupPage component into a Modal
    fetch the signup data (but do nothing with it for now, 
    could be extended to automatically login user)
    Then use navController to present the modal
  */
  openSignupModal() {
    let signupModal = Modal.create(SignupPage);
    this.nav.present(signupModal);
    signupModal.onDismiss(data => {
      /*if(data!=null){
        this.doLogin();
      }*/
    });
  }
  
  // commented out sending data to tabs page
  // from login page using dismiss and OnDismiss
  dismiss(/*data*/) {
    this.viewCtrl.dismiss(/*data*/); 
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
  
  
