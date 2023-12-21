import { Component } from '@angular/core';
import { TaskService } from '../../services/taskService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
  name! :string;
  dueDate! :Date;
  tags! :String;
  constructor(
    private taskService :TaskService
  ){}
  onAddTask(){
    if(!this.name || !this.dueDate) {
      alert(`${!this.name ? 'Name' : 'Due Date'} should be mentioned!`);
      return;
    }
    if(new Date(this.dueDate) < new Date()) {
      alert('A Task cannot be instantiated with an old date!');
      return;
    }
    this.taskService.addTask = {name : this.name, 
                                dueDate : new Date(this.dueDate), 
                                completed : false,
                                tags : this.tags?this.taskService.tagsAsMap(this.tags):undefined
                              };
  }
}
