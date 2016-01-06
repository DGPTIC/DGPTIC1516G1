import {Page, NavController, NavParams,Modal,Popup} from 'ionic/ionic';
import {CommentModel} from '../models/comment';
import {Comments} from '../comments/comments';
import {ManagerData} from '../models/manager-data';
import {NgStyle,NgClass,NgFor,NgIf,NgModel,FORM_DIRECTIVES,ControlGroup,Control} from 'angular2/common';

@Page({
  templateUrl: 'build/add-comment/add-comment.html',
  directives:[NgStyle,NgClass,NgFor,NgIf,FORM_DIRECTIVES,NgModel],
})
 
export class AddCommentPage {

  model:CommentModel;
  commentForm:ControlGroup;
  managerData:ManagerData;
  popup:Popup;


  constructor(nav: NavController, params: NavParams,managerData:ManagerData,popup:Popup) {
    
    this.managerData = managerData;
    this.popup = popup;
    this.nav = nav;
    
    this.commentForm = new ControlGroup({
      risk: new Control(""),
      problem: new Control(""),
      type: new Control(""),
      description: new Control("")
    });
    this.params = params;
    this.category = this.params.get("sport");
    this.userInfo = this.params.get("user")
    this.model = new CommentModel();
  }
 
  saveItem(){
    var data = this.commentForm.value;
    data.sport = this.category;
    data.user = this.userInfo;
    this.model.setData(data);
    this.managerData.saveComment(this.model.attributes,this.saveComplete,this);
    
    
  }
  saveComplete(res,ref){
    if(res.status==200 && JSON.parse(res._body).addResults[0].success){
      ref.popup.alert({
        title:"Enviado",
        template:"Gracias por sus comentarios!!"}).then(()=>{
          ref.cancel();
        });

      
    }else{
      ref.popup.alert({
        title:"Error",
        template:"Se ha producido un error, intentelo nuevamente"}).then(()=>{
          console.log("error");
        })
    }
  }
  cancel(){
    this.nav.pop();
  }
}