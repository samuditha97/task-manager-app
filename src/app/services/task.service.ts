import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from "../models/task.model";

@Injectable({
    providedIn: 'root'
  })
  export class TaskService {
    private apiUrl = environment.baseUrl;
  
    constructor(private http: HttpClient) {}

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}`, task);
    }
        
    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}`);
    }

    getTask(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
      }

    updateTask(task: Task): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
    }
    
    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    
  }