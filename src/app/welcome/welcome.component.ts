import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
   
  constructor() { }

  ngOnInit() {
    document.body.style.background = "#fff url('../../assets/home.png') 50% 30%/cover no-repeat";
    

}

}
