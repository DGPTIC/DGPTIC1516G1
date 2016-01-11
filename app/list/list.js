import {Page, NavController} from 'ionic/ionic';
import {ItemDetailPage} from '../item-detail/item-detail';
import {SetupPage} from '../setup/setup';
import {ManagerData} from '../models/manager-data';
import {Loading} from '../utils/loading';
import {RutePage} from '../rute/rute';
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
    this.searchItems =[];
    this.trails.initCategories();

    this.trails.dataUpdate.subscribe((data) =>{this.setData(data);},err=>console.log(err),()=>console.log("ok!"));

  }


  setData(data){

    for (var i=0;i<data.rutes.length;i++){
      var item = data.rutes[i];
      item.categoryId=data.categoryId;
      if(data.categoryId=="senderos"){
        item.NAME = "Sendero "+item.NAME;
      }
      this.searchItems.push(item);
    }
    this.items.push(data);

  }

  getItems() {
    var q = this.searchQuery;
    if(q.trim() == '') { this.filterItems = []; }
    this.filterItems = this.searchItems.filter((v) => {

      try{
        if(v.NAME.toLowerCase().indexOf(q.toLowerCase()) >= 0 ||v.categoryId.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
          return true;
        }
        return false;

      }catch(err){
        console.log("No access",v);
        return false;
      }

    })
  }
  viewRute(item){
    this.nav.push(RutePage,{ item: item});
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
