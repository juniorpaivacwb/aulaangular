import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from '../../app.service';
import { ValidateCEP } from '../../utils';
import { Endereco, Pessoa } from '../pessoa.component';

@Component({
  selector: 'app-cadastro-pessoa.dialog',
  templateUrl: './cadastro-pessoa.dialog.component.html',
  styleUrls: ['./cadastro-pessoa.dialog.component.scss']
})
export class CadastroPessoaDialogComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    sobrenome: new FormControl(''),
    cep: new FormControl('', []), //ValidateCEP
    estado: new FormControl(''),
    cidade: new FormControl(''),
    logradouro: new FormControl(''),

  })
  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CadastroPessoaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    private service: AppService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        ...this.data.endereco
      })
    }

    this.form.get('cep').valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(r => {
      if (this.isValidCep()) {
        this.buscarCep()
      }
    })
  }

  isValidCep() {
    let cep = this.form.get('cep').value
    if (cep.trim().length == 8) {
      return true
    }
    return false
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.snackBar.open('Formulário Inválido.', 'ok')
      return
    }

    this.service.adicionar(this.gerarObjeto()).subscribe({
      next: () => {
        this.dialogRef.close(true)
      },
      error: (e) => {
        alert(e)
        console.log(e)
      }
    })
  }


  gerarObjeto() {
    let pessoa = new Pessoa(
      this.form.get('id').value,
      this.form.get('nome').value,
      this.form.get('sobrenome').value,
      new Endereco(
        this.form.get('cep').value,
        this.form.get('estado').value,
        this.form.get('cidade').value,
        this.form.get('logradouro').value
      )
    )

    return pessoa

  }
  buscarCep() {
    let cep = this.form.get('cep').value
    this.service.procurarCep(cep).subscribe(
      {
        next: (r) => {
          this.form.patchValue(r)
          this.form.get('estado').setValue(r.uf)
          this.form.get('cidade').setValue(r.localidade)
          this.form.get('logradouro').setValue(r.logradouro)
        },
        error: (e) => {
          alert('erro')
        }
      }
    )
  }
}
