import {App, Platform} from 'ionic/ionic';
import {ListPage} from './list/list';
import {ManagerData} from './models/manager-data';
import {FacebookService} from './data/facebook';


@App({
  templateUrl:'build/app.html',
  providers:[ManagerData,FacebookService],
  config:{
    mode:'md'
  }
})
export class MyApp {
  constructor(platform: Platform) {
    this.platform = platform;
    this.initializeApp();
    this.root = ListPage;


  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
    });
  }
}
