import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from './utils';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isLogged= new BehaviorSubject(false)
  constructor(private http:HttpClient) { }

  async login(user,pass){
    await delay(2000)
    if(user == 'teste' && pass =='teste'){
      this.isLogged.next(true)
      return Promise.resolve('')
    }else{
      return Promise.reject('')
    }
  }
  procurarCep(cep){
    return this.http.get(`http://viacep.com.br/ws/${cep}/json/`) as Observable<iCep>
  }
}

interface iCep{
  
    "cep":string,
    "logradouro":string,
    "complemento":string,
    "bairro":string,
    "localidade":string,
    "uf":string,
    "ibge":string,
    "gia":string,
    "ddd":string,
    "siafi":string,
  
}