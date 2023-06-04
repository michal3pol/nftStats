import { Main } from "./main";
import { AlchemyApiService } from "./services/AlchemyApiService";


const apiService = new AlchemyApiService();

const main = new Main(apiService);
main.execute();

  