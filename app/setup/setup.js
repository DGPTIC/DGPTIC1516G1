import {Page, NavController} from 'ionic/ionic';
import {ItemDetailPage} from '../item-detail/item-detail';
import {ManagerData} from '../models/manager-data';
import {Loading} from '../utils/loading';
import {NgIf,NgFor,NgModel,NgStyle,NgClass} from 'angular2/common'


@Page({
  templateUrl: 'build/setup/setup.html',
  directives:[Loading,NgIf,NgFor,NgModel,NgStyle,NgClass]
})
 
export class SetupPage {
  contructor(){

  }
}