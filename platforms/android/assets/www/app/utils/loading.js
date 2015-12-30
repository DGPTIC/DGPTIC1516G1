import {Component} from 'angular2/angular2';

@Component({
	selector:'loading',
	template:'<div> loading...</div>'
})

export class Loading{
	state:String
	constructor(){
		console.log("loading...");
		this.state = "show";
	}
	hide(){
		this.state = "hidden";
	}
	show(){
		this.state = "show";
	}
}