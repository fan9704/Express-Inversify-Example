import {
    controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import {inject, injectable} from 'inversify';
import { ITodo, TodoService } from '../services';
import { Request } from 'express';
import { TYPES } from '../constant';
import {Todo} from "../entities";
import {Get, Route, Tags} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {fluentProvide} from "inversify-binding-decorators";
@Route("todo")
@controller('/api/todo')
export class TodoController extends Controller{

    constructor(@inject(TYPES.TodoService) private todoService: TodoService) {
        super();
    }

    @httpGet('/')
    @Get("/")
    public getTodos(): Promise<Todo[]> {
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
