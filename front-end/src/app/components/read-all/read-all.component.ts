import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css'],
})
export class ReadAllComponent implements OnInit {
  close = 0
  list: Todo[] = []
  listFinished: Todo[] = []

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.finAll()

  }

  public finAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if (todo.finalizado) {
          this.listFinished.push(todo)
        } else {
          this.list.push(todo)
        }
      })
      this.close = this.listFinished.length
    })
  }

  finalizar(tarefa: Todo): void {
    tarefa.finalizado = true;
    this.service.update(tarefa).subscribe(() => {
      this.service.message('Task finalizada com sucesso!')
      this.list = this.list.filter(todo => todo.id !== tarefa.id)
      this.close++
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Task deletada com sucesso!')
        this.list = this.list.filter(todo => todo.id !== id)
      }
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados'])
  }

  novoTodo(): void {
    this.router.navigate(['create'])
  }
  
}
