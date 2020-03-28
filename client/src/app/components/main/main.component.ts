import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Todo } from '../../interfaces'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  arrayId = []
  todos: Todo[] = []
  catName: string = 'all'

  constructor(
    private todoService: TodoServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.catName)
  }

  inpSelect(event){
    this.catName = event.target.value
    this.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.catName)
  }

  fetchTodosByCategory(catName: string) {
    
    this.todoService.getAllByCategory(catName)
      .subscribe(result => {
        this.todos = result
      })
  }

  fetchAllTodos(){
    this.todoService.getAll()
      .subscribe(result => {
        this.todos = result
      })
  }

  removeTodo(id: string): void{
    this.todoService.delete(id)
      .subscribe(() => {
        this.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.catName)
      }) 
    
  }


}