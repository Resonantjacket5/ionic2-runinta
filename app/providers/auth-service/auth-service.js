import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  constructor(http: Http) {
    this.http = http;
    this.userData;
    console.log("auth Service constructor called");
    this.ref = new Firebase("https://runinto.firebaseio.com");
    //node_modules/firebase-angular2/bundles/firebase-angular2-all.umd.js
    return this;
  }
  
  getFireRef = function () {
    return this.ref;
  };

  getCurrentUserRef = function() {
    return this.ref.child("users").child(this.userData.uid);
  };
  
  getUsersRef = function() {
    return this.ref.child('users');
  };
  
  saveUserData = function (authData) {
    console.log("usser data saved");
    this.userData = authData;
  };

  getUserData = function () {
    return this.userData;
  };
  
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

