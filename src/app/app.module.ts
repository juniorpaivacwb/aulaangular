import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { CadastroPessoaDialogComponent } from './pessoa/cadastro-pessoa.dialog/cadastro-pessoa.dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PessoaComponent } from './pessoa/pessoa.component';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresaDialogComponent } from './empresa/empresa.dialog/empresa.dialog.component'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    CadastroPessoaDialogComponent,
    PessoaComponent,
    AdministrativoComponent,
    LoginComponent,
    EmpresaComponent,
    EmpresaDialogComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
