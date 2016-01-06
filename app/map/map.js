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

		this.BASEURL = "https://maps.googleapis.com/maps/api/staticmap?zoom=11&center=";
		this.navParams = navParams;
		this.rutes = [this.navParams.get('item')];
		this.difficultyColor = {"Alta":"#FF7F00" , "Media":"#007FFF", "Baja":"#36D900", "Extrema":"#FF0000","Medio":"#007FFF","Dificil":"#FF7F00","Muy Dificil":"#FF7F00","Muy dificil":"#FF7F00"}
		this.timeMap = 0;
		this.avalibleLocation = this.getCurretLocation();
		this.currentLocation = null;
		this.alreadyMap = false;
	    try{
	    	if (google.maps != undefined){
	    		this.initMap();
	    	}
	    }
	    catch(err){
	    	var self=this;
	    	this.timeMap = setTimeout(function(){
	    		if (google.maps != undefined){
	    			clearTimeout(self.timeMap);
	    			self.initMap();
	    		}
	    	}, 1000);
	    }
	    
	}
	getCurretLocation(){
		if(navigator.geolocation){
			var self = this;
			navigator.geolocation.getCurrentPosition(function(pos){self.onSuccessLocation(pos)})
			return true;
			
		}else{
			return false;
		}
	}

	onSuccessLocation(position){
		this.currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude}
		if(this.alreadyMap){
			this.setMark('You current Location.',this.currentLocation,false);
		}
	}

	showMarkLabel(pos,label,centering,mark){
		if(this.map != undefined){
			try{
      			if(centering){
      				if(this.infoWindow == undefined || this.infoWindow==null){
						this.infoWindow = new google.maps.InfoWindow({map: this.map});	
					}
					
      				this.infoWindow.setPosition(pos);
      				this.infoWindow.setContent(label);
      				this.infoWindow.open(this.map,mark);
      				this.map.setCenter(pos);	
      			}
      		}catch(err){
      			console.log("centering error");
      		}
		}
	}

	
	setMark(title,pos,centering){
		var self = this;
		new google.maps.Marker({
		    position: pos,
		    map: this.map,
		    label:title,
		    title: title
		  }).addListener('click', function() {
			self.showMarkLabel(pos,title,true,this);
		});
	}

	initMap(){
	  	
	  	if (this.timeMap != 0){clearTimeout(this.timeMap);}
	  	
	  	
	  	if((this.map != null && this.map != undefined) || this.alreadyMap){
	  		console.log("Init map ready");
	  	
	  	}else{
		  	
	  		try{
	  			var location = {lat: 28.68, lng: -17.76};
			  	if(typeof(this.rutes[0].coordinates) == "string"){
					var cor = JSON.parse(this.rutes[0].coordinates);
				}else{
					var cor = this.rutes[0].coordinates;
				}
				
				if(cor.type == "Point"){
					var pos = cor.coordinates;
					location={lat:parseFloat(pos[1]),lng:parseFloat(pos[0])};
			  	
			  	}else if(this.currentLocation!=null){
		  				location = this.currentLocation;
		  		}
				
				this.map = new google.maps.Map(document.getElementById('map'), {
				    	zoom: 11,
				    	center: location,
				    	mapTypeId: google.maps.MapTypeId.TERRAIN
				  	});
		  	}catch(err){
		  		console.log("maps error",err);
		  	}
			  	
		  	this.alreadyMap = true;
		  	if(this.rutes != undefined){
		  		//this.map.event.addDomListener(window, "load", this.setRutes);
		  		this.setRutes()
		  	}
	  	}
	}

	getStaticMap(rutes){
		var path = "&path=color:000fff|weight:5|";
		
		for(rute in rutes){
			path+=rutes[rute][0]+","+rutes[rute][0];
		}

		return this.BASEURL+path+"&key="+this.key;
	}

	

	setRutes(){
		console.log("Set Rutes");
     	var newArr = this.rutes;
		for (var indx in newArr){
			var flightPlanCoordinates = [];
			var ele = newArr[indx];
			if(typeof(ele.coordinates) == "string"){
				ele.coordinates = JSON.parse(ele.coordinates);
			}
			
			if(ele.coordinates.type == "Point"){
				pos = ele.coordinates.coordinates;
				this.setMark(ele.NAME,{lat:parseFloat(pos[1]),lng:parseFloat(pos[0])},false);
			}else{
				var coordinates = ele.coordinates.coordinates;

				if (ele.coordinates.type == "MultiLineString"){
    			  coordinates = coordinates[1];
    			}

				var pressionPat = 0.80
				var lengthCoord = coordinates.length
		        var steps = lengthCoord/Math.round(lengthCoord*pressionPat)==0?1:Math.ceil(lengthCoord/Math.round(lengthCoord*pressionPat));
		        
		        for(var pos = 0; pos < lengthCoord; pos+=steps){
		          if(pos%steps==0){
					flightPlanCoordinates.push({lat:parseFloat(coordinates[pos][1]),lng:parseFloat(coordinates[pos][0])})
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
					//flightPath.addListener("click",function(ev){clickLine(ev,ele.ID)})
					flightPath.setMap(this.map);
					this.map.setCenter(flightPlanCoordinates[0]);

				}
				catch(err){
					console.log(ele,flightPlanCoordinates)
				}
			}
		}
	}

	/*clickLine(ev,f){
		console.log(ev,f)
	}*/

}
