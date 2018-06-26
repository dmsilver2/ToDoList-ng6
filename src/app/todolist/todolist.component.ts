import { Component, OnInit } from '@angular/core';
import { TodolistService } from '../todolist.service';
import { Observable } from 'rxjs';
import { ToDo } from '../todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  toDoList: Array<ToDo>;
  constructor(private data: TodolistService) { }

  ngOnInit() {
    this.data.getToDoList().subscribe(
      data => this.toDoList = data
    );
  }

}
