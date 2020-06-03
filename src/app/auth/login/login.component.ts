import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Login {
  name: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(60)]],
    password: [null, Validators.required],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    try {
      if(!this.loginForm.valid) {
        alert('Resolva todos os campos com erros')
      } else {
        this.doLogin({
          name: this.loginForm.value.name.trim(),
          password: this.loginForm.value.password.trim(),
        }).subscribe((result) => {
          window.localStorage.setItem('user', result['data']);
          alert('Login')
        });
      }
    } catch (error) {
      console.log('Algo de errado aconteceu, por favor tente mais tarde');
    }
  }

  doLogin (login: Login): Observable<Login> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<Login>('url', login, httpOptions)
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
