# Express TypeScript Note

## Express TypeScript


### Create an Express Project

### Install TypeScript

```shell
npm install typescript --save-dev
```

### Create tsconfig.ts

```shell
npx tsc --init
```

### Install Express TypeScript Dependencies

```shell
npm install @types/express --save-dev

```

### Compile Project 

```shell
npx tsc
```

### Run Project

```shell
npm start
```

----

## Inversify TypeScript Express

### Install Dependencies

```shell
npm install inversify inversify-binding-decorators inversify-express-utils inversify-logger-middleware reflect-metadata --save
```

### Edit tsconfig.json

```json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6", "dom"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

----

## TypeORM PostgreSQL

### Install Dependencies

```shell
npm install typeorm pg 
```

----

## tsoa

### Install Dependencies

```shell
npm install tsoa
```

### Configure tsoa.json

```json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

### Register Route on Controller

```typescript
@Route("todo")
@controller('/api/todo')
export class TodoController {
}
```

### Generate Route

```shell
tsoa routes
```

### Register to Application

> app.ts
```typescript
import { RegisterRoutes } from "./build/routes";
app.setConfig((theApp) => {
    theApp.use(bodyParser.urlencoded({
        extended: true
    }));
    theApp.use(bodyParser.json());
    // theApp.use(helmet());

    //Register Swagger
    RegisterRoutes(theApp);
});
```