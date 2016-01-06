export class ConfigApp {
	conf={
			"servicesURL":{
				"trails":{
					"url":"http://www.opendatalapalma.es/datasets/ea9995fafe1f40e5ada6dba4fe2e1ff2_2.json",
					"geo":"http://www.opendatalapalma.es/datasets/ea9995fafe1f40e5ada6dba4fe2e1ff2_2.geojson"
				},
				"mtb":{
					"url":"http://www.opendatalapalma.es/datasets/0384fb92785b400f97cd2fbd195c3371_0.json",
					"geo":"http://www.opendatalapalma.es/datasets/0384fb92785b400f97cd2fbd195c3371_0.geojson"
				},
				"paragliding":{
					"url":"http://www.opendatalapalma.es/datasets/6205b975c63640efb3a79c6ca200e4a3_0.json",
					"geo":"http://www.opendatalapalma.es/datasets/6205b975c63640efb3a79c6ca200e4a3_0.geojson"
				},
				"maps":{
					"key":"AIzaSyBSS7DFd1YcliqTB_KnIGxNKDD8pNq_b2A"
				},
				"comments":{
					"url":"http://services.arcgis.com/hkQNLKNeDVYBjvFE/arcgis/rest/services/Deportes/FeatureServer",
					"save":"http://services.arcgis.com/hkQNLKNeDVYBjvFE/arcgis/rest/services/Deportes/FeatureServer/0/addFeatures",
					"query":"http://services.arcgis.com/hkQNLKNeDVYBjvFE/ArcGIS/rest/services/Deportes/FeatureServer/0/query?"
				},
				"weather":{
					"url":"http://api.openweathermap.org/data/2.5/weather?units=metric&appid=",
					"apiId":"2de143494c0b295cca9337e1e96b00e0"
				},
				"facebook":{
					"appId":"155836084784746",
					
				}
			}
		}

	constructor(){
		this._conf=this.conf;
	}

	getUrl(_item){
		try{
			return this._conf.servicesURL[_item];
		}catch(err){
			console.log("Not item found");
		}
	}

}