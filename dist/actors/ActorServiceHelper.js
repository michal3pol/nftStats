"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorServiceHelper = void 0;
const AlchemyApiService_1 = require("../services/AlchemyApiService");
class ActorServiceHelper {
    initialize() {
        this.alchemyApiService = new AlchemyApiService_1.AlchemyApiService();
    }
    destroy() {
        console.log("ActorServiceHelper destroyed");
    }
    getResource() {
        return this.alchemyApiService;
    }
}
exports.ActorServiceHelper = ActorServiceHelper;
exports.default = ActorServiceHelper;
