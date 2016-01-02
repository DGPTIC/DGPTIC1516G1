export class DataItem{
    thumbnailUrl:String;
    name:String;
    description:String;
    owner:String;
    serviceUrl:String;
    categoryId:String;
    itemId:String;
    descriptorTable:String;

    constructor(){

        this.descriptorTable = `CREATE TABLE IF NOT EXISTS items 
        (itemId char(50) primary key, thumbnailUrl text,name text, description text, owner text,serviceUrl text,
        categoryId char(50))`;
        
    }
}
export class Category{
    categoryId:Number;
    name:String;
    lastUpdate:Date;
    descriptorTable:String;
    constructor(){
        
        this.descriptorTable = `CREATE TABLE IF NOT EXISTS categories 
        (categoryId char(50) primary key, name text, last_update TEXT)`;
    
    }
}

export class Cordinates{
    position:String;
    descriptorTable:String;
    constructor(){

        this.descriptorTable = `CREATE TABLE IF NOT EXISTS cordinates 
        (postionId char(50) primary key, position text)`;
        
    }
}

export class ParaglidingModel{
    //init variables for dynamic inserts

    name:String = "";
    description:String="";
    owner:String="";
    url:String="";
    categoryId:String="";
    license:String="";
    main_group_title:String="";
    main_group_description:String="";
    main_group_thumbnail_url:String=""; 
    thumbnail_url:String="";
    updated_at:String="";
    rutes:Object[];

    constructor(){
        this.rutes=[];
    }

    ruteDescriptor(){
        return {
            "DIFICULTAD":"",
            "ID":"",
            "LONGITUD":"",
            "TIPO":"",
            "FECHA":"",
            "NAME":"",
            "coordinates":"",
            "Seguridad":"",
            "LongitudW":"",
            "LatitudN":"",
            "Informacion":"",
            "Frecuencia_seguridad":"",
            "FINEZA":"",
            "DESNIVEL":"",
            "ATERRIZAJE":"",
            "ALTITUD":""
        };
    }

    setGeoData(data){
        this.rutes=[];
        if(data.hasOwnProperty("geo") && data.geo != ""){
            for(var rut in data.geo.features){
                var feature = data.geo.features[rut];
                var descriptor=this.ruteDescriptor();
                //descriptor.DIFICULTAD = String(feature.properties["Dificultad"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                //descriptor.LONGITUD = String(feature.properties["Longitud__"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.NAME = String(feature.properties["Nombre"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.TIPO = String(feature.properties["Tipo"]);

                descriptor.ALTITUD = String(feature.properties["Altitud_m"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.ATERRIZAJE = String(feature.properties["Aterrizaje"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.DESNIVEL = String(feature.properties["Desnivel"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.FINEZA = String(feature.properties["Fineza"]);
                descriptor.Frecuencia_seguridad = String(feature.properties["Frecuencia_seguridad"]);
                descriptor.Informacion = String(feature.properties["Informacion"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.LatitudN = String(feature.properties["LatitudN"]);
                descriptor.LongitudW = String(feature.properties["LongitudW"]);
                descriptor.Seguridad = String(feature.properties["Seguridad"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                
                descriptor.coordinates = JSON.stringify(feature.geometry);
                
                this.rutes.push(descriptor);
            }
        }
    }

    setData(data){

        if(data.hasOwnProperty("description") && data.description !="" ){
            var _description = data.description;
            var iSelf = this;
            for(var key in iSelf){
                try{
                    if((this[key] == "" || this[key] == undefined || this[key]== null) && (typeof this[key] != "object" || typeof this[key] != "function")){
                        var descriptionStr = String(_description[key]);
                        descriptionStr = descriptionStr.replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                        this[key] = descriptionStr;
                    }
                }catch(err){
                    console.log("not property( "+key+") found");
                }
            }    
        }
    }
}


export class MtbModel{
    //init variables for dynamic inserts

    name:String = "";
    description:String="";
    owner:String="";
    url:String="";
    categoryId:String="";
    license:String="";
    main_group_title:String="";
    main_group_description:String="";
    main_group_thumbnail_url:String=""; 
    thumbnail_url:String="";
    updated_at:String="";
    rutes:Object[];

    constructor(){
        this.rutes=[];
    }

    ruteDescriptor(){
        return {
            "DIFICULTAD":"",
            "ID":"",
            "LONGITUD":"",
            "TIPO":"",
            "FECHA":"",
            "NAME":"",
            "coordinates":""
        };
    }

    setGeoData(data){
        this.rutes=[];
        
        if(data.hasOwnProperty("geo") && data.geo != ""){
            for(var rut in data.geo.features){
                var feature = data.geo.features[rut];
                var descriptor=this.ruteDescriptor();
                descriptor.DIFICULTAD = String(feature.properties["Dificultad"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.LONGITUD = String(feature.properties["Longitud__"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.NAME = String(feature.properties["Rutas"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.TIPO = String(feature.properties["Tipo"]).replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                descriptor.coordinates = JSON.stringify(feature.geometry);
                this.rutes.push(descriptor);
            }
        }

    }

    setData(data){
        
        if(data.hasOwnProperty("description") && data.description !="" ){
            var _description = data.description;
            var iSelf = this;
            for(var key in iSelf){
                try{
                    
                    if((this[key] == "" || this[key] == undefined || this[key]== null) && (typeof this[key] != "object" || typeof this[key] != "function")){
                        var descriptionStr = String(_description[key]);
                        descriptionStr = descriptionStr.replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                        this[key] = descriptionStr;
                    }
                        
                    
                }catch(err){
                    console.log("not property( "+key+") found");
                }
            }    
        }
    }


}

export class TrailsModel{

    //init variables for dynamic inserts

    name:String = "";
    description:String="";
    owner:String="";
    url:String="";
    categoryId:String="";
    license:String="";
    main_group_title:String="";
    main_group_description:String="";
    main_group_thumbnail_url:String=""; 
    thumbnail_url:String="";
    updated_at:String="";
    rutes:Object[];

    constructor(){
        this.rutes=[];
    }

    ruteDescriptor(){
        return {
            "DIFICULTAD":"",
            "ID":"",
            "LONGITUD":"",
            "TIPO":"",
            "FECHA":"",
            "coordinates":""
        };
    }

    setGeoData(data){
        this.rutes=[];
        if(data.hasOwnProperty("geo") && data.geo != ""){
            for(var rut in data.geo.features){
                var feature = data.geo.features[rut];
                var descriptor={};
                for(var key in this.ruteDescriptor()){
                    try{
                        
                        var descriptionStr = String(feature.properties[key]);
                        descriptionStr = descriptionStr.replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                        if (key == "ID"){
                            descriptor["NAME"] = descriptionStr;
                        }else{
                            descriptor[key] = descriptionStr;    
                        }
                        
                    }catch(err){
                        console.log("not property( "+key+") found");
                    }
                }

                descriptor.coordinates = JSON.stringify(feature.geometry);
                this.rutes.push(descriptor);
            }
        }
    }



    setData(data){
        if(data.hasOwnProperty("description") && data.description !="" ){
            var _description = data.description;
            var iSelf = this;
            for(var key in iSelf){
                try{
                    
                    if((this[key] == "" || this[key] == undefined || this[key]== null) && (typeof this[key] != "object" || typeof this[key] != "function")){
                        var descriptionStr = String(_description[key]);
                        descriptionStr = descriptionStr.replace(/<(?:.|\n|\t|\r)*?>/gm,'');
                        this[key] = descriptionStr;
                    }
                        
                    
                }catch(err){
                    console.log("not property( "+key+") found");
                }
            }    
        }
    }
}