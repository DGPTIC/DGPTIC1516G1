import {Page, NavParams,Modal,Animation} from 'ionic/ionic'
import {Map} from '../map/map';
import {Comments} from '../comments/comments';
import {ConfigApp} from '../conf/config-app';
import {DistancePipe} from '../pipes/distance-pipe'
import {NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault,NgClass} from 'angular2/common'




@Page({
  templateUrl: 'build/item-detail/item-detail.html',
  directives:[Map,NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault,NgClass],
  pipes:[DistancePipe]

})
export class ItemDetailPage {

  isOpeningModal:Boolean = false;
  BASEURL:String;
  key:String;

  constructor(navParams:NavParams,modal:Modal) {
  	this.section = "rutes";
    this.config = new ConfigApp();
    this.key = this.config.getUrl("maps").key;
    this.modal = modal;

    this.BASEURL = "https://maps.googleapis.com/maps/api/staticmap?size=690x512&center=";

  	this.navParams = navParams;
  	this.item = this.navParams.get('item');
  }
  changeSection(section){
    this.section = section;
  }
  showMoreContent(event,index){
    
    
    let cont = document.getElementsByClassName("idx-"+index)[0];
    if (cont.style.display == "block"){
      cont.style.display = "none";
      document.getElementsByClassName("act-info-"+index)[0].innerHTML = "More Information";
    }else{
      cont.style.display = "block";
      document.getElementsByClassName("act-info-"+index)[0].innerHTML = "Less Information";
    }

  }
  getStaticMap(_rutes){
    
    let rutes=JSON.parse(_rutes.coordinates);
    var zoom=9
    var color = "blue";
    var path ="";
    if(rutes.type == "Point"){
      
      
      if(_rutes.TIPO == "Despegue"){
        color = "green";
      }
      
      path = rutes.coordinates[0]+","+rutes.coordinates[1]+"&zoom="+zoom+"&markers=color:"+color+"|"+rutes.coordinates[0]+","+rutes.coordinates[1];


    }else{
      var coordinates = rutes.coordinates;
      if (rutes.type == "MultiLineString"){
        coordinates = rutes.coordinates[0].concat(rutes.coordinates[1]);
      }
      zoom=11
      path = coordinates[0][0]+","+coordinates[0][1]+"&zoom="+zoom+"&path=color:000fff|weight:3|";
      var pressionPat = 0.20
      var steps = Math.round(coordinates.length*pressionPat) ==0?1:Math.round(coordinates.length*pressionPat);

      for(var rute = 0; rute < coordinates.length; rute+=steps){
        if(rute%steps==0){
          try{
            path+=coordinates[rute][0]+","+coordinates[rute][1]+"|";  
          }catch(err){
            console.log("error: ",err);
          }
          

        }
      }
      path=path.substring(0,path.length-1);
    
    }
    return this.BASEURL+path+"&key="+this.key;
  }

  viewComments(id){
    if(!this.isOpeningModal){
      var evn = this.modal.open(Comments,{ itemId: id },{
      enterAnimation: 'fade-in',
      leaveAnimation: 'fade-out'});
      this.isOpeningModal = true;
      console.log(evn);
    }
    
  }
}
class FadeIn extends Animation {
  constructor(enteringView, leavingView) {
    super(enteringView.pageRef());
    this
      .easing('ease')
      .duration(1000)
      .fromTo('translateY', '0%', '0%')
      .fadeIn()
      .before.addClass('show-page');
  }
}
Animation.register('fade-in', FadeIn);

class FadeOut extends Animation {
  constructor(enteringView, leavingView) {
    super(leavingView.pageRef());
    this
      .easing('ease')
      .duration(500)
      .fadeOut()
      .before.addClass('show-page');
  }
}
Animation.register('fade-out', FadeOut);
