import { CommonModule } from '@angular/common';
import { Component, Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tags, Task } from '../../models/types';
import { TaskService } from '../../services/taskService.service';
import { Subject } from 'rxjs';
import { FilterService } from '../../services/FilterService.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  allTags! :Tags;
  constructor(
    private taskService :TaskService,
    private filterService :FilterService
  ){}
  ngOnInit(){
    this.allTags = this.taskService.allTags;
  }
  onTagSelected(tag :string){
    this.filterService.onTagSelected(tag);
  }
}
