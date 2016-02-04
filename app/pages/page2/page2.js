import {Page} from 'ionic/ionic';


@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {
  
  
  
  constructor() {
    var _this =this;
    this.friends = [];
    
    this.friends = [
      {
        name: "Sam",
        age:  19
      }
      {
        name: "Tom",
        age: 25
      }]
    this.coordinates = {
      latitude: 8,
      longitude: 2
    };
    
  };
  
  fetchFriends = function() {
    let ref = new Firebase("https://runinto.firebaseio.com/users/b5c16695-bf5e-490f-9cb9-21d16e16b668");

    
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
  
  askUserLocation() {
    navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError);
  };
  
  onSuccess = function(position) {
    _this.coordinates.latitude= position.coords.latitude;
  };
  
  onError= function (error){
    console.log("error"); 
  };
}
