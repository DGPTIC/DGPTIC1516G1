import {SqlStorage} from 'ionic/ionic';
import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethods} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
 
@Injectable()
export class DataService {
	dataUpdate:Observable<any[]>;
    nameDB:String;
    data:any;
    
	_dataObserver: any;
    
    
    constructor(http:Http) {
 		this.nameDB = "opendatalapalma";
 		this.http = http;

        this.storage = new SqlStorage({name: this.nameDB});
        this.data=null

        this.dataUpdate = new Observable(observer => this._dataObserver = observer).share();
        
        this.setupTable();
 
        this.storage.get(this.nameDB).then((todos) => {
            this.data = JSON.parse(todos);
        });
        
    }

    //delete table
    removeTable(table){
        var _query = "DROP TABLE "+table;
        this.runQuery(_query);
    }
    
    
    //Set local storage    
    
    setupTable(descriptor){
        //set item table
        this.runQuery(descriptor);
    }

    saveData(where,data){

        var _query = "insert into "+where;
        var fields =[];
        var values = [];

        for (var key in data){
            fields.push(key)
            values.push(data[key]);
        }
        _query+=' ('+fields.join(',')+') values ("'+values.join('","')+'");';
        return this.runQuery(_query);
    }

    updateData(table, conditions, values){
        var _query = "update "+table;
        var _fields = []; 
        var _conditions = [];
        for (var key in values){
            _fields.push(key +"="+ values[key]);
            
        }
        for (var key in conditions){
            _conditions.push(key +"="+ conditions[key]);
        }

        _query+= _fields.join(",")+" where "+_conditions.join(",")+";";

        console.log(_query)

        

    }

    getRequest(_URL,callBack){
        self = this
        var args = [];
        if(arguments.length>2){
            args = arguments[2];
        }
        this.http.get(_URL)
            .subscribe(
                data => self.items = data.json(),
                err => console.log(err), 
                () => {
                    callBack(self.items,args);
                }
        );
    }



    getData(){
        return this.storage.get(this.nameDB);
    }

    //for a query without parameters use sqlstorage for add parameters use storage
    runQuery(_query,_data){
        //console.log("query=" _query);
        if(_data == undefined || _data == null || _data.length == 0){
            return this.storage.query(_query);
        }else{
            return this.storage.query(_query,_data);   
        }
        
    }
    
    save(item){
        if(!this.data){
            this.data = [item];
            let newData = JSON.stringify(item);
            this.storage.set(this.nameDB, newData);
        } else {
            this.data.push(item);
            let newData = JSON.stringify(this.data);
            this.storage.set(this.nameDB, newData);
        }
    }

    
    setItems(){
        
        for(var item in self.items.data){
            var element = self.items.data[item];
            var descriptionStr = String(element.description);
            descriptionStr = descriptionStr.replace(/<(?:.|\n|\t|\r)*?>/gm,'');
            let newData = {title:element.item_name,description:descriptionStr};
            this.save(newData);

        }
        
        this.storage.get(this.nameDB).then(res=>{
            console.log("res",res)
            //if (request.res.rowsAffected>0)
            //    self._dataObserver.next(request)
        })
    }
}