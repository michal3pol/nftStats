"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const AlchemyApiService_1 = require("./services/AlchemyApiService");
const apiService = new AlchemyApiService_1.AlchemyApiService();
const main = new main_1.Main(apiService);
main.execute();
