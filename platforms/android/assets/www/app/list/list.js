import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

import {ItemDetailsPage} from '../item-details/item-details';

@Page({
  templateUrl: 'app/list/list.html'
})
export class ListPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    console.log("Start app")
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');



    

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i
      });
    }
  }

  itemTapped(event, item) {

    console.log('You selected:', item.title);

      this.nav.push(ItemDetailsPage, {
        item: item
      });
  }
}
