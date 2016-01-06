import {DataService} from '../data/data';
import {CommentModel} from '../models/comment';
import {ConfigApp} from '../conf/config-app';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {DataItem, Category, Cordinates, TrailsModel,MtbModel,ParaglidingModel} from '../models/models';

@Injectable()
export class ManagerData extends DataService{
	
	URL:Object;
	config:ConfigApp;
	

	_itemModel:DataItem;
    _categoryModel:Category;
    _cordinateModel:Cordinates;

    _trailsData:any;
    _mtbData:any;
    _paraglidingData:any;

    _trailsModel:any;
    _mtbModel:any;
    _paraglidingModel:any;

	constructor(http:Http){
		super(http);
		this.config = new ConfigApp();
		//scope 
		self = this;
		
		this._itemModel = new DataItem();
        this._categoryModel = new Category();
        this._cordinateModel = new Cordinates();
        this._trailsModel = new TrailsModel();
        this._mtbModel = new MtbModel();
        this._paraglidingModel = new ParaglidingModel();


        this._trailsData={};
    	this._mtbData = {};
    	this._paraglidingData={};

        this.resetDataBase();

        
	}

	getComments(id,callback,ref){
		var url = this.config.getUrl("comments").query;
		var fields = "&outFields=Descripción,Tramitación,Tipología,Supone_riesgo_&f=pjson";
		var where="Deportes='"+id+"'";
		url=url+"where="+where+fields;
		this.getRequest(url,callback,{ref:ref});
	}

	saveComment(comment,callback,ref){

		var data = [{"attributes" :{ 
		"Tramitación":comment.Tramitacion,
		"Tipología" : comment.Tipologia,
		"Descripción" : comment.Descripcion,
		"Supone_riesgo_" : comment.Supone_riesgo_,
		"Deportes" : comment.Deportes,
		"Creator" : comment.Creator,
		"Editor" : comment.Editor
		}}];
		this.sendRequest(this.config.getUrl("comments").save,data,callback,ref);
	}

	resetDataBase(){
		var tables = ["items","categories","cordinates"];
		for(var table in tables){
			this.removeTable(tables[table]);	
		}
	}

	getWeather(location,callback,args){
		var urlWeather = this.config.getUrl("weather").url;
		var idAppWeather = this.config.getUrl("weather").apiId;
		var url = urlWeather+idAppWeather+"&lat="+location.lat+"&lon="+location.lon;
		this.getRequest(url,callback,args);
	}

	//set local storage 
	initCategories(){
		//validate tables
		this.setupTable(this._itemModel.descriptorTable);
		this.setupTable(this._categoryModel.descriptorTable);
		this.setupTable(this._cordinateModel.descriptorTable);
		this.getCompleteData()
	}


	getCompleteData(){

		var mtbURL = this.config.getUrl("mtb");
		var paraglidingURL = this.config.getUrl("paragliding");
		var trails = this.config.getUrl("trails");

		//validate local data version
		
		this.getRequest(trails.url,this.setData,{"type":"senderos","item":this._trailsData,"url":trails,"model":this._trailsModel});
		this.getRequest(mtbURL.url,this.setData,{"type":"mtb","item":this._mtbData,"url":mtbURL,"model":this._mtbModel});
		this.getRequest(paraglidingURL.url,this.setData,{"type":"parapente","item":this._paraglidingData,"url":paraglidingURL,"model":this._paraglidingModel});
		

	}


	getGeoData(argsGeo){
		var args=null;
		if(arguments.length>1){
			args = arguments[1];
		}
		var tmp = this;
		this.getRequest(argsGeo.url.geo,function(data_result){
			argsGeo.model.setGeoData({"geo":data_result});
			tmp._dataObserver.next(argsGeo.model)
		},args);

	}


	setData(_data){
		var args=null;
		if(arguments.length>1){
			args = arguments[1];
		}
		args.item.description = _data.data;
		args.item.description.categoryId = args.type;

		_data.data.categoryId = args.type; 
		args.model.setData({"description":_data.data});
		self.checkDataUpdate(args);

	}
	checkDataUpdate(_args){
		var _checkQuery = 'select * from categories where categoryId = ?';
		var data = this.runQuery(_checkQuery,[_args.type]);
		data.then((result)=>{
			if(result.res.rows.length>0){
				if(new Date(_args.item.description.updated_at).getTime()>new Date(result.res.rows[0].last_update).getTime()){
					this.updateData(_args.type,args.item.description.updated_at);
				}else{
					//get data from querys
					console.log("get Data from local storage");
				}

			}else{
				//get all data from service a save into local storage
				this.saveCategory(_args.type,_args.item.description.updated_at);
				this.getGeoData(_args);
			}
			
		})
	}

	updateCategory(categoryId,lastUpdate){
		
		var dataInster = this.updateData("categories",{"last_update":lastUpdate},{"categoryId":categoryId});

	}

	saveCategory(name,lastUpdate){
		var dataInster = this.saveData("categories",{"categoryId":name,"name":name,"last_update":lastUpdate});
		
		dataInster.then((result)=>{},err=>{console.log("error",err)});
	}

}