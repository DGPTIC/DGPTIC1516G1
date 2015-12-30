import {Component} from 'angular2/angular2';
import {NgStyle} from 'angular2/common'
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2'

@Component({
	selector:"card-content",
	templateUrl:'app/cards/cards.html',
	directives:[NgStyle,NgSwitch, NgSwitchWhen, NgSwitchDefault],
	properties:['rutes:rutes']
})
export class CardContent{



	constructor(){}
	initContent(){

	}


}