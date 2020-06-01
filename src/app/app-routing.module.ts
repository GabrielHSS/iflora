import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { SobreComponent } from './sobre/sobre.component';
import { EventosTableComponent } from './home/eventos-table/eventos-table.component';


const routes: Routes = [
  
  {
    path: 'home',component: HomeComponent,
    children:[
      {path: 'perfil', component: PerfilComponent},
      {path: 'ajuda', component: AjudaComponent},
      {path: 'sobre', component: SobreComponent},
      {path: 'eventos', component: EventosTableComponent}

    ]},
  {path:'welcome', component:WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo:'welcome', pathMatch:'full'},
  {path: '**', redirectTo:'welcome'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
