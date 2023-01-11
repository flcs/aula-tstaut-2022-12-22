/* 
  A contribuição sindical é paga pelo trabalhador uma vez por ano
  e corresponde à remuneração de um dia normal de trabalho (1/30 da remuneração mensal),
  sem inclusão de horas extras
*/

import { Funcionario } from '@/entities/funcionario'
import { InMemoryFuncionarioRepo } from '@/repositories/inmemory-funcionario-repository'
import { IRepositoryFindById } from '@/repositories/irepository'
import { IUseCase } from '../iusecase'

type CalcularContribuicaoSindicalUseCaseParams = {
  funcionarioId: string
}

type CalcularContribuicaoSindicalUseCaseResult = {
  contribuicaoSindical: number
}

export class CalcularContribuicaoSindicalUseCase implements IUseCase<
CalcularContribuicaoSindicalUseCaseParams, CalcularContribuicaoSindicalUseCaseResult> {
  private repositorio: IRepositoryFindById<Funcionario>

  constructor(repositorio: IRepositoryFindById<Funcionario>){
    this.repositorio = repositorio
  }

  async perform(params: CalcularContribuicaoSindicalUseCaseParams): Promise<CalcularContribuicaoSindicalUseCaseResult> {
    const DIAS_TRABALHADOS = 30
    const funcionario = await this.repositorio.findById(params.funcionarioId)
    // talvez colocar uma exception no método findById ao invés de permitir retorno de undefined?
    if(!funcionario) throw new Error('Funcionario não encontrado')
    const contribuicaoSindical = funcionario.salario / DIAS_TRABALHADOS
    return { contribuicaoSindical }
  }
}

describe('caso de uso calcular contribuição sindical', () => {
  it('deveria calcular a contribuição sindical de um funcionário', async () => {
    // arrange
    const inMemoryFuncionarioRepo = new InMemoryFuncionarioRepo()
    const funcionario = new Funcionario()
    funcionario.salario = 1500
    inMemoryFuncionarioRepo.create(funcionario)
    const params = {
      funcionarioId: '0'
    }
    const sut = new CalcularContribuicaoSindicalUseCase(inMemoryFuncionarioRepo)
    // action
    const { contribuicaoSindical } = await sut.perform(params)
    // assert
    // 1500 / 30 => 50
    expect(contribuicaoSindical).toBe(50)
  })
})
