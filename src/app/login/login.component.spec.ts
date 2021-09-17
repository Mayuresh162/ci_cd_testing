import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { LoginComponent } from './login.component';
import { LoginService, Post } from '../login.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService, httpTestController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        LoginService,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
    loginService = TestBed.get(LoginService);
    httpTestController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(userEmail = '', userPassword = '') {
    component.user['email'] = userEmail;
    component.user['password'] = userPassword;
    component.updatedUser = component.user;
  }

  // Isolated Testing
  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.user.email).toBe('');
    expect(component.user.password).toBe('');
    expect(component.error).toBeFalsy();
    expect(component.errorMsg).toBe('');
  });

  it('submitted should be true when onSubmit()', () => {
    component.validateUser(component.loginForm.value);
    expect(component.submitted).toBeTruthy();
  });

  it('form value should update from when you change the input', (() => {
    updateForm('sha@codewalla.com', '1234');
    expect(component.updatedUser).toEqual(component.user);
    expect(component.error).toBeFalsy();
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm();
    expect(component.user.email).toBe('');
    expect(component.user.password).toBe('');
    component.validateUser(component.loginForm.value);
    expect(component.error).toBeTruthy();
    expect(component.errorMsg).toContain('Please fill the details');
  }));


  // Shallow Testing
  it('created a form with username and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm('', '1234');
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please fill the details');
  });

  it('Display Password Error Msg when Username is blank', () => {
    updateForm('sha@codewalla.com', '');
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please fill the details');
  });
​
  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm();
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const errorMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');
    expect(errorMsg).toBeDefined();
    expect(errorMsg.innerHTML).toContain('Please fill the details');
  });

  // Integrated Testing
  it('should retrieve all posts', () => {
    // const queryParams = '';
    loginService.getPost()
    .subscribe(res => {
      const response: any = res;
      expect(response).toBeTruthy('No posts found');
      expect(response.length).toBeGreaterThan(0);
      const post = response.find(p => p.id == 2);
      expect(post.title).toBe('qui est esse');
    });

    const req = httpTestController.expectOne('https://jsonplaceholder.typicode.com/posts');

    expect(req.request.method).toEqual('GET');

    // req.flush(Object.values(Post));
  });

});
