import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

import './controller/todo';
import { bindings } from "./inversify.config";

(async ()=> {
   const port = 3000;
   const container = new Container();
   await container.loadAsync(bindings);
   const app = new InversifyExpressServer(container);
   const server = app.build();

   server.listen(port,()=>{
       console.log(`Server running at http://127.0.0.1:${port}/`)
   })

})();


// import * as bodyParser from 'body-parser';
// import TYPES from './constant/types';
// import { TodoService } from './service/todo';
// // load everything needed to the Container
// let container = new Container();
// container.bind<TodoService>(TYPES.TodoService).to(TodoService);
//
// // start the server
// let server = new InversifyExpressServer(container);
//
// server.setConfig((app) => {
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }));
//     app.use(bodyParser.json());
// });
//
// let serverInstance = server.build();
// serverInstance.listen(3000);
//
// console.log('Server started on port 3000 :)');
