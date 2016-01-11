import {Injectable} from 'angular2/core';
import {ConfigApp} from '../conf/config-app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class FacebookService {

	fb:any;
	config:ConfigApp;
	events:Observable<any[]>;
	_dataObserver: any;

	constructor(){
		this.config = new ConfigApp();
		this.events = new Observable(observer => this._dataObserver = observer).share();
		var params = {appId: this.config.getUrl("facebook").appId};
		if(window.openFB){
			this.fb = window.openFB.init(params);
			console.log("facebook ok");
		}else{
			console.log("error facebook connect");
		}

	}
    login(options) {

		//window.openFB.login(callback,options)
		var self = this;
        window.openFB.login(function(result) {
            self._dataObserver.next({"event":"login","result":result});
            /*if (result.status === "connected") {
                //deferred.resolve(result);
            } else {
                deferred.reject(result);
            }*/
        }, options);
        //return deferred.promise;
    }

    logout() {
        var deferred = $q.defer();
        window.openFB.logout(function() {
            deferred.resolve();
        });
        return deferred.promise;
    }

    api(obj) {
        var self = this;
        obj.success = function(result) {
            self._dataObserver.next({"event":"api-success","result":result});
        };
        obj.error = function(error) {
            self._dataObserver.next({"event":"api-error","result":error});
        };
        window.openFB.api(obj);

    }

    revokePermissions() {
        var self=this;
        window.openFB.revokePermissions(
            function() {
                self._dataObserver.next({"event":"api-success","result":result});
            },
            function() {
                self._dataObserver.next({"event":"api-success","result":result});
            }
        );
        return deferred.promise;
    }

    getLoginStatus() {
        var self=this;
        window.openFB.getLoginStatus(
            function(result) {
                self._dataObserver.next({"event":"api-success","result":result});
            }
        );
    }
}
