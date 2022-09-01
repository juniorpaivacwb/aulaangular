import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading
  form= new FormGroup({
    user: new FormControl(),
    password: new FormControl()
  })

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loading=true
    const user= this.form.get('user').value
    const pass= this.form.get('password').value
    this.service.login(user,pass).then(r => {
    this.router.navigateByUrl('pessoa')
    }).catch(e => {
      alert('Login inválido')
    }).finally(() =>{
      this.loading=false
    })
  }

}
