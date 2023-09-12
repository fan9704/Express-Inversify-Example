import {
    controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { ITodo, TodoService } from '../services';
import { Request } from 'express';
import { TYPES } from '../constant';

@controller('/api/todo')
export class TodoController {

    constructor(@inject(TYPES.TodoService) private todoService: TodoService) { }

    @httpGet('/')
    public getTodos(): ITodo[] {
        return this.todoService.getTodos();
    }

    @httpGet('/:id')
    public getTodo(request: Request): ITodo {
        return this.todoService.getTodoById(request.params.id);
    }

    @httpPost('/')
    public newUser(request: Request): ITodo {
        return this.todoService.newTodo(request.body);
    }

    @httpPut('/:id')
    public updateUser(request: Request): ITodo {
        return this.todoService.updateTodo(request.params.id, request.body);
    }

    @httpDelete('/:id')
    public deleteUser(request: Request): string {
        return this.todoService.deleteTodo(request.params.id);
    }
}
