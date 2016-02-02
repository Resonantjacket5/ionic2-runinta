import {App, Platform, Config} from 'ionic/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {AuthService} from './providers/auth-service/auth-service';

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [AuthService],
  config: {}
})
export class MyApp {
  constructor(platform: Platform) {
    this.root = LoginPage;//*/ 
      //TabsPage;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
