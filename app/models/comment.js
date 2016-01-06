export class CommentModel
{
	attributes:Object = {
        "Tramitacion" : ["Sugerencia","Incidencia"],
        "Tipologia" : {"Mal_estado":"Mal estado","Falta_Senalizacion":"Falta Señalización","Vertidos_residuos":"Vertidos y residuos","Falta_informacion":"Falta información","Problemas_de_Accesibilidad":"Problemas de Accesibilidad"},
        "Descripcion" : "",
        "Supone_riesgo_" : ["Si","No"],
        "Fecha" : "",
        "Deportes" : {"mtb":"Bicicleta de montaña","parapente":"Parapente","senderos":"Senderismo"},
        "Creator" : ""
        
      };

    OBJECTID:String;
    Tramitacion:String;
    Tipologia:String;
    Descripcion:String;
    Supone_riesgo_:String;
    GlobalID:String;
    Fecha:String;
    Deportes:String;
    CreationDate:String;
    Creator:String;
    EditDate:String;
    Editor:String;

	constructor(){
		//scope 
		this.self = this;

	}

    getData():Object{
        return this.attributes;
    }

	setData(data){
        this.attributes.Supone_riesgo_= data.risk;
        this.attributes.Tramitacion= data.type;
        this.attributes.Tipologia= this.attributes.Tipologia[data.problem];
        this.attributes.Descripcion= data.description;
        this.attributes.Creator = data.itemId;
        this.attributes.Deportes = this.attributes.Deportes[data.sport];
        this.attributes.Creator = JSON.stringify(data.user);
	}
}