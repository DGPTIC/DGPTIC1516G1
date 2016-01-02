import {Input,Component} from 'angular2/core';
import {NavParams} from 'ionic/ionic'
import {ConfigApp} from '../conf/config-app';


@Component({
	selector:"map",
	templateUrl:'build/map/map.html',
	properties:['rutes:rutes']
})

export class Map{
	
	BASEURL:String;
	key:String;

	constructor(navParams : NavParams){

		console.log('init map');
		this.config = new ConfigApp();
		this.key = this.config.getUrl("maps").key;

		BASEURL = "https://maps.googleapis.com/maps/api/staticmap?zoom=11&center=";
		this.navParams = navParams;
		this.rutes = this.navParams.get('item').rutes;
		this.difficultyColor = {"Alta":"#FF7F00" , "Media":"#007FFF", "Baja":"#36D900", "Extrema":"#FF0000","Medio":"#007FFF","Dificil":"#FF7F00","Muy Dificil":"#FF7F00"}
		this.timeMap = 0;
	    try{
	    	if (google.maps != undefined){
	    		this.initMap();
	    	}
	    }
	    catch(err){
	    	var self=this;
	    	this.timeMap = setTimeout(function(){
	    		if (google.maps != undefined){
	    			self.initMap();
	    		}
	    	}, 500);
	    }
	    
	}

	setMark(){
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'Ruta'
		});

	}

	initMap(){
	  	if (this.timeMap != 0){clearTimeout(this.timeMap);}
	  	this.map = new google.maps.Map(document.getElementById('map'), {
	    	zoom: 10,
	    	center: {lat: 28.68, lng: -17.76},
	    	mapTypeId: google.maps.MapTypeId.TERRAIN
	  	});
	  	
	  	if(this.rutes != undefined)
	  		this.setRutes()
	}

	getStaticMap(rutes){
		path = "&path=color:000fff|weight:5|";
		
		for(rute in rutes){
			path+=rutes[rute][0]+","+rutes[rute][0];
		}

		return BASEURL+path+"&key="+this.key;
	}

	setRutes(){
     	var newArr = this.rutes;
		for (var ele in newArr){
			var flightPlanCoordinates = [];
			ele = newArr[ele];
			ele.coordinates = JSON.parse(ele.coordinates);
			
			if (ele.coordinates.type == "LineString"){
				for (var pos in  ele.coordinates.coordinates){
					pos = ele.coordinates.coordinates[pos]
					flightPlanCoordinates.push({lat:parseFloat(pos[1]),lng:parseFloat(pos[0])})
				}
			}else if(ele.coordinates.type == "MultiLineString"){
				for (var pos in  ele.coordinates.coordinates){
					pos = ele.coordinates.coordinates[pos]
					for (var subpos in  pos){
						subpos = pos[subpos]
						flightPlanCoordinates.push({lat:parseFloat(pos[1]),lng:parseFloat(pos[0])})
					}
				}
			}
			var flightPath = new google.maps.Polyline({
		    path: flightPlanCoordinates,
		    geodesic: true,
		    strokeColor: this.difficultyColor[ele.DIFICULTAD],
		    strokeOpacity: 1.0,
		    strokeWeight: 3,
		    clickable:true,
		});

			try {
				flightPath.addListener("click",function(ev){clickLine(ev,ele.ID)})
				flightPath.setMap(this.map);	
			}
			catch(err){
				console.log(ele,flightPlanCoordinates)
			}
   		}
	}

	clickLine(ev,f){
		console.log(ev,f)
	}

}
