import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaDialogComponent } from './empresa.dialog/empresa.dialog.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements AfterViewInit {

  displayedColumns: string[] = ['acoes', 'id', 'nome', 'sobrenome', 'estado', 'cidade', 'logradouro'];
  dataSource: MatTableDataSource<Empresa>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    public dialog: MatDialog //matdialog é usado para abrir e fechar janelas
  ) {
    this.dataSource = new MatTableDataSource([new Empresa('1','nome','cnpj')]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.dialog.open(EmpresaDialogComponent, {
      disableClose: true
    }).afterClosed().subscribe((r) => {
      if (!r) {
        return
      }
      this.dataSource.data.push(r)
      this.dataSource.filter=''
    })
  
  }
editar(empresa: Empresa){
  this.dialog.open(EmpresaDialogComponent,{
    disableClose:true,
    data:empresa
  }).afterClosed().subscribe((r) => {
    if(!r) return //se r for  falso 
    for (let empresa of this.dataSource.data){
      if (empresa.id == r.id){
        Object.assign(empresa, r)
      }
    }
  })
}
remover(empresa:Empresa){
  this.dataSource.data = this.dataSource.data.filter(item => {
    if(item.id == empresa.id) return false
    return true
  })
}
}

export class Empresa{
  constructor(public id, public nome, public cnpj){

  }
}