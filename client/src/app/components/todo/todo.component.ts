import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  post: any = {}

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.todoService.getById(params.id)
        .subscribe((post) => {
          this.post = post
        })
    })
  }

}
