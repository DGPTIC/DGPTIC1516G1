import {Page, NavController, NavParams} from 'ionic/ionic';
 
@Page({
  templateUrl: 'build/add-comment/add-comment.html',
})
 
export class AddCommentPage {
  constructor(nav: NavController, navParams: NavParams) {
 
    this.nav = nav;
    this.navParams = navParams;
 
    this.title = "";
    this.description = "";
 
  }
 
  saveItem(){
 
    let newItem = {
      title: this.title,
      description: this.description
    }
 
    this.navParams.get('listPage').saveItem(newItem);
    this.nav.pop();
 
  }
}