import {Page} from 'ionic/ionic';
//import {FirebaseService} from 'firebase-angular2/core';
//import {FirebaseService} from '../../providers/firebase/firebase';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor() {
    //modeled after http://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
    
    //console.log(FirebaseService);
    /*
    console.log(Firebase);
    //console.log(Firebase.data);

    console.log("try to fetch map!");
    
  
    let messageRef = new Firebase("https://runinto.firebaseio.com/messages");
    
    //console.log(usersRef);
    console.log(messageRef);
    

    // Attach an asynchronous callback to read the data at our posts reference
    messageRef.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    console.log(messageRef);
    
    
    //this.firebase = firebaseAngular2;
    
    //this.auth = $firebaseAuth(usersRef);
    //*/
    
    this.map = null;
    
    this.loadMap();
  }
  
  loadMap(){
    
    let latlng = {
      //Copenhagen coordinates :) 
      lat:55.6761,
      lng:12.5683
    };
    
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    
    this.map = new google.maps.Map(document.getElementById("map"),mapOptions);

  }
}
