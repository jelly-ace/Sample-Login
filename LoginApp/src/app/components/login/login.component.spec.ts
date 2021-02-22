import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../store/effects/user.effects';
import { CommonService } from '../../services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from '../../store/reducers/user.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../shared/app.state';
import { Statuses } from '../../shared/app.constants';
import { UserLogin } from '../../models/user.model';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  //let store: MockStore<AppState>;
  //const initialState = { data: null, status: Statuses.EMPTY };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ user: userReducer }),
        EffectsModule.forRoot([UserEffects]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ], 
      declarations: [LoginComponent],
      providers: [CommonService,
        //provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    //spyOn(store, 'dispatch').and.callFake(() => { });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should contain form elements', () => {
    expect(fixture.debugElement.queryAll(By.css('input[type=email]')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('input[type=password]')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(1);
  });

  it('it should call submit button', fakeAsync(() => {
    spyOn(component, 'login');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.login).toHaveBeenCalled();

  }));
});
