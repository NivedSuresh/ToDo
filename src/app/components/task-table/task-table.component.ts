import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/taskService.service';
import { Task } from '../../models/types';
import { CommonModule } from '@angular/common';
import { StatusDirective } from '../../directives/status.directive';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, StatusDirective],
  templateUrl: './task-table.component.html',
})
export class TaskTableComponent implements OnInit{

  allTasks! : Map<string, Task> ;

  constructor(
    private taskService :TaskService
  ){}

  ngOnInit(): void {
    this.allTasks = this.taskService.tasksToBeRendered;
    this.taskService.tasksEmitter.subscribe((data)=>{
      this.allTasks = data;
    });
  }

  removeTask(task: Task) {
    this.taskService.removeTasks = [task];
  }
  getCurrentDate() :Date{
    return new Date();
  }

  onMarkCompleted(task: Task) {
    this.taskService.markCompleted(task);
  }

  rebuild(date: string, task: Task) {
    const updatedDate :Date = new Date(date);
    if(updatedDate < new Date()){
      alert('Cannot assign expired date to a task!');
    }
    this.taskService.rebuild(updatedDate, task);
  }

}
