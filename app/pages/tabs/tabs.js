import {Page, Modal, NavController} from 'ionic/ionic';
import {Page1} from '../page1/page1';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';
import {LoginPage} from '../login/login';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  constructor(nav: NavController) {
    
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Page1;
    this.tab2Root = Page2;
    this.tab3Root = Page3;
    
    
    this.nav = nav;
    
    this.ref=new Firebase("https://runinto.firebaseio.com");
    
    
    //this.ref.onAuth(this.authDataCallback);
    
    let self = this;
    
    this.ref.onAuth(function(authData){
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);

      } else {
        console.log("User is logged out");
        self.presentLogin();
      }
    });
  }
  
  
  presentLogin() {
    let loginModal = Modal.create(LoginPage);
    loginModal.onDismiss(data => {
      console.log(data);
    });
    this.nav.present(loginModal);
  }
  
  
  // currently unable to reference 'this' as TabsPage
  // even through use of apply or call to the funciton
  // as Firebase requires a callback with only one variable
  // Create a callback which logs the current auth state
  authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      this.presentLogin();
      
    } else {
      console.log("User is logged out");
      this.presentLogin();
    }
  }
}
