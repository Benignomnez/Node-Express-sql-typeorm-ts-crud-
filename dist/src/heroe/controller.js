"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.putById = exports.postHero = exports.getById = exports.getAll = void 0;
const datasource_1 = require("../../datasource");
const heroe_entity_1 = require("../models/heroe.entity");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const heroRepository = datasource_1.AppDataSource.getRepository(heroe_entity_1.Heroe);
    const alHeroes = yield heroRepository.find();
    return res.json(alHeroes);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const heroRepository = datasource_1.AppDataSource.getRepository(heroe_entity_1.Heroe);
    const idHeroe = yield heroRepository.findOneBy({ id: parseInt(id) });
    if (idHeroe) {
        return res.json(idHeroe);
    }
    return res.status(400).json({
        message: `Heros ${id} not found`
    });
});
exports.getById = getById;
const postHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alte, nombre } = req.body;
    const values = ({
        nombre: nombre,
        alte: alte
    });
    const heroRepository = datasource_1.AppDataSource.getRepository(heroe_entity_1.Heroe);
    const copyHeroe = yield heroRepository.findOneBy(values);
    if (copyHeroe) {
        return res.status(400).json({
            message: `The hero ${alte} already exist`
        });
    }
    yield heroRepository.insert(values);
    return res.json(values);
});
exports.postHero = postHero;
const putById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { alte, nombre } = req.body;
    const heroRepository = datasource_1.AppDataSource.getRepository(heroe_entity_1.Heroe);
    const findHeroe = yield heroRepository.findOneBy({ id: parseInt(id) });
    if (findHeroe) {
        findHeroe.nombre = nombre;
        findHeroe.alte = alte;
        yield heroRepository.save(findHeroe);
        return res.json(findHeroe);
    }
    return res.status(404).json({
        message: `The hero ${alte} not exist`
    });
});
exports.putById = putById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const heroRepository = datasource_1.AppDataSource.getRepository(heroe_entity_1.Heroe);
    const findHeroe = yield heroRepository.findOneBy({ id: parseInt(id) });
    if (findHeroe) {
        yield heroRepository.remove(findHeroe);
        return res.json("Hero deleted");
    }
    return res.status(404).json({
        message: `The hero ${id} not exist`
    });
});
exports.deleteById = deleteById;
