import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import {Container, decorate, injectable} from 'inversify';

import './ioc';
// import { RegisterRoutes } from "./build/routes";
import { bindings } from "./inversify.config";
import bodyParser from "body-parser";
import {buildProviderModule} from "inversify-binding-decorators";
import {Controller} from "@tsoa/runtime";
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import * as express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const corsOptions = {
   origin: 'https://127.0.0.1:3000',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   optionsSuccessStatus: 200,
};


(async ()=> {
   const port = 3000;
   const container = new Container();
   decorate(injectable(), Controller);
   await container.loadAsync(bindings);
   container.load(buildProviderModule());
   const app = new InversifyExpressServer(container);

   app.setConfig((theApp) => {
      theApp.use(bodyParser.urlencoded({
         extended: true
      }));
      theApp.use(bodyParser.json());
      theApp.use(cors(corsOptions));
      theApp.use(helmet());

      //Register Swagger
      // RegisterRoutes(theApp);
      theApp.use('/swagger-ui', express.static(path.join(__dirname, 'swagger-ui')));
      const swaggerDocument = require('./swagger.json');
      theApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   });
   const server = app.build();
   server.listen(port,()=>{
       console.log(`Server running at http://127.0.0.1:${port}/`)
   })

})();