import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser } from '../../store/actions/user.action';
import { AppState } from '../../shared/app.state';
import { Observable } from 'rxjs';
import { pairwise, map } from 'rxjs/operators';
import { UserLogin, UserProfile } from '../../models/user.model';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserEffects } from '../../store/effects/user.effects';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userProfile: Observable<UserProfile[]>;
  userp: Observable<UserProfile[]>;
  loginForm: FormGroup;
  user$: Observable<any> = this.userEffects.user$;
  eh: any;
  constructor(private store$: Store<AppState>,
    private fb: FormBuilder,
    private userEffects: UserEffects) {
    this.userProfile = this.store$.select(state => state.userProfile);

  }

  get f() { return this.loginForm.controls; }

  login(): void {
    if (this.loginForm.invalid) return;
    
    this.userEffects.login(<UserLogin>this.loginForm.value)
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]]
    });

  }

}
