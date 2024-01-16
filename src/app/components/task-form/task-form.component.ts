import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  public taskForm!: FormGroup;
  public isUpdate: boolean = false;
  public taskId!: string;
  public task: Task = {
    id: '', 
    title: '', 
    description: '', 
    dueDate: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true;
        this.taskId = params['id'];
        this.loadTaskDetails();
      }
    });
  }

  loadTaskDetails() {
    this.taskService.getTask(this.taskId).subscribe(
      (task: Task) => {
        this.taskForm.setValue({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate
        });
      },
      error => {
        console.error('Error loading task details:', error);
      }
    );
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      if (this.isUpdate) {
        // Update existing task
        this.taskService.updateTask({ id: this.taskId, ...taskData }).subscribe(
          () => {
            this.toastr.success('Task updated successfully', 'Success');
            console.log('Task updated successfully');
            this.router.navigate(['/tasks']);
          },
          error => {
            console.error('Error updating task:', error);
          }
        );
      } else {
        // Create new task
        this.taskService.createTask(taskData).subscribe(
          () => {
            this.toastr.success('Task created successfully', 'Success');
            console.log('Task created successfully');
            this.router.navigate(['/tasks']);
          },
          error => {
            console.error('Error creating task:', error);
          }
        );
      }
    } else {
      console.error('Task form has invalid inputs');
      
    }
  }
}
