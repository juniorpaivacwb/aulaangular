import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { LoggedGuard } from './logged.guard';
import { LoginComponent } from './login/login.component';
import { PessoaComponent } from './pessoa/pessoa.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'pessoa',
    component: PessoaComponent,
    canActivate:[LoggedGuard]
  },
  {
    path:'administrativo',
    component: AdministrativoComponent,
    canActivate:[LoggedGuard]
  },
  {
    path:'empresa',
    component: EmpresaComponent,
    canActivate:[LoggedGuard]
  }
  // {path:"test", component:null} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
