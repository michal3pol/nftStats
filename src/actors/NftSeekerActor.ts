import { AlchemyApiService } from "../services/AlchemyApiService";

export class NftSeekerActor {
    
    private alchemyApiService: AlchemyApiService;
    private log: any;

    constructor(
        alchemyApiService: AlchemyApiService
    ) {
        this.alchemyApiService = alchemyApiService;
    }

    async seekNftsForOwner(buyerAddress: string) {
        console.log("this is me actor and i received this address " + buyerAddress)
        const nfts = await this.alchemyApiService.getNftsForOwner(buyerAddress);
        return "bajo"; 
    }

    static inject() {
        return ["ActorServiceHelper"];
    }

    initialize(selfActor: any) {
        this.log = selfActor.getLog();
    }

}

export default NftSeekerActor;