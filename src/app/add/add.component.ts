import { Component, OnInit } from '@angular/core';
import { ToDo } from '../todo';
import { TodolistService } from '../todolist.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  todo: ToDo;

  constructor(private data: TodolistService, private router: Router) { }

  ngOnInit() {
    this.todo = {
      _id: '',
      todo: '',
      modified: '',
      due: '',
      completed: false
    };
    this.todo.due = new Date().toISOString().substring(0, 10);
  }

  add(){
    this.todo._id = new Date().toISOString();
    return this.data.save(this.todo).subscribe(
      data => {
        if(data.success)
          this.router.navigate(['/']);
        else
          window.alert(data.message);
      }
    );
  }

}
