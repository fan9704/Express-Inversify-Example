import {
    controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import {inject} from 'inversify';
import { ITodo, TodoService } from '../services';
import { Request } from 'express';
import { TYPES } from '../constant';
import {Todo} from "../entities";
import {Get, Route, Path, Post,Body,Tags} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {TodoDTO} from "../dto";

@Route("/api/todo")
@controller('/api/todo')
@Tags("Todo")
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
    @Get("/{id}")
    public async getTodo( @Path('id') id: number): Promise<Todo|null> {
        return this.todoService.getTodoById(id);
    }

    @httpPost('/')
    @Post("/")
    public async newTodo(@Body() form:TodoDTO): Promise<Todo> {
        return this.todoService.createTodo(form);
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
