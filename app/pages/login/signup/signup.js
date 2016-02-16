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
  
  userInput(event){
    this.signupUser.name = event.target.value;
  }
  
  doSignup () {
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
        
        // dismiss signup page
        _this.dismiss(userData);
      }
    });
  }
  
  
    // can send data back to login page
  dismiss(data){
    data = "hi";
    this.viewCtrl.dismiss(data); 
  }

}
