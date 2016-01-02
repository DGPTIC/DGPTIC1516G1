import {Page, NavController} from 'ionic/ionic';

import {ItemDetailPage} from '../item-detail/item-detail';
import {ManagerData} from '../models/manager-data';
import {Loading} from '../utils/loading';


@Page({
  templateUrl: 'app/list/list.html',
  directives:[Loading]
})
 
export class ListPage {

  trails:ManagerData;
  constructor(nav: NavController,trailsModel:ManagerData) {
    this.searchQuery = '';
    this.trails = trailsModel;
    this.nav = nav;
    this.items = [];
    this.trails.initCategories();
    this.trails.dataUpdate.subscribe(data =>this.items.push(data),err=>console.log(err),()=>console.log("ok"));
 
  }

  getItems() {
    var q = this.searchQuery;
    if(q.trim() == '') { return this.items; }
    return this.items.filter((v) => {
      if(v.name.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    })
  }
  
  saveItem(item){
    this.items.push(item);
    this.dataService.save(item);
  }
 
  viewItem(item){
    this.nav.push(ItemDetailPage, {
      item: item
    });
  }
}