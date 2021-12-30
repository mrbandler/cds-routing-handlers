import { Service } from "typedi";

@Service()
export class GreeterService {
    public async greet(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = "Hello, " + name;
                resolve(result);
            }, 2000);
        });
    }
}
