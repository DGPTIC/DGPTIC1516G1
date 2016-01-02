import {DataService} from '../data/data';
import {ConfigApp} from '../conf/config-app';
import {Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {DataItem, Category, Cordinates, TrailsModel,MtbModel,ParaglidingModel} from '../models/models';

@Injectable()
export class ManagerData extends DataService{
	
	URL:Object;
	config:ConfigApp;
	

	private _itemModel:DataItem;
    private _categoryModel:Category;
    private _cordinateModel:Cordinates;

    private _trailsData:any;
    private _mtbData:any;
    private _paraglidingData:any;

    private _trailsModel:any;
    private _mtbModel:any;
    private _paraglidingModel:any;

	constructor(http:Http){
		this.config = new ConfigApp();
		
		
		super(http);
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

	getComments(id,callback){
		this.getRequest(this.config.getUrl("comments").url,callback);
	}

	resetDataBase(){
		tables = ["items","categories","cordinates"];
		for(var table in tables){
			this.removeTable(tables[table]);	
		}
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

		mtbURL = this.config.getUrl("mtb");
		paraglidingURL = this.config.getUrl("paragliding");
		trails = this.config.getUrl("trails");

		//validate local data version
		
		this.getRequest(trails.url,this.setData,{"type":"senderos","item":this._trailsData,"url":trails,"model":this._trailsModel});
		this.getRequest(mtbURL.url,this.setData,{"type":"mtb","item":this._mtbData,"url":mtbURL,"model":this._mtbModel});
		this.getRequest(paraglidingURL.url,this.setData,{"type":"parapente","item":this._paraglidingData,"url":paraglidingURL,"model":this._paraglidingModel});
		

	}


	getGeoData(argsGeo){

		tmp = this;
		this.getRequest(argsGeo.url.geo,function(data_result){
			argsGeo.model.setGeoData({"geo":data_result});
			tmp._dataObserver.next(argsGeo.model)
		},args);

	}


	setData(_data){
		args=null;
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
		_checkQuery = 'select * from categories where categoryId = ?';
		data = this.runQuery(_checkQuery,[_args.type]);
		data.then((result)=>{
			if(result.res.rows.length>0){
				if(new Date(_args.item.description.updated_at).getTime()>new Date(result.res.rows[0].last_update).getTime()){
					this.updateData(_args.type,args.item.description.updated_at);
				}else{
					//get data from querys
				}

			}else{
				//get all data from service a save into local storage
				this.saveCategory(_args.type,_args.item.description.updated_at);
				this.getGeoData(_args);
			}
			
		})
	}

	updateCategory(categoryId,lastUpdate){
		
		dataInster = this.updateData("categories",{"last_update":lastUpdate},{"categoryId":categoryId});

	}

	saveCategory(name,lastUpdate){
		dataInster = this.saveData("categories",{"categoryId":name,"name":name,"last_update":lastUpdate});
		
		dataInster.then((result)=>{},err=>{console.log("error",err)});
	}

}