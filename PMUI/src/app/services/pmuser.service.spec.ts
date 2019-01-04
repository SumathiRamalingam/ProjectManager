import { ComponentFixture, TestBed , inject} from '@angular/core/testing';
import {PMUserService} from '../services/pmuser.service';
import{HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpHeaders,HttpRequest,  HttpResponse, HttpClientModule } from "@angular/common/http";
import {User} from '../user';

describe('PMUserService', () => {
    let service: PMUserService;
    let httpMock : HttpTestingController;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,HttpClientModule],
        providers:[PMUserService]
    });
    service = TestBed.get(PMUserService);
    httpMock = TestBed.get(HttpTestingController);
});

it('should be created', () => {   
      
    expect(service).toBeTruthy();
});


it('Service should check with Dummy post from api via get method' ,() => {
    const dummyPost: User[] = [
        {
            FirstName:'TFname',
            LastName:'TLName',
            EmployeeId:'T123',
            UserId:null
        }
    ];    
    service.get(4).subscribe(post=>{
        expect(post.EmployeeId).toBe(dummyPost.find(i=>i.EmployeeId=='T123').EmployeeId);
    });
});
});

