import { Data } from '@angular/router';

export class Task {
    public  TaskId: number ;
    public ProjectId : number ;
    public  ProjectName:string;
    public  ParentTask: boolean;
    public  TaskName :string;
    public  ParentTaskId :number;
    public  StartDate :Date;
    public  EndDate :Date;
    public  Priority :number;
    public  Status :string;
    public  UserId :number;
    public  UserName : string;
    public ParentTaskName : string;
}
