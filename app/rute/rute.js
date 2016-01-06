import {Page, NavController,NavParams} from 'ionic/ionic';
import {ItemDetailPage} from '../item-detail/item-detail';
import {ManagerData} from '../models/manager-data';
import {Loading} from '../utils/loading';
import {Map} from '../map/map';
import {NgIf,NgFor,NgModel,NgStyle,NgClass} from 'angular2/common';


@Page({
  templateUrl: 'build/rute/rute.html',
  directives:[Map,Loading,NgIf,NgFor,NgModel,NgStyle,NgClass]
})
 
export class RutePage {
	item:any;
	managerData:ManagerData
	constructor(nav:NavController,navParams:NavParams,mgData:ManagerData){
		this.nav=nav;
		this.navParams = navParams;
		this.managerData = mgData;
		this.item = this.navParams.get("item");
		console.log(Map);
		
		if(typeof(this.item.coordinates) == "string")
			this.item.coordinates = JSON.parse(this.item.coordinates);

		if(this.item.coordinates.type == "Point"){
			var cor = this.item.coordinates.coordinates;
			cor = {"lon":cor[0],"lat":cor[1]}
		}else if(this.item.coordinates.type =="MultiLineString"){
			var cor = this.item.coordinates.coordinates[0][0];
			cor = {"lon":cor[0],"lat":cor[1]}
		}else{
			var cor = this.item.coordinates.coordinates[0];
			cor = {"lon":cor[0],"lat":cor[1]}
		}
		
		this.weather={}
		this.managerData.getWeather(cor,this.getWeather,{ref:this});
		
		
	}

	getWeather(data,args){
		if(data.hasOwnProperty("rain"))
			args.ref.weather.rainy = data.rain;
		if(data.hasOwnProperty("weather"))
			args.ref.weather.weather = data.weather[0];
		if(data.hasOwnProperty("wind"))
			args.ref.weather.wind = data.wind;
		if(data.hasOwnProperty("clouds"))
			args.ref.weather.clouds = data.clouds;
		if(data.hasOwnProperty("main"))
			args.ref.weather.main = data.main;
		if(data.hasOwnProperty("sys"))
			args.ref.weather.sys = data.sys;

	}



}
