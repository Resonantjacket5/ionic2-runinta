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
    this.presentLogin();
  }
  
  
  presentLogin() {
    let loginModal = Modal.create(LoginPage);
    loginModal.onDismiss(data => {
      console.log(data);
    });
    this.nav.present(loginModal);
  }
}
