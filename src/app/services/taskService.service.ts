import { DoCheck, Injectable, OnInit } from "@angular/core";
import { TasksModel } from "../models/tasks";
import { Tags, Task } from "../models/types";
import { Subject } from "rxjs";
import { FilterService } from "./FilterService.service";

@Injectable({
    providedIn : 'root'
})
export class TaskService{
    
    public tasksEmitter :Subject<Map<string, Task>> = new Subject<Map<string, Task>>();
    selectedTag :string = 'all';

    constructor(
        private filterService : FilterService,
        private tasksModel : TasksModel
    ){
        this.filterService.tagEmitter.subscribe((tag)=>{
            this.selectedTag = tag;
            this.tasksEmitter.next(this.tasksToBeRendered);
        });
    }
   
    get allTasks() : Map<string, Task>{
        return this.tasksModel.allTasks;
    }
    get allTags() :Tags{
        return this.tasksModel.allTags;
    }

    get tasksToBeRendered() : Map<string, Task>{
        if(this.selectedTag === 'all') return this.allTasks;

        if(this.selectedTag === 'completed') {
            return new Map<string, Task>(
                Array.from(this.allTasks.entries())
                .filter(([key, task])=>this.filterOnCompleted(task))
            );
        }

        return new Map<string, Task>(
            Array.from(this.allTasks.entries())
            .filter(([key, task])=>this.filterOnTag(task))
        );
    }
    filterOnCompleted(task :Task){
        return task.completed;
    }

    filterOnTag(task :Task) :boolean{
        return task.tags?.has(this.selectedTag) as boolean;
    }

    set addTask(task :Task){
        if(this.allTasks.has(task.name)) {
            alert(new Error("Task already exists."));
            return;
        }
        this.allTasks.set(task.name, task);
        
        if(!task.tags) return;

        for(let tag of task.tags.keys()){
            if(!this.allTags.has(tag))this.allTags.set(tag, 1);
            else this.allTags.set(tag, this.allTags.get(tag) as number+1);
        }
        this.tasksEmitter.next(this.tasksToBeRendered);
    }

    set removeTasks(selectedTasks: Task[]){
        for(let selectedTask of selectedTasks){
            if(this.allTasks.delete(selectedTask.name) && selectedTask.tags){
                for(let tag of selectedTask.tags.keys()){
                    let count  = this.allTags.get(tag);
                    if(count && count <= 1){
                        this.allTags.delete(tag);
                    }else if(count && count > 1){
                        this.allTags.set(tag, count-1);
                    }
                }
            }
        }
        this.tasksEmitter.next(this.tasksToBeRendered);
    }

    public tagsAsMap(tags :String) : Map<string, number>{
        const map = new Map<string, number>();
        for(let tag of tags.split(',').map(tag => tag.trim())){
            map.set(tag, 1);
        }
        return map;
    }

    markCompleted(task: Task) {
        if(this.allTasks.has(task.name)) 
            this.allTasks.get(task.name)!.completed = true;
    }

    rebuild(updatedDate: Date, task: Task) {
        if(this.allTasks.has(task.name)){
            this.allTasks.get(task.name)!.dueDate = updatedDate;
            this.allTasks.get(task.name)!.completed = false;
        }
    }
}