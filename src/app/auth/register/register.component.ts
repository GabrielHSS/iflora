import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
    addressForm = this.fb.group({
    name: [null, Validators.required],
    last_name: [null, Validators.required], 
    nickname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });
  constructor(private fb: FormBuilder) {}
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
    alert('Thanks!');
  }
}