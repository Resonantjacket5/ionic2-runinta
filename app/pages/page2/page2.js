import {Page, Modal, NavController} from 'ionic/ionic';
import {AuthService} from '../../providers/auth-service/auth-service';
import {AddFriendPage} from '../page2/AddFriend/addfriend';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
  // implicitly provided by Tabs.js
  // providers: [AuthService]
})
export class Page2 {
  
  constructor(nav: NavController, auth: AuthService) {
    var _this =this;
    this.locationProvided = false;
    this.nav = nav;
    this.auth = auth;
    this.friends = [];
    
// default data used for debugging
//    this.friends = [
//      {
//        name: "Sam",
//        age:  19,
//        coords: 1
//      }
//      {
//        name: "Tom",
//        age: 25,
//        coords: 2
//      }]
//    this.coordinates = {
//      latitude: 8,
//      longitude: 2
//    };
    
  };
  
  fetchFriends = function() {
    let ref = this.auth.getCurrentUserRef();
        //new Firebase("https://runinto.firebaseio.com/users/b5c16695-bf5e-490f-9cb9-21d16e16b668");

    
    let usersRef = ref.child("friends");
    
    
    /*
    usersRef.set([
      {
        name: "bob",
        age: 24        
      },
      {
        name:"samuel",
        age: 50
      },
      {
        name: "ryan",
        age: 20
      }
    ]);//*/
    
    
    
    usersRef.on("value", function(snapshot) {

      
      console.log(snapshot.val());
      _this.friends = snapshot.val();
      
    }, function(errorobject){
      console.log("The read failed: "+errorobject.code);
    });
    
    //*/
    
    
  };


  updateFriendsLocation() {
    //let ref = this.auth.getFireBaseRef();
                              
    for(let i = 0; i<this.friends.length; i++){
      
      //this.friends[i].coords = ref.child('geofire').get(this.friends[i].uid);
      this.fetchGeoFireFriend(i);
      //ref.child('geofire').child('
    }
    
    console.log(this.friends);
  }

  fetchGeoFireFriend(i){
    let geoFire = new GeoFire(this.auth.getFireBaseRef().child("geofire");
    geoFire.get(this.friends[i].uid).then( (location) => {
      console.log("location fetched "+location);
      this.friends[i].latitude = location[0];
      this.friends[i].longitude = location[1];
      console.log("finisiehd getting location");
    }, function (error) {
      console.log("No coordinates data: " +error); 
    });
  }
  
  askUserLocation = function () {
    navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError);
  };
                              

  
  onSuccess = function(position) {
    _this.coordinates.latitude= position.coords.latitude;
    _this.coordinates.longitude = position.coords.longitude;
    _this.pushLocation();
  };
      
  onError= function (error){
    console.log("error"); 
  };

  // function called on success, from askUserLocation
  // to push 
  // should move to auth-service or stand alone Service later
  pushLocation =function() {
    
    let geoFire = new GeoFire(this.auth.getFireBaseRef().child("geofire");
    console.log(geoFire);
    geoFire.set(this.auth.getUserID(), [ _this.coordinates.latitude, _this.coordinates.longitude]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function (error) {
      console.log("Error: "+error);
    });
 
  };
  
  
    /*
    geoFire.set("some_key", [37.785326, -122.405696]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    });//*/


  logOut = function () {
    let fireRef = new Firebase("https://runinto.firebaseio.com");
    fireRef.unauth();
  };

  openAddFriendPage = function () {
    this.nav.push(AddFriendPage);  
  };

  
  openAddFriendModal = function () {
    let AddFriendModal = Modal.create(AddFriendPage);
    this.nav.present(AddFriendModal);
  };
}
