import {Page, NavParams,NavController} from 'ionic/ionic'
import {Comments} from '../comments/comments';
import {ConfigApp} from '../conf/config-app';
import {RutePage} from '../rute/rute';
import {ImageUtil} from '../utils/image-util';
import {DistancePipe} from '../pipes/distance-pipe';
import {NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault,NgClass} from 'angular2/common';

@Page({
  templateUrl: 'build/item-detail/item-detail.html',
  directives:[NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault,NgClass],
  pipes:[DistancePipe]

})
export class ItemDetailPage {

  isOpeningModal:Boolean = false;
  BASEURL:String;
  key:String;

  constructor(nav:NavController,navParams:NavParams) {
    this.nav=nav;
  	this.section = "rutes";
    this.config = new ConfigApp();
    this.key = this.config.getUrl("maps").key;
    this.imageUtil = new ImageUtil();
    

    this.BASEURL = "https://maps.googleapis.com/maps/api/staticmap?size=690x512&center=";

  	this.navParams = navParams;

  	this.tmpItems = this.navParams.get('item');

    this.setImage64()
  }
  setImage64(){
    for (var itm in this.tmpItems.rutes){
      this.getStaticMap(this.tmpItems.rutes[itm]);
    }
    this.item = this.tmpItems;
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
    try{
      var rutes=JSON.parse(_rutes.coordinates);
      var zoom=13

      var colors = {"Alta":"orange" , "Media":"green", "Baja":"blue", "Extrema":"red","Medio":"green","Dificil":"orange","Muy Dificil":"red","Muy dificil":"red","Fácil":"blue"};
      var color = "blue";
      var path ="";
      if(rutes.type == "Point"){
        
        
        if(_rutes.TIPO == "Despegue"){
          color = "green";
        }
        
        path = rutes.coordinates[1]+","+rutes.coordinates[0]+"&zoom="+zoom+"&markers=color:"+color+"|"+rutes.coordinates[1]+","+rutes.coordinates[0];


      }else{
        var coordinates = rutes.coordinates;
        if (rutes.type == "MultiLineString"){
          coordinates = rutes.coordinates[1];
        }
        zoom=12

        color=colors[_rutes.DIFICULTAD];
        
        path = coordinates[0][1]+","+coordinates[0][0]+"&zoom="+zoom+"&path=color:"+color+"|weight:7|";
        var maxPath = 50
        var steps = coordinates.length/maxPath <=0?1:Math.ceil(coordinates.length/maxPath);
        
        for(var rute = 0; rute < coordinates.length; rute+=steps){
          if(rute%steps==0){
            try{
              path+=coordinates[rute][1]+","+coordinates[rute][0]+"|";  
            }catch(err){
              console.log("error: ",err);
            }
            

          }
        }

        path=path.substring(0,path.length-1);
      
      }
      var urlTmp = this.BASEURL+path+"&key="+this.key;
      var imageRespond="";
      _rutes.base64 = "";
      var rut = _rutes;
      this.imageUtil.imageToString(urlTmp,function(response){rut.base64=response;});

      return imageRespond;
      //return this.BASEURL+path+"&key="+this.key;
    }
    catch(err){
      //error reload app;
      return "";
    }
  }

  

  viewDetail(item){
    item.categoryId = this.item.categoryId;
    this.nav.push(RutePage,{ item: item});
  }

  viewComments(id){
      this.nav.push(Comments,{ itemId: id,sport:this.item.categoryId });
  }
}