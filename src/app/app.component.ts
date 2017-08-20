import { Component } from '@angular/core';

import {GlobalService} from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trilha';

  constructor(private globalService: GlobalService){}
}
