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
    this.selectedTab[0];
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
  }

  public getRating(){
    // rating
  }

  public postRating(){
    // ratingAnswer
  }

}
