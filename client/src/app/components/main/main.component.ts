import { Component, OnInit, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Todo } from '../../interfaces'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements
  OnInit,
  OnChanges,
  DoCheck 
{

  arrayId = []
  todos: Todo[] = []
  catName: string = 'all'
  quantity: number

  constructor(
    private todoService: TodoServiceService,
    private router: Router
  ) {console.log('Constructor') }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges', changes)
  }

  ngOnInit(): void {
    
    this.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.catName)
    console.log('ngOnInit')
  }

  ngDoCheck(){

  }

  inpSelect(event){
    this.catName = event.target.value
    this.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.catName)
  }

  fetchTodosByCategory(catName: string) {
    
    this.todoService.getAllByCategory(catName)
      .subscribe(result => {
        this.quantity = result.length
        this.todos = result
      })
  }

  fetchAllTodos(){
    this.todoService.getAll()
      .subscribe(result => {
        this.quantity = result.length
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