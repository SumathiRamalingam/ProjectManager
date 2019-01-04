import { Component, OnInit } from '@angular/core';
import {PMUserService} from '../services/pmuser.service';
import {PMTaskService} from '../services/pmtask.service';
import {PMProjectService} from '../services/pmProject.service';
import {User} from '../user';
import {Task} from '../task';
import {Project} from '../project';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';
import {SearchPipe} from '../search.pipe';
import{Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit { 
  projectList : Project[];
  userList : User[]; 
  taskList :Task[];
  taskId : number;     
  constructor(private taskService: PMTaskService,private projectService: PMProjectService,
    private userService : PMUserService,private activateRoute: ActivatedRoute,private router: Router) {          
      this.projectService.getProjects().subscribe(i=>this.projectList = i);       
      this.userService.getUsers().subscribe(i=>this.userList = i); 
      this.taskService.getTasks().subscribe(i=>this.taskList = i);      
  }

  ngOnInit() {        
    this.activateRoute.params.subscribe(params=>{
      this.taskId = + params['TaskId'];                
    })   
    this.taskService.get(this.taskId).subscribe(i=>this.taskService.task = i) ; 
   
    }
             
    changed(usr:User ) {
      this.taskService.task.UserId = usr.UserId;
      this.taskService.task.UserName = usr.FirstName +"  " + usr.LastName;      
    }  
    changedTask(task:Task ) {
      this.taskService.task.ParentTaskId = task.TaskId;
      this.taskService.task.ParentTaskName = task.TaskName;
    }  
       

    onSubmit(form: NgForm){        
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
      this.taskService.Update(form.value)
        .subscribe(data => {         
          alert("Updated task Successfully")          
        })                  
    }  
      
  }





