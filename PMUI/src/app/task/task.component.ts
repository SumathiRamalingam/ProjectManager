

import { Component, OnInit } from '@angular/core';
import {PMProjectService} from '../services/pmproject.service';
import {PMUserService} from '../services/pmuser.service';
import {PMTaskService} from '../services/pmtask.service';
import {Project} from '../project';
import {User} from '../user';
import {Task} from '../task';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import {SearchPipe} from '../search.pipe';
import{Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {  
  projectList: Project[];       
  userList : User[];  
  taskList :Task[];   
  constructor(private taskService: PMTaskService,private projectService: PMProjectService,
    private userService : PMUserService) {          
  }

  ngOnInit() {         
    this.projectService.getProjects().subscribe(i=>this.projectList = i);       
    this.userService.getUsers().subscribe(i=>this.userList = i);         
    this.taskService.getTasks().subscribe(i=>this.taskList = i);  
    this.reset();               
    }
    
    reset(form?: NgForm)
    {                  
        this.taskService.task = {
            TaskId: null,
            ProjectId : null,
            ProjectName:'',
            ParentTask: null,
            TaskName :'',
            ParentTaskId :null,
            StartDate :null,
            EndDate :null,
            Priority :null,
            Status :'',
            UserId :null,  
            UserName:'',
            ParentTaskName:'',       
        }
    }      
    changed(usr:User ) {
      this.taskService.task.UserId = usr.UserId;
      this.taskService.task.UserName = usr.FirstName +"  " + usr.LastName;      
    }  
    changedTask(task:Task ) {
      this.taskService.task.ParentTaskId = task.TaskId;
      this.taskService.task.ParentTaskName = task.TaskName;
    }  
    changedProject(proj:Project ) {
      this.taskService.task.ProjectId = proj.ProjectId;
      this.taskService.task.ProjectName = proj.ProjectName;
    }    

    onSubmit(form: NgForm){  
      if(form.value.ProjectName == '' || form.value.ProjectName == null)
      {
        alert("Enter Project Name");
        return;
      }  
      if(form.value.TaskName == '' || form.value.TaskName == null)
      {
        alert("Enter Task Name");
        return;
      }          
                
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
      if(form.value.UserName == '' || form.value.UserName == null)
      {
        alert("Enter User Name");
        return;
      }        
      if(form.value.TaskId == null){    
        form.value.Status = "InProgress";           
        this.taskService.Add(form.value)
        .subscribe(data => {
          this.reset(form);
          alert("Added Task Successfully")                         
        })
      }
      else{
        this.taskService.Update(form.value)
        .subscribe(data => {
          this.reset(form);
          alert("Updated Task Successfully")          
        })
      }
    }  
      
  }




