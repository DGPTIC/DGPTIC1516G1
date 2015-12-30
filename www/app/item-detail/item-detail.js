import {Page, NavParams} from 'ionic/ionic'
import {Map} from '../map/map';
import {ConfigApp} from '../conf/config-app';
import {DistancePipe} from '../pipes/distance-pipe'
import {NgStyle} from 'angular2/common'
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2'


@Page({
  templateUrl: 'app/item-detail/item-detail.html',
  directives:[Map,NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault],
  pipes:[DistancePipe]

})
export class ItemDetailPage {


  BASEURL:String;
  key:String;

  constructor(navParams:NavParams) {
  	this.section = "rutes";
    this.config = new ConfigApp();
    this.key = this.config.getUrl("maps").key;

    BASEURL = "https://maps.googleapis.com/maps/api/staticmap?size=690x512&center=";

  	this.navParams = navParams;
  	this.item = this.navParams.get('item');
    console.log(this.item);
  }
  changeSection(section){
    this.section = section;
  }
  showMoreContent(index){
    
    cards = document.getElementsByClassName("adv-map");
    cont = cards[index].getElementsByClassName("more-content")[0];
    if (cont.style.display == "block"){
      cont.style.display = "none";
    }else{
      cont.style.display = "block";
    }

  }
  getStaticMap(_rutes){
    
    rutes=JSON.parse(_rutes.coordinates);
    
    if(rutes.type == "Point"){
      
      color = "blue";
      if(_rutes.TIPO == "Despegue"){
        color = "green";
      }
      zoom=9
      path = rutes.coordinates[0]+","+rutes.coordinates[1]+"&zoom="+zoom+"&markers=color:"+color+"|"+rutes.coordinates[0]+","+rutes.coordinates[1];


    }else{
      coordinates = rutes.coordinates;
      if (rutes.type == "MultiLineString"){
        coordinates = rutes.coordinates[0].concat(rutes.coordinates[1]);
      }
      zoom=11
      path = coordinates[0][0]+","+coordinates[0][1]+"&zoom="+zoom+"&path=color:000fff|weight:3|";
      pressionPat = 0.20
      steps = Math.round(coordinates.length*pressionPat) ==0?1:Math.round(coordinates.length*pressionPat);

      for(rute = 0; rute < coordinates.length; rute+=steps){
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
    return BASEURL+path+"&key="+this.key;
  }

  
}
