import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from 'src/localstoarge.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login: FormGroup;
  loginuser: any;

  constructor(
    private storage: LocalService,
    private route: Router
  ) {

    this.login = new FormGroup({

      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),


    });
  }

  OnSubmit(value: any) {
    this.loginuser = JSON.parse(this.storage.getData('SignData') as string);
    console.log(this.loginuser);
    if (this.loginuser != null) {
      let index = this.loginuser.findIndex((element: any) => element.email == value.email && element.password == value.password);
      console.log(index);
      if (index >-1) {
        this.route.navigate(['view/']);
        this.storage.saveData('LoginUser', JSON.stringify(value));
        this.login.reset();
      } else {
        console.log("Data not found!");
      }
    } 
  }
}






