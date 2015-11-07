import {Injectable, Injector} from 'angular2/angular2';
import {App, IonicApp, Platform,Config} from 'ionic/ionic';

import {HTTP_PROVIDERS, Http, Request, RequestMethods} from 'angular2/http';


import {HomePage} from './home/home';
import {ListPage} from './list/list';
import {MainNav} from "./main-nav/main-nav"


@App({
  templateUrl: 'app/app.html',
})

class MyApp {

  mainNav: MainNav;
  http:Http;
  results:[];

  constructor(app: IonicApp, platform: Platform,public http:Http) {

    // set up our app
    this.app = app;
    this.http = http;
    this.mainNav = new MainNav();

    this.menu = [];

    this.URL = "http://www.opendatacanarias.es/datos/api/3/action/";
    this.request = http.get(this.URL+"group_list").map(res => res.json()).subscribe(
      res => this.menu = res,()=>this.initializeApp()
      );

    console.log(this.menu);


    this.platform = platform;

   /* this.mainNav.request("group_list").subscribe(res => {
        console.log('people', res.json());
    });*/
    
    

    /*var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, MainNav]);
    var authenticator = injector.get(MainNav);
    authenticator.request('group_list').subscribe(res => {
      //URL should have included '?password=123'
      console.log('people', res.json());
    });*/

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Category', component: ListPage }
    ];

    // make home the root (or first) page
    this.rootPage = HomePage;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
      

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('menu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    
    console.log("page",page)
    
    this.request = this.http.get(this.URL+"group_show?id="+page).map(res => res.json()).subscribe(
      ()=>nav.setRoot(ListPage)
      );
    
  }
}
