"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const heroe_entity_1 = require("./src/models/heroe.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "SA",
    password: "Sa123456",
    database: "backednalterna",
    entities: [heroe_entity_1.Heroe],
    //synchronize: true,
    logging: true,
    options: {
        encrypt: false,
    },
});
exports.AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
