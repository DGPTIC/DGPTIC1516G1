import {Pipe} from 'angular2/core';

@Pipe({name:'distance'})
export class DistancePipe{
	transform(value:number, args:String[]):any{

		var tmp = 0;
		var convertion = 1000;

		if (args.length >0){
			switch(String(args[0]).toLowerCase()){
				case "km":
					convertion = value > 1000 ? 1000 : 1;
				case "mts":
					convertion = value > 100 ? 100 : 1;
				default:
					convertion = 1;
			}
		}
		return value/convertion;
	}
}