import { Service } from "typedi";

@Service()
export class GreeterService {
    public greet(name: string): string {
        return "Hello, " + name;
    }
}
