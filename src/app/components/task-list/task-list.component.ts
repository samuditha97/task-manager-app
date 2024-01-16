import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { TaskDetailComponent } from './task-description/task-detail/task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  public tasks: Task[] = [];

  constructor(
    private taskService: TaskService, 
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,) { }

    ngOnInit(): void {
      this.loadTasks();
    }

    loadTasks() {
      this.taskService.getTasks().subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error loading tasks:', error);
        }
      );
    }

    updateTask(taskId: string) {
      this.router.navigate(['/tasks/update', taskId]);
    }
  
    deleteTask(taskId: string) {
      const toastrRef = this.toastr.warning(
        'Are you sure you want to delete this task? Click On for yes',
        'Confirmation',
        {
          timeOut: 0,
          extendedTimeOut: 0,
          closeButton: true,
          positionClass: 'toast-top-center'
        }
      );
  
      toastrRef.onTap.subscribe(() => {
        this.taskService.deleteTask(taskId).subscribe(
          () => {
            this.toastr.success('Task deleted successfully', 'Success');
            console.log('Task deleted successfully');
            this.loadTasks();
          },
          error => {
            console.error('Error deleting task:', error);
          }
        );
      });
    }
  

    showTaskDetails(task: Task) {
      const dialogRef = this.dialog.open(TaskDetailComponent, {
        width: '400px',
        data: task,
      });
  
      dialogRef.afterClosed().subscribe(() => {
        console.log('Task details dialog closed');
      });
    }
    navigateToAddTask(){
      this.router.navigate(['/tasks/new']);
    }
}
