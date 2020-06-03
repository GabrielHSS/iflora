import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Register {
  name: string,
  last_name: string,
  nickname: string,
  email: string,
  password: string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  addressForm = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(60)]],
    last_name: [null, [Validators.required, Validators.maxLength(60)]],
    nickname: [null, [Validators.required, Validators.maxLength(60)]],
    email: [null, [Validators.required, Validators.maxLength(60), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: [null, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  mobile = false;
  getmobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 450;
    console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.mobile = this.getmobile();
    window.onresize = () => {
      this.mobile = this.getmobile();
    };
  }

  onSubmit() {
    try {
      if(!this.addressForm.valid) {
        alert('Resolva todos os campos com erros')
      } else {
        this.doRegister({
          name: this.addressForm.value.name.trim(),
          last_name: this.addressForm.value.last_name.trim(),
          nickname: this.addressForm.value.nickname.trim(),
          email: this.addressForm.value.email.trim(),
          password: this.addressForm.value.password.trim(),
        }).subscribe((result) => {
          window.localStorage.setItem('user', result['data']);
          alert('Register')
        });
      }
    } catch (error) {
      console.log('Algo de errado aconteceu, por favor tente mais tarde');
    }
  }

  doRegister (register: Register): Observable<Register> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<Register>('url', register, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Aconteceu um error:', error.error.message);
    } else {

      console.error(
        `Status Code: ${error.status}, ` +
        `Body: ${error.error}`);
    }
    return throwError(
      'Algo de errado aconteceu, por favor tente mais tarde'
    );
  };

}
