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
  
  // return singleton instance of FireBase reference
  getFireBaseRef = function () {
    return this.ref;
  };

  // return firebase reference to <site>/users/<uid>
  getCurrentUserRef = function() {
    return this.ref.child("users").child(this.userData.uid);
  };
  
  // return firebase reference to <site>/users
  getUsersRef = function() {
    return this.ref.child('users');
  };

  getUserID = function () {
    return this.userData.uid;
  };
  

  // called by login functions
  // and saves firebase authData locally
  // to AuthService.userData
  saveUserData = function (authData) {
    console.log("usser data saved");
    this.userData = authData;
  };

  getUserData = function () {
    return this.userData;
  };



  doLogin (_email,_password) {
    let _this =this;
    return new Promise( function(resolve,reject){
      _this.ref.authWithPassword({
        email : _email,
        password: _password
      }, function (error, authData){
        if (error) {
          console.log("Login Failed!", error);
          reject(Error("It broke!"));
        } else {
          console.log("Authenticated successfuly with payload:", authData);     
          // when login correctly, save user Data and dismiss login modal
          _this.saveUserData(authData);
          resolve("succeed");
          }
        }
      )
    })
  }
  
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

