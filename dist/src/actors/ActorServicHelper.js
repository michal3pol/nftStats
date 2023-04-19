"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorServiceHelper = void 0;
const AlchemyApiService_1 = require("../services/AlchemyApiService");
class ActorServiceHelper {
    initialize() {
        this.alchemyApiService = new AlchemyApiService_1.AlchemyApiService();
    }
    //   /**
    //    * Resource destruction logic.
    //    *
    //    * @returns {Promise} Destruction promise.
    //    */
    destroy() {
        console.log("aaa");
    }
    /**
     * This method returns the actual resource, that will be used by actors.
     *
     * @returns {*} MongoDB Database instance.
     */
    getResource() {
        return this.alchemyApiService;
    }
}
exports.ActorServiceHelper = ActorServiceHelper;
exports.default = ActorServiceHelper;
