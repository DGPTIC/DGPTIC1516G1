import {App, Platform} from 'ionic/ionic';
import {ListPage} from './list/list';
import {ManagerData} from './models/manager-data';
import './app.scss';

@App({
  template: `
    <ion-nav [root]="root"></ion-nav>
    <ion-overlay></ion-overlay>
  `,
  providers:[ManagerData]
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
