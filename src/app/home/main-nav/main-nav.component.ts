import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  @ViewChild('drawer') private drawer: MatDrawer;
  public routeName: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {}
  ngOnInit(){
    this.routeName = this.router.url.replace('/home/', '');
  }
  async buttonChangeRoute() {
    await 20;
    this.routeName = this.router.url.replace('/home/', '');
    this.drawer.close();
  }
  
}
