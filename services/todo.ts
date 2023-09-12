import {inject} from 'inversify';
import {TYPES} from "../constant/types";
import { provide } from 'inversify-binding-decorators';
import {Repository} from "typeorm";
import {Todo} from "../entities/todo";

export interface ITodo {
    id: String,
    description: string;
    complete: boolean;
}

@provide(TYPES.TodoService)
export class TodoService {

    private todoStorage: ITodo  [] = [{
        id: "1",
        description:"Biking",
        complete:true
    }, {
        id: "2",
        description:"Camping",
        complete:false
    }];
    private repository:Repository<Todo>;
    constructor(
        @inject(TYPES.TodoRepository) repository:Repository<Todo>
    ) {
        this.repository = repository;
    }
    public getTodos(): Promise<Todo[]> {
        return this.repository.find();
    }

    public getTodoById(id: string): ITodo {
        return <ITodo>this.todoStorage.find(todo => todo.id === id);
    }

    public newTodo(todo: ITodo): ITodo {
        this.todoStorage.push(todo);
        return todo;
    }

    public updateTodo(id: string, todo:ITodo): ITodo {
        this.todoStorage.forEach((entry, index) => {
            if (entry.id === id) {
                this.todoStorage[index] = todo;
            }
        });

        return todo;
    }

    public deleteTodo(id: string): string {
        this.todoStorage = this.todoStorage.filter(todo => todo.id !== id);
        return id;
    }
}
