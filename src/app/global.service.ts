import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  public user = {
          "name":"",
          "username":"",
          "admin":false,
          "parent":false,
          "student":false,
          "teacher":false
         };

  constructor() { }

}
