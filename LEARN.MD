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