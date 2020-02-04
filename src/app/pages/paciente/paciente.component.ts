import { Paciente } from './../../_model/paciente';
import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  //pacientes: Paciente[];
  //displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  columnasMostrar = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Paciente>
  //para el ordenamiento 
  @ViewChild(MatSort, { static : true }) ordenar: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private pacienteService : PacienteService) { }

  ngOnInit() {
    this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.ordenar;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}
