import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import {Container, decorate, injectable} from 'inversify';

import './ioc';
import { bindings } from "./inversify.config";
import bodyParser from "body-parser";
import {buildProviderModule} from "inversify-binding-decorators";
import {Controller} from "@tsoa/runtime";
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';




(async ():Promise<void>=> {
   const port = 3000;
   const container = new Container();
   decorate(injectable(), Controller);
   await container.loadAsync(bindings);
   container.load(buildProviderModule());
   const app = new InversifyExpressServer(container);


   app.setConfig((theApp):void => {
      const corsOptions = {
         origin: 'http://127.0.0.1:3000',
         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
         credentials: true,
         optionsSuccessStatus: 200,
      };
      const swaggerOptions= {
         swaggerOptions: {
            url: 'http://127.0.0.1:3000',
         }
      };
      theApp.use(bodyParser.urlencoded({
         extended: true
      }));
      theApp.use(bodyParser.json());
      theApp.use(cors(corsOptions));
      theApp.use(helmet());

      //Register Swagger
      const swaggerDocument = require('./swagger.json');
      theApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,swaggerOptions));
   });
   const server = app.build();
   server.listen(port,()=>{
       console.log(`Server running at http://127.0.0.1:${port}/`)
       console.log(`Swagger at http://127.0.0.1:${port}/api-docs`)
   })

})();