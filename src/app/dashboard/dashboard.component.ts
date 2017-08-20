import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {GlobalService} from '../global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private baseUrl: string = 'http://10.1.0.114:3000/api/v1';
  private StudentTabs = ['avaliacao_professor', 'questoes', 'evolucao'];
  private TeacherTabs = ['feedback', 'metricas_aluno', 'historico'];
  private ParentTabs = ['metricas_professor', 'metricas_aluno', 'historico'];
  private AdminTabs = ['metricas_aluno', 'metricas_professor', 'gerenciamento'];
  public selectedTab: string = "sobre";
  public actualTabList = [];
  public selectedAvaliation: string = '';
  public avaliations = ['1', '2', '3', '4', '5'];
  public avaliated: boolean = false;
  public questions;

  public avaliacao_professor;

  constructor(private http : Http, private globalService: GlobalService) {
    if(this.globalService.user['student']){
      this.actualTabList = this.StudentTabs;
    } else if(this.globalService.user['teacher']){
      this.actualTabList = this.TeacherTabs;
    } else if(this.globalService.user['parent']){
      this.actualTabList = this.ParentTabs;
    } else if(this.globalService.user['admin']){
      this.actualTabList = this.AdminTabs;
    }
  }

  ngOnInit() {
  }

  public selectTab(tab: string){
    this.selectedTab = tab;
    this.setActiveTab(tab);
  }

  private setActiveTab(tab){
    // Control the active class on tabs
    document.getElementById(tab).classList.add('active');
    for(let t of this.actualTabList){
      if(t != tab){
        document.getElementById(t).classList.remove('active');
      }
    }
  }


  public getQuestions(){
    // studentExam/topic/:id ()
    this.http.get(`${this.baseUrl}/topic`, {headers: this.getHeaders()})
        .map(response => response.json())
        .subscribe(result => this.questions = result);
  }

  public getRating(){
    this.http.get(`${this.baseUrl}/ratingQuestion`, {headers: this.getHeaders()})
        .map(response => response.json())
        .subscribe(result => this.avaliacao_professor = result);
  }

  public postRating(){
    let data = {
      "rating":1,
      "teacher":"5999083190e5c803cd9f06c0",
      "student":"5999081890e5c803cd9f06bf",
      "question":"59990a7fb0669e0e564f6567"
    }

    this.http.post(`${this.baseUrl}/rating`, JSON.stringify(data), {headers: this.getHeaders()})

    this.avaliated = true
  }

  private getHeaders(){
    // Configure header to http requests
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return headers;
  }

  public avaliate(){
    console.log(this.selectedAvaliation)
  }

}
