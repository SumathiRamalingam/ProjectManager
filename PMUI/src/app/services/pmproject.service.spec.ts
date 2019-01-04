import { ComponentFixture, TestBed , inject} from '@angular/core/testing';
import {PMProjectService} from '../services/pmproject.service';
import{HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpHeaders,HttpRequest,  HttpResponse, HttpClientModule } from "@angular/common/http";
import {Project} from '../project';

describe('PMProjectService', () => {
    let service: PMProjectService;
    let httpMock : HttpTestingController;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,HttpClientModule],
        providers:[PMProjectService]
    });
    service = TestBed.get(PMProjectService);
    httpMock = TestBed.get(HttpTestingController);
});

it('should be created', () => {    
    expect(service).toBeTruthy();
});

it('Service should check with Dummy post from api via get method' ,() => {
    const dummyPost: Project[] = [
        {
            UserId:1,
            ProjectId :1,
            ProjectName :'Test Project',
            Priority :1,
            StartDate :new Date('2018-12-30'),
            EndDate :new Date('2018-12-30'),     
            ManagerName  :'AAAA',
            Status:'InProgress',
            TaskCount: null
        }
    ];

    service.get(4).subscribe(post=>{
        expect(post.ProjectName).toBe(dummyPost.find(i=>i.ProjectName=='Test Project').ProjectName);
    });
});
});

