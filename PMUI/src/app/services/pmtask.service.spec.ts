import { ComponentFixture, TestBed , inject} from '@angular/core/testing';
import {PMTaskService} from '../services/pmtask.service';
import{HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpHeaders,HttpRequest,  HttpResponse, HttpClientModule } from "@angular/common/http";
import {Task} from '../task';

describe('PMTaskService', () => {
    let service: PMTaskService;
    let httpMock : HttpTestingController;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,HttpClientModule],
        providers:[PMTaskService]
    });
    service = TestBed.get(PMTaskService);
    httpMock = TestBed.get(HttpTestingController);
});

it('should be created', () => {    
    expect(service).toBeTruthy();
});

it('Service should check with Dummy post from api via get method' ,() => {
    const dummyPost: Task[] = [
        {
            TaskId: null,
            ProjectId : 1,
            ProjectName:'Project1',
            ParentTask: false,
            TaskName :'TestTasks',
            ParentTaskId :null,
            StartDate :new Date('2018-12-30'),
            EndDate :new Date('2018-12-30'),
            Priority :10,
            Status :'InProgress',
            UserId :1,  
            UserName:'AAAA',
            ParentTaskName:'', 
        }
    ];

    service.get(4).subscribe(post=>{
        expect(post.TaskName).toBe(dummyPost.find(i=>i.TaskName=='TestTasks').TaskName);
    });
});
});

