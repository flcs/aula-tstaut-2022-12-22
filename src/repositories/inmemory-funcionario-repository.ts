import { Funcionario } from "../entities/funcionario";
import { IRepositoryCreate, IRepositoryFindById } from "./irepository";

export class InMemoryFuncionarioRepoCreate implements IRepositoryCreate<Funcionario> {
    listaFuncionarios: Funcionario[] = [];
    async create(objeto: Funcionario): Promise<string> {
        const exists = this.existeObjeto(objeto);
        if (exists) {
            throw new Error('objeto já salvo');
        }
        const id = this.listaFuncionarios.length.toString();
        objeto.id = id;
        this.listaFuncionarios.push(objeto);
        return id;
    }

    existeObjeto(objeto: Funcionario) {
        const indice = this.listaFuncionarios.findIndex(func => (func.id === objeto.id))
        const exists = (indice >= 0);
        return exists;
    }

}


// class InMemoryFuncionarioRepoFindById implements IRepositoryFindById<Funcionario> {
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


// class InMemoryFuncionarioRepoCreate implements IRepositoryCreate<Funcionario> {
//     create(objeto: Funcionario): Promise<string> {
//         throw new Error("Method not implemented.");
//     }
// }

