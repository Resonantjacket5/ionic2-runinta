import {Page, ViewController} from 'ionic/ionic';
import {AuthService} from '../../../providers/auth-service/auth-service';
//import {FirebaseService} from 'firebase-angular2/core';
//import {FirebaseService} from '../../providers/firebase/firebase';


@Page({
  templateUrl: 'build/pages/page2/AddFriend/addfriend.html'
})

export class AddFriendPage {
  constructor(auth: AuthService, viewCtrl: ViewController) {
    _this = this;
    this.auth = auth;
    this.viewCtrl = viewCtrl;
    this.friends = [{
      name: "what" 
    },{
      name: "sam kitten"
    }
    ];
  }
  
  searchFriend(event) {
    let ref = this.auth.getFireBaseRef();
    ref.child('userspublic')
      .orderByChild('name')
      .equalTo(event.target.value)
      .on("value", function(snapshot) {
      console.log(snapshot.val());
      if (snapshot.val()!= null)
      {
        // converts javascript object to array
        _this.friends = Object.keys( snapshot.val()).map( function (key){return snapshot.val()[key]});
      };
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  /*something(){
    let ref = this.auth.getFireBaseRef();
    let userRef = this.auth.getCurrentUserRef();
    
    ref.child('userspublic').child(this.auth.getUserID()).set({
      name: "fakeFake",
      uid: this.auth.getUserID()});
  }*/
  

}
