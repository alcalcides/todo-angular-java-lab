import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [TodoService]
})
export class CreateComponent implements OnInit {

  todo: Todo ={
    titulo:'',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  public acaoFormulario!: number


  /*
  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(''),
    'descricao': new FormControl(''),
    'dataParaFinalizar': new FormControl(''),
    'finalizado': new FormControl(false)
  })*/

  public formulario: FormGroup = this.formBuilder.group({
    titulo: [null,[Validators.required]],
    descricao: [null],
    dataParaFinalizar: [null,[Validators.required]],
    finalizado: [false,[Validators.required]]
  })

  constructor(
    private router: Router,
    private todoService: 
    TodoService, private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.acaoFormulario = this.route.snapshot.params['id'];
    if(this.acaoFormulario){
      this.carregarDados(this.acaoFormulario)
    }
  }

  salvar(): void{
    if(this.acaoFormulario){
      this.update()
    }else{
      this.create()
    }
    
  }

  create():void{
    Object.assign(this.todo, this.formulario.value);
    this.todoService.create(this.todo).subscribe((resultado: Todo) => {
      this.sucesso('Todo criado com sucesso: ' + resultado.titulo)
    });
  }

  update(){
    Object.assign(this.todo, this.formulario.value);
    this.todoService.update(this.todo).subscribe((resultado: Todo) => {
      this.sucesso('Todo atualizado com sucesso: ' + resultado.titulo)
    });
  }

  cancel(): void{
    this.router.navigate([''])
  }

  carregarDados(id: number): void{
    this.todoService.findById(id).subscribe((resposta) => {
      this.todo = resposta
      this.formulario.patchValue(this.todo)
    });
  }

  sucesso(msg: string): void{
    this.router.navigateByUrl('/').then(() => {
      this.todoService.message(msg)
    })

  }

}
