import { Funcionario } from "@/entities/funcionario";
import { IRepository } from "./irepository";

class InMemoryFuncionarioRepo implements IRepository<Funcionario> {
    create(objeto: Funcionario): Promise<string> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Funcionario> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Funcionario[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, objeto: Funcionario): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

