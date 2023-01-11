import { Funcionario } from '@/entities/funcionario'
import { IRepositoryFindById } from '@/repositories/irepository'
import { IUseCase } from '../iusecase'

type CalcularContribuicaoSindicalUseCaseParams = {
  funcionarioId: string
}

type CalcularContribuicaoSindicalUseCaseResult = {
  contribuicaoSindical: number
}

export class CalcularContribuicaoSindicalUseCase
  implements
    IUseCase<
      CalcularContribuicaoSindicalUseCaseParams,
      CalcularContribuicaoSindicalUseCaseResult
    >
{
  private repositorio: IRepositoryFindById<Funcionario>

  constructor(repositorio: IRepositoryFindById<Funcionario>) {
    this.repositorio = repositorio
  }

  async perform(
    params: CalcularContribuicaoSindicalUseCaseParams,
  ): Promise<CalcularContribuicaoSindicalUseCaseResult> {
    const DIAS_TRABALHADOS = 30
    const funcionario = await this.repositorio.findById(params.funcionarioId)
    // talvez colocar uma exception no método findById ao invés de permitir retorno de undefined?
    if (!funcionario) throw new Error('Funcionario não encontrado')
    const contribuicaoSindical = funcionario.salario / DIAS_TRABALHADOS
    return { contribuicaoSindical }
  }
}
