//import {Injectable} from "angular2/angular2";
import {Injectable, Injector} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http, Request, RequestMethods} from 'angular2/http';
@Injectable()
export class MainNav {

	URL:String;

    constructor(public http:Http){
    	console.log(this.http);
    	this.URL = "http://www.opendatacanarias.es/datos/api/3/action/";
        this.todoList = [{
		    id: 0,
		    name: 'Ben Sparrow',
		    lastText: 'You on your way?',
		    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
		  }, {
		    id: 1,
		    name: 'Max Lynx',
		    lastText: 'Hey, it\'s me',
		    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
		  }, {
		    id: 2,
		    name: 'Adam Bradleyson',
		    lastText: 'I should buy a boat',
		    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
		  }, {
		    id: 3,
		    name: 'Perry Governor',
		    lastText: 'Look at my mukluks!',
		    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
		  }, {
		    id: 4,
		    name: 'Mike Harrington',
		    lastText: 'This is wicked good ice cream.',
		    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
		 }];
    }
    all(){
    	return this.todoList;
  	}
  	request(url:string) {
  		console.log(this.http);
	    return this.http.request(new Request({
	      method: RequestMethods.Get,
	      url: this.URL+url,
	      search: 'password=123'
	    }));
  	}
    add(item){
        this.todoList.unshift({text:item,done:false});
    }
}