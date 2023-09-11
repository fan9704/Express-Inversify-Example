import { Todo } from "./entities/todo";

import { createConnection } from "typeorm";

export async function getDatabaseConnection(){
    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_USER = process.env.DATABASE_USER || "test";
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "123456";
    const DATABASE_PORT =  5432;
    const DATABASE_NAME = "TS";

    const entities = [
        Todo
    ];

    const connection = await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: entities,
        synchronize: true
    });

    return connection;
}
