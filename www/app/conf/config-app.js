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
		}
		"comments":{
			"url":"http://services.arcgis.com/hkQNLKNeDVYBjvFE/arcgis/rest/services/Deportes/FeatureServer?f=pjson"
		}
	}
}

export class ConfigApp {
	_conf:any;

	constructor(){
		this._conf=conf;
	}

	getUrl(_item){
		try{
			return this._conf.servicesURL[_item];
		}catch(err){
			console.log("Not item found");
		}
	}

}