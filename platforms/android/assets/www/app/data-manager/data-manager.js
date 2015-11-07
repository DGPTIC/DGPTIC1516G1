//open data URL follow documentation of http://docs.ckan.org/en/ckan-2.2/api.html#making-an-api-request

import {Http, HTTP_PROVIDERS} from 'angular2/http';
import { Injectable } from 'angular2/angular2';


export class DataManager {
	
	seaarchPhoto(query) {
    	return fetch(`http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=[your api key here]&texts=${query}&format=json`).
    	.then(function(response) {
      		return response;
     	}

	checkData(response:Response){
		console.log(response);
	} 

	demo(){
		console.log("ok");
	} 
}
