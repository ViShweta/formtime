import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/localstoarge.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  user_data:any;
  User_Time: any = [];
  Work_day:any=[];

  DaysOfWeek=[
    {name:'Monday',value:false,starttime:'',endtime:''},
    {name:'Tuesday',value:false,starttime:'',endtime:''},
    {name:'Wednesday',value:false,starttime:'',endtime:''},
    {name:'Thursday',value:false,starttime:'',endtime:''},
    {name:'Friday',value:false,starttime:'',endtime:''},
    {name:'Saturday',value:false,starttime:'',endtime:''},
    {name:'Sunday',value:false,starttime:'',endtime:''},
  ];


  constructor(
    private storage:LocalService,
    private route:Router,
  ) { }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user_data = JSON.parse(this.storage.getData('LoginUser') as string);
    console.log('data:',this.user_data);
    this.Work_day = JSON.parse(this.storage.getData('Working_day') as string);
    console.log('Work_day:',this.Work_day);
    if (this.Work_day != null) {
      const index = this.Work_day.findIndex((element: any) => element.userEmail == this.user_data.email);
      if (index > -1) {
         this.User_Time = this.Work_day[index];
         this.DaysOfWeek =  this.User_Time.working;
         console.log("User_Timing:",this.User_Time)
      } 
    }

  };


  SaveDays() {
    let saveData: any = {
      userEmail: this.user_data.email,
      working: this.DaysOfWeek
    };
  
    if (this.Work_day != null) {
      const index = this.Work_day.findIndex((element: any) => element.userEmail == this.user_data.email);
      if (index > -1) {
        this.Work_day[index].working = this.DaysOfWeek;
      } else {
        this.Work_day.push(saveData);
      }
    } else {
      let saveWork: any = [];
      saveWork.push(saveData);
      this.Work_day = saveWork;
    }
  
    this.storage.saveData('Working_day', JSON.stringify(this.Work_day));
  }
  
  Logout() {
    this.storage.removeData('LoginUser');
    this.route.navigate(['/home']);
  }


 

}
