import { injectable } from 'inversify';

export interface ITodo {
    id: String,
    description: string;
    complete: boolean;
}

@injectable()
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

    public getTodos(): ITodo[] {
        return this.todoStorage;
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
