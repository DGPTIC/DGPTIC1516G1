import {Modal,Page,NavParams,NavController} from 'ionic/ionic';
import {ManagerData} from '../models/manager-data';
import {AddItemPage} from '../add-comment/add-comment';


@Page({
	templateUrl: 'build/comments/comments.html'
})
export class Comments{
	constructor(nav:NavController,modal:Modal,params:NavParams,dataManager:ManagerData){
		this.modal = modal;
		this.nav=nav;
		this.params = NavParams;
		this.dataManager = dataManager;
		console.log("init modal");
		this.commentId = params.get('itemId');
		this.dataManager.getComments(this.commentId,this.setList)

	}
	setList(data){
		console.log(data);

	}

	addComment(){
    	this.nav.push(AddCommentPage, {listPage: this});
  	}
}


/*
OBJECTID (type: esriFieldTypeOID, alias: OBJECTID, SQL Type: sqlTypeOther, nullable: false, editable: false)
Tramitación (type: esriFieldTypeString, alias: Tipo, SQL Type: sqlTypeOther, length: 50, nullable: false, editable: true)
Tipología (type: esriFieldTypeString, alias: Tipología, SQL Type: sqlTypeOther, length: 50, nullable: false, editable: true)
Descripción (type: esriFieldTypeString, alias: Descripción, SQL Type: sqlTypeOther, length: 150, nullable: false, editable: true)
Supone_riesgo_ (type: esriFieldTypeString, alias: ¿Supone un riesgo para la seguridad?, SQL Type: sqlTypeOther, length: 50, nullable: false, editable: true)
GlobalID (type: esriFieldTypeGlobalID, alias: Nº de incidencia, SQL Type: sqlTypeOther, length: 38, nullable: false, editable: false)
Fecha (type: esriFieldTypeDate, alias: Fecha, SQL Type: sqlTypeOther, length: 8, nullable: true, editable: true)
Deportes (type: esriFieldTypeString, alias: Deportes, SQL Type: sqlTypeOther, length: 50, nullable: true, editable: true)
CreationDate (type: esriFieldTypeDate, alias: CreationDate, SQL Type: sqlTypeOther, length: 8, nullable: true, editable: false)
Creator (type: esriFieldTypeString, alias: Creator, SQL Type: sqlTypeOther, length: 50, nullable: true, editable: false)
EditDate (type: esriFieldTypeDate, alias: EditDate, SQL Type: sqlTypeOther, length: 8, nullable: true, editable: false)
Editor (type: esriFieldTypeString, alias: Editor, SQL Type: sqlTypeOther, length: 50, nullable: true, editable: false)


[
    {
      "attributes" : {
        "OBJECTID" : "508389",
        "Tramitación" : "Graffiti Complaint - Public Property",
        "Tipología" : "09\/19\/2009",
        "Descripción" : "18:44",
        "Supone_riesgo_" : "11TH ST and HARRISON ST",
        "GlobalID" : "6008925.0",
        "Fecha" : "2108713.8",
        "Deportes" : "6",
        "CreationDate" : 1,
        "Creator" : 1,
        "EditDate" : 1,
        "Editor" : 1
      },
      "geometry" : {
        "x" : -122.41247978999991,
        "y" : 37.770630098000083
      }
    }
]*/