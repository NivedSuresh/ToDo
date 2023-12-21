import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { FilterComponent } from "./components/filter/filter.component";
import { TaskTableComponent } from "./components/task-table/task-table.component";
import { TaskService } from './services/taskService.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
      CommonModule,
      RouterOutlet,
      HeaderComponent, 
      AddTaskComponent, 
      FilterComponent, 
      TaskTableComponent
    ]
})
export class AppComponent {}
