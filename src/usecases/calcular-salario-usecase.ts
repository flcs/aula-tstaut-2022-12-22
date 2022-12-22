import { Funcionario } from "@/entities/funcionario";
import { IRepository } from "@/repositories/irepository";
import { IUseCase } from "./iusecase";

type CalcularSalarioUseCaseParams = {
    funcionarioId: string;
    horasMensais: number;
}

type CalcularSalarioUseCaseResult = {
    salarioCalculado: number;
}


export class CalcularSalarioUseCase implements IUseCase<
    CalcularSalarioUseCaseParams, CalcularSalarioUseCaseResult> {

    repositorio: IRepository<Funcionario>;

    constructor(repoFuncionario: IRepository<Funcionario>) {
        this.repositorio = repoFuncionario;
    }

    async perform(params: CalcularSalarioUseCaseParams): Promise<CalcularSalarioUseCaseResult> {
        const funcionario = await this.repositorio.findById(params.funcionarioId);

        const salarioCalculado = 0.0;

        const result = {
            salarioCalculado
        }
        return result;
    }

}