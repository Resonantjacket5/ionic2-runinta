import {Page, NavController, ViewController} from 'ionic/ionic';
import {AuthService} from '../../../providers/auth-service/auth-service';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login/signup/signup.html',
  providers: [AuthService]
})
export class SignupPage {
  constructor(
    nav: NavController, 
    viewCtrl: ViewController
    auth: AuthService) 
  {
    _this = this;
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    this.auth = auth;
    this.ref = this.auth.getFireBaseRef();
    
    this.signupUser = {
      email: "",
      password: "",
      name: ""
    }
  }
  
  emailInput(event){
    this.signupUser.email=event.target.value;
  }
  
  passwordInput(event){
    this.signupUser.password = event.target.value; 
  }
  
  nameInput(event){
    this.signupUser.name = event.target.value;
  }
  
  doSignup () {
    
    let _this = this;
    this.ref.createUser({
      email: this.signupUser.email,
      password: this.signupUser.password
    }, function (error, userData){
      if (error) {
        console.log("Signup Failed!", error);
      } else {
        // signup success
        console.log("Successfully created user:", userData.uid);
        
        // should probably say succeed
        
        _this.auth.doLogin(_this.signupUser.email,_this.signupUser.password)
        .then(function(succeed){
          
          // after logged in 
          // add user to public list
          console.log("Login succeed in signup.js");
          
          _this.ref.child('userspublic').child(_this.auth.getUserID()).set({
            name: _this.signupUser.name,
            uid: _this.auth.getUserID()});
          
          _this.ref.child('users').child(_this.auth.getUserID()).set({
            name: _this.signupUser.name,
            friends: []
          });
          
          
          // dismiss signup page
          _this.dismiss();
        })
        .catch( function(error){
          console.log("fail login on signup.js");
        });
        
      }
    });
  }
  
  
    // can send data back to login page
  dismiss(data){
    data = "hi";
    this.viewCtrl.dismiss(data); 
  }

}
