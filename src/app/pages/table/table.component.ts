import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { tool } from 'src/app/interfaces/interface';
import { ToolsModel } from 'src/app/models/Tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  forma: FormGroup;
  public herramientas;
  public urlImamge: string;
  tool = new ToolsModel();
  grupo;
  types;
  marcas;
  states;
  sizes;
  colors;
  ubicaciones;

  constructor(private toolServices: ToolsService, 
              private fb: FormBuilder,
              private propertyService: PropertiesService) { 
    this.urlImamge = environment.urlImg;
    this.createForm();
  }

  createForm() {
    this.forma = this.fb.group({
      name: ['', Validators.required],
      group: ['', Validators.required],
      type: ['', Validators.required],
      marca: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      location: ['', Validators.required],
      quantify: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTools();
  }

  OnDestroy() {
    this.getTools().unsubscribe();
  }

  getTools() {
    return this.toolServices.getTools().subscribe(
      (resp: tool) => {
        this.herramientas = resp.inventaios;
      },
      err => {
        console.log(err);
      }
    )
  }

  save() {
    if (this.forma.invalid) {

      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    this.toolServices.updateTool({tools: this.forma.value, _id: this.tool._id})
                     .subscribe(console.log);

  }
  
  getGroups() {
    return this.propertyService.getProperty('groups').subscribe((resp: any) => {
      this.grupo = resp.groups;
    });
  }
  getTypes() {
    return this.propertyService.getProperty('types')
        .subscribe((resp: any) => {
          this.types = resp.types;
        });
  }

  deleteById(id: string) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar esta herramienta?',
      text: "No podras recuperarla!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar herramienta'
    }).then((result) => {
      if (result.value) {

        this.toolServices.deleteTools({_id: id}).subscribe(console.log);

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

   getMarcas() {
        this.propertyService.getProperty('marcas')
            .subscribe((resp: any) => {
              this.marcas = resp.marcas;
            });
  }

  getStates() {
    this.propertyService.getProperty('states')
        .subscribe((resp: any) => {
          this.states = resp.states;
        });
  }

  getSizes() {
    this.propertyService.getProperty('sizes')
        .subscribe((resp: any) => {
          this.sizes = resp.sizes;
        });
  }

  getColors() {
    this.propertyService.getProperty('colors')
        .subscribe((resp: any) => {
          this.colors = resp.colors;
        });
  }

  getUbicacion() {
    this.propertyService.getLocations()
        .subscribe((resp: any) => {
          this.ubicaciones = resp.locacions;
        });
  }

  actualizar() {
    this.getTools();
  }

  updateById(id: string) {
    console.log(id);
    this.getTypes();
    this.getGroups();
    this.getMarcas();
    this.getStates();
    this.getUbicacion();
    this.getSizes();
    this.getColors();
    this.toolServices.getToolsById(id)
               .subscribe(resp => {
                 this.tool = resp;
                 this.forma.get('name').setValue(this.tool.name);
                 this.forma.get('group').setValue(this.tool.group);
                 this.forma.get('type').setValue(this.tool.type);
                 this.forma.get('marca').setValue(this.tool.marca);
                 this.forma.get('size').setValue(this.tool.size);
                 this.forma.get('color').setValue(this.tool.color);
                 this.forma.get('location').setValue(this.tool.location);
                 this.forma.get('quantify').setValue(this.tool.quantify);
                 this.forma.get('state').setValue(this.tool.state);
                });
    
  }

  buscar(evento) {
    let busqueda = evento.target.value;

    if(busqueda.length <= 0) {
      this.getTools();
      return;
    }

    this.toolServices.search(busqueda).subscribe(resp => {
      this.herramientas = resp;
    });

  }

}
