/* 
  A contribuição sindical é paga pelo trabalhador uma vez por ano
  e corresponde à remuneração de um dia normal de trabalho (1/30 da remuneração mensal),
  sem inclusão de horas extras
*/

import { Funcionario } from '@/entities/funcionario'
import { InMemoryFuncionarioRepo } from '@/repositories/inmemory-funcionario-repository'
import { IUseCase } from '../iusecase'

type CalcularContribuicaoSindicalUseCaseParams = {
  funcionarioId: string
}

type CalcularContribuicaoSindicalUseCaseResult = {
  contribuicaoSindical: number
}

export class CalcularContribuicaoSindicalUseCase implements IUseCase<
CalcularContribuicaoSindicalUseCaseParams, CalcularContribuicaoSindicalUseCaseResult> {
  perform(params: CalcularContribuicaoSindicalUseCaseParams): Promise<CalcularContribuicaoSindicalUseCaseResult> {
    throw new Error('Method not implemented.')
  }
}

describe('caso de uso calcular contribuição sindical', () => {
  it('deveria calcular a contribuição sindical de um funcionário', async () => {
    // arrange
    const inMemoryFuncionarioRepo = new InMemoryFuncionarioRepo()
    const funcionario = new Funcionario()
    funcionario.salario = 1500
    inMemoryFuncionarioRepo.create(funcionario)
    const params: CalcularContribuicaoSindicalUseCaseParams = {
      funcionarioId: '0'
    }
    const sut = new CalcularContribuicaoSindicalUseCase()
    // action
    const result: CalcularContribuicaoSindicalUseCaseResult = sut.perform(params)
    // assert
    // 1500 / 30 => 50
    expect(result.contribuicaoSindical).toBe(50)
  })
})
