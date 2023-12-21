export type Tags = Map<string, number>;
export type Task = {
    name : string,
    dueDate : Date,
    completed :boolean
    tags? : Tags
}