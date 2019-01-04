import { Component, OnInit } from '@angular/core';
import {PMUserService} from '../services/pmuser.service';
import {User} from '../user';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import {SearchPipe} from '../search.pipe';
import {FormControl, FormBuilder, FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {  
  userList: User[];  
  text="Add User";
  userForm : FormGroup;
  user={
    UserId:null,
    FirstName:'',
    LastName:'',
    EmployeeId:''
  };
  submitter=false;
  constructor(private userService: PMUserService  ) {  
    this.createForm();                  
  }


  ngOnInit() {      
    this.userService.getUsers().subscribe(i=>this.userList = i);     
    this.reset();     
    }
    
    createForm():void{
      this.userForm = new FormGroup({
        'FirstName' : new FormControl(this.user.FirstName, [
          Validators.required,
          Validators.minLength(100)
        ]),
        'LastName' :  new FormControl(this.user.LastName, [
          Validators.required,
          Validators.minLength(50)
        ]),
        'EmployeeId' :  new FormControl(this.user.EmployeeId, [
          Validators.required,
          Validators.minLength(50)
        ])      
      });
    }

    reset(form?: NgForm)
    {                  
        this.userService.user = {
          UserId:null,
          FirstName:'',
          LastName:'',
          EmployeeId:''
        }
    }

    sort(colName: any)
    {
      if(colName == "FirstName")
      this.userList.sort((a,b) => {
        var nameA = a.FirstName.toLowerCase(),
        nameB = b.FirstName.toLowerCase()
        if(nameA < nameB)
          return -1
        if(nameA > nameB)
          return 1
        return 0
      });
      if(colName == "LastName")
      this.userList.sort((a,b) => {
        var nameA = a.LastName.toLowerCase(),
        nameB = b.LastName.toLowerCase()
        if(nameA < nameB)
          return -1
        if(nameA > nameB)
          return 1
        return 0
      });
      if(colName == "EmployeeId")
      this.userList.sort((a,b) => {
        if(a.EmployeeId < b.EmployeeId)
        return -1
      if(a.EmployeeId > b.EmployeeId)
        return 1
      return 0
      });
    }
    onSubmit(form: NgForm){         
      if(form.value.UserId == null){        
        this.userService.Add(form.value)
        .subscribe(data => {
          this.reset(form);
          alert("Added User Successfully")
          this.userService.getUsers().subscribe(i=>this.userList = i);                    
        })
      }
      else{
        this.userService.Update(form.value)
        .subscribe(data => {
          this.reset(form);
          alert("Updated User Successfully")
          this.userService.getUsers().subscribe(i=>this.userList = i);
        })
      }
    }

    edit(usr:User)
    {
      this.userService.user = Object.assign({},usr);
    }

    delete(Id: number){
      if(confirm('Are you sure to delete this user ?')== true){
        this.userService.Delete(Id).subscribe(x=>{
          this.userService.getUsers().subscribe(i=>this.userList=i);
        })
      }
    }

    
  }


