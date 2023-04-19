import { AlchemyApiService } from "../services/AlchemyApiService";

export class ActorServiceHelper {
  public alchemyApiService!: AlchemyApiService;

  initialize() {
    this.alchemyApiService = new AlchemyApiService();
  }

  destroy() {
    console.log("ActorServiceHelper destroyed");
  }

  getResource() {
    return this.alchemyApiService;
  }
}

export default ActorServiceHelper;
