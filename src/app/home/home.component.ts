import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {GlobalService} from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Attributes
  public selectedTab: string = "sobre";
  public username: string = '';
  public password: string = '';


  private tabs = ['sobre', 'parceiros', 'precos', 'acesso'];
  private baseUrl: string = 'http://10.1.0.114:3000/api/v1';

  constructor(private http : Http, private globalService: GlobalService) { }

  ngOnInit() {
  }

  public selectTab(tab: string){
    this.selectedTab = tab;
    this.setActiveTab(tab);
  }

  private setActiveTab(tab){
    // Control the active class on tabs
    document.getElementById(tab).classList.add('active');
    for(let t of this.tabs){
      if(t != tab){
        document.getElementById(t).classList.remove('active');
      }
    }
  }

  public login(){
    console.log(this.username, ' - ', this.password);
    let data = {
      "username":this.username,
      "password":this.password
    }

    this.http.post(`${this.baseUrl}/user/login`, JSON.stringify(data), {headers: this.getHeaders()})
        .map(response => response.json())
        .subscribe(result => this.globalService.user = result);

  }

  private getHeaders(){
    // Configure header to http requests
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return headers;
  }

}
