import {Component} from 'angular2/core';
import {NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'


@Component({
	selector:"card-content",
	templateUrl:'build/cards/cards.html',
	directives:[NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault],
	properties:['rutes:rutes']
})
export class CardContent{



	constructor(){}
	initContent(){

	}


}