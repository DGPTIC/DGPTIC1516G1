import {Page, NavParams} from 'ionic/ionic'
import {Map} from '../map/map';

@Page({
  templateUrl: 'app/item-detail/item-detail.html',
  directives:[Map]
})
export class ItemDetailPage {
  constructor(navParams:NavParams) {
  		this.section = "rutes";
  		this.navParams = navParams;
  		this.item = this.navParams.get('item');
  }
  changeSection(section){
  	this.section = section;
  }

  
}
