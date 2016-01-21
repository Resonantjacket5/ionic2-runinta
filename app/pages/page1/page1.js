import {Page} from 'ionic/ionic';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor() {
    var latlng = {
      //Copenhagen coordinates :) 
      lat:55.6761,
      lng:12.5683
    };
    
    var mapOptions = {
      center: latlng,
      zoom: 15//, 
      //mapTypeId: google.map.MapTypeId.ROADMAP

    };
    
    console.log("try to fetch map!");
    this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
    
  }
}
