import { AbstractControl } from '@angular/forms';

export function ValidateCEP(control: AbstractControl) {
  console.log(control.value)
  if (control.value.length ==8) {
    return  null
  }
  return {invalid:true};
}

export async function delay(t){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve('')
    }, t);
  })
}