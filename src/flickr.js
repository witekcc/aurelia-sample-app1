import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

//dependency injection; corresponds to the constructor argument list
//If you are using TypeScript >= 1.5, you can add the @autoinject and constructor(public http:HttpClient){}
@inject(HttpClient) 
export class Flickr{
  heading = 'Flickr';
  images = [];
  url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=rainier&tagmode=any&format=json';

  constructor(http){
    this.http = http;
  }

  //When your route is ready to activate the router will call the activate hook, if present
  //we use this hook to call the Flickr api and get some images back
  activate(){
    return this.http.jsonp(this.url).then(response => {
      this.images = response.content.items;
    });
    //we return the result of the http request back from our activate method. All the HttpClient APIs return a Promise
    //The router will detect a Promise and wait to complete navigation until after it resolves. 
    //So, in this way, you can optionally force the router to delay displaying the page until it is populated with data.
  }

  //The router calls this before navigation away from the route happens
  // You can also return a Promise for that value. 
  //The full lifecycle includes canActivate, activate, canDeactivate and deactivate hooks.
  canDeactivate(){
    return confirm('Are you sure you want to leave?');
  }
}
