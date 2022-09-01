import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { Empresa } from '../empresa.component';

@Component({
  selector: 'app-empresa.dialog',
  templateUrl: './empresa.dialog.component.html',
  styleUrls: ['./empresa.dialog.component.scss']
})
export class EmpresaDialogComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(new Date().toISOString()),
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    cnpj: new FormControl(''),

  })
  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EmpresaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa,
    
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data)
    }
  }
  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.snackBar.open('Formulário Inválido.', 'ok')
      return
    }
    this.dialogRef.close(this.gerarObjeto())
  }


  gerarObjeto() {
    let empresa = new Empresa(
      this.form.get('id').value,
      this.form.get('nome').value,
      this.form.get('cnpj').value,
      )

    return empresa

  }

}
