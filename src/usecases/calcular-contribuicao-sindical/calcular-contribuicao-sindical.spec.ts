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

type SutTypes = {
  sut: CalcularContribuicaoSindicalUseCase
  inMemoryFuncionarioRepo: InMemoryFuncionarioRepo
  funcionario: Funcionario
}

const makeSut = (): SutTypes => {
  const funcionario = new Funcionario()
  const inMemoryFuncionarioRepo = new InMemoryFuncionarioRepo()
  const sut = new CalcularContribuicaoSindicalUseCase(inMemoryFuncionarioRepo)
  return {
    funcionario,
    inMemoryFuncionarioRepo,
    sut
  }
}

describe('caso de uso calcular contribuição sindical', () => {

  it('deveria calcular a contribuição sindical de um funcionário', async () => {
    // arrange
    const { funcionario, inMemoryFuncionarioRepo, sut } = makeSut()
    funcionario.salario = 1500
    inMemoryFuncionarioRepo.create(funcionario)
    const params = { funcionarioId: '0' }
    const { contribuicaoSindical } = await sut.perform(params)   
    expect(contribuicaoSindical).toBe(50) /* 1500 / 30 => 50 */
  })

  it('deveria levantar uma exceção se funcionario não for encrontrado', async () => {
    const { funcionario, inMemoryFuncionarioRepo, sut } = makeSut()
    funcionario.salario = 1500
    inMemoryFuncionarioRepo.create(funcionario)
    const params = { funcionarioId: '1' }
    await expect(sut.perform(params)).rejects.toThrow('Funcionario não encontrado')
  })
})
