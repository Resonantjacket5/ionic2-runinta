import {Page} from 'ionic/ionic';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor() {
    //modeled after http://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
    
    
    console.log("try to fetch map!");
    console.log(google);
    
    
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
