import { Component, Inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    ) {}

    onCloseClick(): void {
      this.dialogRef.close();
    }
}
