
import { Component, OnInit } from '@angular/core';
import {PMProjectService} from '../services/pmproject.service';
import {PMUserService} from '../services/pmuser.service';
import {Project} from '../project';
import {User} from '../user';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import {SearchPipe} from '../search.pipe';
import{Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {  
  projectList: Project[];       
  userList : User[];   
  dateChecked : boolean;
  project:Project;
  today: any;
  nextDate : any;  
  sdate: any;
  edate: any;
  constructor(private projectService: PMProjectService,private userService : PMUserService) {
    this.projectService.getProjects().subscribe(i=>this.projectList = i);       
    this.userService.getUsers().subscribe(i=>this.userList = i);         
    this.reset();          
    this.projectService.project.DateChecked = true;           
    this.today = new Date().toISOString().split('T')[0];      
    this.nextDate = new Date(Date.now()+24*60*60*1000).toISOString().split('T')[0];
    this.projectService.project.StartDate = this.today;
    this.projectService.project.EndDate = this.nextDate;
  }

  ngOnInit() {                
    }
    
    reset(form?: NgForm)
    {                  
        this.projectService.project = {
          UserId:null,
          ProjectId :null,
          ProjectName :'',
          Priority :null,
          StartDate :null,
          EndDate :null,     
          ManagerName  :'',
          Status:'',
          TaskCount: null,
          DateChecked:null
        }
        this.projectService.project.DateChecked = true; 
    }  
    checkDate(evt) 
    {
      if(evt.target.checked)
      {
        this.dateChecked = true;
        this.projectService.project.DateChecked = true;  
      }
      else
      {
        this.dateChecked = false; 
        this.projectService.project.DateChecked = false;         
      }        
    } 
    changed(usr:User ) {
      this.projectService.project.UserId = usr.UserId;
      this.projectService.project.ManagerName = usr.FirstName +"  " + usr.LastName;
    }
    sort(colName: any)
    {     
      if(colName == "StartDate")
      this.projectList.sort((a,b) => {
        return <any>new Date(b.StartDate) - <any> new Date(a.StartDate);
      });
      if(colName == "EndDate")
      this.projectList.sort((a,b) => {
        return <any>new Date(b.EndDate) - <any> new Date(a.EndDate);
      });
      if(colName == "Priority")
      this.projectList.sort((a,b) => {
        return <any>new Date(b.Priority) - <any> new Date(a.Priority);
      });
      if(colName == "Completed")
      this.projectList.sort((a,b) => {
        var nameA = a.Status.toLowerCase(),
        nameB = b.Status.toLowerCase()
        if(nameA < nameB)
          return -1
        if(nameA > nameB)
          return 1
        return 0
      });
    }
    onSubmit(form: NgForm){         
      if(form.value.ProjectName == '' || form.value.ProjectName == null)
      {
        alert("Enter Project Name");
        return;
      }         
      if(this.dateChecked == true)     
      {            
        if(form.value.StartDate == null)
        {
          alert("Enter StartDate with Time");
          return;
        }

          if(form.value.EndDate == null)
          {
            alert("Enter EndDate with Time");
            return;
          }
      }    
      if(form.value.ManagerName == '' || form.value.ManagerName == null)
      {
        alert("Enter Manager Name");
        return;
      }   
      if(form.value.ProjectId == null){    
        form.value.Status = "InProgress";           
        this.projectService.Add(form.value)
        .subscribe(data => {
          this.reset(form);
          alert("Added Project Successfully")
          this.projectService.getProjects().subscribe(i=>this.projectList = i);                    
        })
      }
      else{                
        this.projectService.Update(form.value)
        .subscribe(data => {
          this.reset(form);
          alert("Updated Project Successfully")
          this.projectService.getProjects().subscribe(i=>this.projectList = i);
        })
      }
    }

    edit(proj:Project)
    {            
      var date = new DatePipe("en-US");    
      this.sdate = date.transform(proj.StartDate,'MM/dd/yyyy');      
      this.edate = date.transform(proj.EndDate,'MM/dd/yyyy');
      proj.StartDate = this.sdate;
      proj.EndDate = this.edate;  
      if(proj.StartDate != null && proj.EndDate != null)
          this.projectService.project.DateChecked = true;  
      else
         this.projectService.project.DateChecked = false;            
      this.projectService.project = Object.assign({},proj);                 
    }

    suspend(proj:Project){
      if(confirm('Are you sure to suspend this project ?')== true){
        proj.Status = "Suspended";
        this.projectService.Update(proj).subscribe(x=>{
          this.projectService.getProjects().subscribe(i=>this.projectList=i);
        })
      }
    }    
  }



