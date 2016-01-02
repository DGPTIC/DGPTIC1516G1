import {Component} from 'angular2/core';

@Component({
	selector:'loading',
	templateUrl:'build/utils/loading.html'
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