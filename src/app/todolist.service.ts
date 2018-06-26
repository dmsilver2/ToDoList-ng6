import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './todo';
import { HttpHeaders } from '@angular/common/http';

interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private http: HttpClient) { }

  getToDoList() {
    return this.http.get<Array<ToDo>>('/api/ToDoList');
  }

  save(todo: ToDo){
    return this.http.post<myData>('/api/ToDo/Add',todo);
  }
}
