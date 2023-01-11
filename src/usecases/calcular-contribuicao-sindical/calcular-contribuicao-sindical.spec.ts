/* 
  A contribuição sindical é paga pelo trabalhador uma vez por ano
  e corresponde à remuneração de um dia normal de trabalho (1/30 da remuneração mensal),
  sem inclusão de horas extras
*/

import { Funcionario } from '@/entities/funcionario'
import { InMemoryFuncionarioRepo } from '@/repositories/inmemory-funcionario-repository'
import { CalcularContribuicaoSindicalUseCase } from './calcular-contribuicao-sindical'

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
    sut,
  }
}

describe('caso de uso calcular contribuição sindical', () => {
  it('deveria calcular a contribuição sindical de um funcionário', async () => {
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
    await expect(sut.perform(params)).rejects.toThrow(
      'Funcionario não encontrado',
    )
  })
})
