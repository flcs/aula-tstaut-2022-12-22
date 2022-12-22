import { Funcionario } from "../entities/funcionario";
import { IRepositoryCreate, IRepositoryFindById } from "./irepository";

export class InMemoryFuncionarioRepo implements IRepositoryCreate<Funcionario>, IRepositoryFindById<Funcionario> {
    listaFuncionarios: Funcionario[] = [];
    async create(objeto: Funcionario): Promise<string> {
        const exists = this.existeObjeto(objeto);
        if (exists >= 0) {
            throw new Error('objeto já salvo');
        }
        const id = this.listaFuncionarios.length.toString();
        objeto.id = id;
        this.listaFuncionarios.push(objeto);
        return id;
    }

    async findById(id: string): Promise<Funcionario | undefined> {
        const funcionario = await this.listaFuncionarios.find(func => (func.id === id))
        return funcionario
    }

    existeObjeto(objeto: Funcionario) {
        const indice = this.listaFuncionarios.findIndex(func => (func.id === objeto.id))
        return indice;
    }

}



// class InMemoryFuncionarioRepoCreate implements IRepositoryCreate<Funcionario> {
//     create(objeto: Funcionario): Promise<string> {
//         throw new Error("Method not implemented.");
//     }
// }


// class InMemoryFuncionarioRepoCreate implements IRepositoryCreate<Funcionario> {
//     create(objeto: Funcionario): Promise<string> {
//         throw new Error("Method not implemented.");
//     }
// }


// class InMemoryFuncionarioRepoCreate implements IRepositoryCreate<Funcionario> {
//     create(objeto: Funcionario): Promise<string> {
//         throw new Error("Method not implemented.");
//     }
// }

