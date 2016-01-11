import {Page,NavParams,NavController,Modal,Popup} from 'ionic/ionic';
import {ManagerData} from '../models/manager-data';
import {AddCommentPage} from '../add-comment/add-comment';
import {Loading} from '../utils/loading';
import {FacebookService} from '../data/facebook';
import {ImageUtil} from '../utils/image-util';


@Page({
	templateUrl: 'build/comments/comments.html',
	directives:[Loading]

})
export class Comments{
	comments:any;
	noReports:Boolean;
	loading:Boolean;
	fbConnect:any;

	constructor(nav:NavController,popup: Popup,params:NavParams,dataManager:ManagerData,modal:Modal,fbConnect:FacebookService){
		this.nav=nav;
		this.modal=modal;
		this.popup = popup;
		this.params = NavParams;
		this.dataManager = dataManager;
		this.fbConnect = fbConnect;
		this.fbConnect.events.subscribe(data =>{this.facebookRepond(data);},err=>console.log(err),()=>console.log("ok!"));
		this.comments=[];
		this.noReports=false;
		this.loading = true;

		this.commentId = params.get('itemId');

		var opt = {"mtb":"Bicicleta de montaña","parapente":"Parapente","senderos":"Senderismo"};
		this.category = params.get('sport')
		this.sport = opt[this.category];

		this.dataManager.getComments(this.sport,this.setList,this);

		console.log(this.params)

	}
	setList(data,args){
		args.ref.loading = false;
		console.log(data.hasOwnProperty("features"), data.features.length>0)
		if(data.hasOwnProperty("features") && data.features.length>0){
			args.ref.comments = data.features;
		}else{
			args.ref.noReports = true;
		}
	}

	facebookRepond(data){
		console.log(data);
		switch(data.event){
			case "login":
				if (data.result.status==="connected") {
						this.getFacebookData();
				}else{
						this.facebookError();
				}

			break;
			case "api-success":
				var user = {
					"email":data.result.email,
					"id":data.result.id,
					"name":data.result.name,
					"picture":""
				}

				this.imageUtil = new ImageUtil().imageToString(data.result.picture.data.url,function(response){user.picture=response;});;
				this.onLogin(user);
			break;
			case "api-erro":
				this.facebookError();
			break;
		}
	}

	facebookError(){
		this.popup.alert({
	      title: "Erro!",
	      template: "Se ha producido un error en la autenticación"
	    });

	}
	facebookConnect(){

		this.fbConnect.login({scope: 'public_profile'})

	}

	getFacebookData(){
		var obj={"path":"/v2.5/me",params:{"fields":"id,picture,name,email"}}
		this.fbConnect.api(obj);
	}

	onLogin(responds){
		this.nav.push(AddCommentPage,{"listPage": this,"sport":this.category,"user":responds})
	}

	addComment(){
		this.facebookConnect();
  	}
}
