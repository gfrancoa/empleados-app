import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
//PENDIENTES
//CORREGIR ERROR RADIO BUTTON
//CORREGIR ERROR NO SE BORRA LA FECHA


//declarando variables

  public form: FormGroup
  public document: AbstractControl
  public name: AbstractControl
  public phone: AbstractControl
  public email: AbstractControl
  public salary: AbstractControl
  public isFemale: AbstractControl
  public dateOfBirth: AbstractControl 
  public employees: any[] = [] //lista de empleados. aqui se guardarán los resultados del list
  public selectedId = ""
  public submitted = false
  public editting = false


  //los servicios siempre se llaman en el constructor

  constructor(
    public formBuilder: FormBuilder,
    public config: ConfigService,
    private empleadoService: EmpleadoService
  ) { 
    //se esta construyendo el formulario y se esta colocando
    //que todos los campos son requeridos
    this.form = this.formBuilder.group({
      document: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      isFemale: ['', Validators.required],
     dateOfBirth: ['', Validators.required],
    })

    //se está asociando las variables con los campos del formulario
    this.document = this.form.controls['document']
    this.name = this.form.controls['name']
    this.phone = this.form.controls['phone']
    this.email = this.form.controls['email']
    this.salary = this.form.controls['salary']
    this.isFemale = this.form.controls['isFemale']
    this.dateOfBirth = this.form.controls['dateOfBirth']
  }

  //apenas carga la app lo primero que hará será listar los usuarios en base de datos
  ngOnInit(): void {
    this.list()
  }

  get f() {
    return this.form.controls
  }

  validacion() {
    console.log(this.form.value)
    this.submitted = true
    if (this.form.invalid)
    //el return detiene la ejecución así que si la condicion de invalid se 
    //cumple no se ejecutará el método add
      return
    this.add()
    
  }


  add() {
    if (this.selectedId) {
      this.commitEdit()
    } else {
      // console.log('form value',this.form.value)
      const formValues = {...this.form.value, salary:Number(this.form.get('salary')?.value), isFemale: this.form.get('isFemale')?.value =="f"? true : false}
      console.log('form values after casting',formValues);
      
      this.empleadoService.create(formValues).subscribe({
        next: (res: any) => {
          if (res.status) {
            console.log('Usuario registrado',res)
          }
        },
        complete: () => { this.list() }, // completeHandler
        error: (err) => { console.log('Error creating user',err) }    // errorHandler 
      })
    }
    this.reset()
    


  }

  reset() {
    this.form.reset()
    this.submitted = false
    this.editting = false
  }

  edit(item: any) {
    console.log(item)
    this.form.get('document')?.setValue(item.document)
    this.form.get('name')?.setValue(item.name)
    this.form.get('phone')?.setValue(item.phone)
    this.form.get('email')?.setValue(item.email)
    this.form.get('salary')?.setValue(item.salary)
    this.form.get('isFemale')?.setValue(item.isFemale==true?"f":"m")
    this.form.get('dateOfBirth')?.setValue(item.dateOfBirth)
    this.selectedId = item._id
    this.editting=true
  }

  selectGender(value:any){
    console.log('item de select gender',value);
    
    this.form.get('isFemale')?.setValue(value)
    console.log('form values',this.form.value);
    
  }

  selectDate(value:any){
    console.log('item de select date',value.target.value);
    
    this.form.get('dateOfBirth')?.setValue(value.target.value)
  }

  commitEdit() {
    this.editting = false
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index]._id == this.selectedId) {
      

        this.empleadoService.update({
          
          document: this.form.get('document')?.value,
          name: this.form.get('name')?.value,
          phone: this.form.get('phone')?.value,
          email: this.form.get('email')?.value,
          salary: Number(this.form.get('salary')?.value),
          isFemale: this.form.get('isFemale')?.value,
          dateOfBirth:this.form.get('dateOfBirth')?.value,
        },this.selectedId).subscribe({
          next: (res: any) => {
            if (res.status) {
              console.log('response update',res)
            }
          },
          complete: () => { this.list()
          }, // completeHandler
          error: () => { console.log('Error updating user') }    // errorHandler 
        })
        
      }
    }
    this.selectedId = ""
    
  }

  delete(_id: string) {
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index]._id == _id) {
        this.empleadoService.delete(_id).subscribe({
          next: (res: any) => {
            if (res.status) {
              // this.employees.splice(index, 1)
              console.log('Usuario eliminado',res)
            }
          },
          complete: () => { this.list() }, // completeHandler
          error: () => { console.log('Error removing user') }    // errorHandler 
        })
      }
    }
  }

  list() {
    this.empleadoService.list().subscribe({
      next: (res: any) => {
        if (res.length>0) {
          this.employees = res
        }
      },
      complete: () => { console.log('Usuarios listados') }, // completeHandler
      error: () => { console.log('Error to the list user') }    // errorHandler 
    })
  }

}
