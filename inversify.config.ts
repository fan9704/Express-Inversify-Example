import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { Todo } from "./entities/todo";
import { getDatabaseConnection } from "./db";
import { getRepository } from "./repositories/todo";
import { TYPES } from "./constant/types";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDatabaseConnection();
    await require("./controllers/todo");

    bind<Repository<Todo>>(TYPES.TodoRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();

});
