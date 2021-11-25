import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  baseUrl = environment.baseUrl

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl)
  }

  update(tarefa: Todo): Observable<Todo>{
    const URL = `${this.baseUrl}/${tarefa.id}`
    return this.http.put<Todo>(URL, tarefa)

  }

  delete(id: any): Observable<void> {
    const URL = `${this.baseUrl}/${id}`
    return this.http.delete<void>(URL);

  }

  create(tarefa: Todo): Observable<Todo>{
    const URL = `${this.baseUrl}/${tarefa.id}`
    return this.http.post<Todo>(this.baseUrl, tarefa);
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, 'OK', { horizontalPosition: 'end', verticalPosition: 'top', duration: 4000 })
  }

  findById(id: number): Observable<Todo>{
    const URL = `${this.baseUrl}/${id}`
    return this.http.get<Todo>(URL)
  }

}
