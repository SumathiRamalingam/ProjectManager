import { Component, OnInit } from '@angular/core';
import {PMTaskService} from '../services/pmtask.service';
import {Task} from '../task';
import { NgForm } from '@angular/forms';
import {SearchPipe} from '../search.pipe';
import{Pipe, PipeTransform} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {           
  taskList :Task[];    
  constructor(private taskService: PMTaskService, private router: Router) {  
    this.taskService.getTasks().subscribe(i=>this.taskList = i);        
  }

  ngOnInit() {                       
         
    }
         
    sort(colName: any)
    {     
      if(colName == "StartDate")
      this.taskList.sort((a,b) => {
        return <any>new Date(b.StartDate) - <any> new Date(a.StartDate);
      });
      if(colName == "EndDate")
      this.taskList.sort((a,b) => {
        return <any>new Date(b.EndDate) - <any> new Date(a.EndDate);
      });
      if(colName == "Priority")      
      this.taskList.sort((a,b) => {
        return <any>new Date(b.Priority) - <any> new Date(a.Priority);
      });
      if(colName == "Completed")
      this.taskList.sort((a,b) => {
        var nameA = a.Status.toLowerCase(),
        nameB = b.Status.toLowerCase()
        if(nameA < nameB)
          return -1
        if(nameA > nameB)
          return 1
        return 0
      });
    } 

    endTask(task:Task){
      if(confirm('Are you sure to end this task ?')== true){
        task.Status = "Completed";
        this.taskService.Update(task).subscribe(x=>{
          this.taskService.getTasks().subscribe(i=>this.taskList=i);
        })
      }
    } 
  }




