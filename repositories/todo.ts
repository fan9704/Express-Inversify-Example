import { getConnection} from "typeorm";
import { Todo } from "../entities/todo";

export function getRepository(){
    const connection = getConnection();
    const todoRepository = connection.getRepository(Todo);
    return todoRepository;
}