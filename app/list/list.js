import {Page, NavController} from 'ionic/ionic';
import {ItemDetailPage} from '../item-detail/item-detail';
import {SetupPage} from '../setup/setup';
import {ManagerData} from '../models/manager-data';
import {Loading} from '../utils/loading';
import {NgIf,NgFor,NgModel,NgStyle,NgClass} from 'angular2/common'


@Page({
  templateUrl: 'build/list/list.html',
  directives:[Loading,NgIf,NgFor,NgModel,NgStyle,NgClass]
})
 
export class ListPage {

  trails:ManagerData;
  constructor(nav: NavController,trailsModel:ManagerData) {
    this.searchQuery = '';
    this.trails = trailsModel;
    this.nav = nav;
    this.items = [];
    this.filterItems=[];
    this.trails.initCategories();
    
    this.trails.dataUpdate.subscribe(data =>this.items.push(data),err=>console.log(err),()=>console.log("ok!"));
 
  }

  getItems() {
    var q = this.searchQuery;
    if(q.trim() == '') { this.filterItems = []; }
    this.filterItems = this.items.filter((v) => {
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
  viewConfig(){
    this.nav.push(SetupPage);
  }
  viewItem(item){
    this.nav.push(ItemDetailPage, {
      item: item
    });
  }
}