import { Injectable, OnInit } from "@angular/core";
import { Tags, Task } from "./types";

@Injectable({
    providedIn : 'root'
})
export class TasksModel{
    private tasks! :Map<string, Task>;
    private tags! : Tags;

    constructor(){
        this.tasks = new Map<string, Task>;
        this.tags = new Map<string, number>();
    }

    get allTasks() : Map<string, Task>{
        return this.tasks;
    }
    get allTags() :Tags{
        return this.tags;
    }
}