/* 
  A contribuição sindical é paga pelo trabalhador uma vez por ano
  e corresponde à remuneração de um dia normal de trabalho (1/30 da remuneração mensal),
  sem inclusão de horas extras
*/

import { Funcionario } from '@/entities/funcionario'
import { InMemoryFuncionarioRepo } from '@/repositories/inmemory-funcionario-repository'

describe('caso de uso calcular contribuição sindical', () => {
  it('deveria calcular a contribuição sindical de um funcionário', async () => {
    // arrange
    const inMemoryFuncionarioRepo = new InMemoryFuncionarioRepo()
    const funcionario = new Funcionario()
    funcionario.salario = 1500
    inMemoryFuncionarioRepo.create(funcionario)
    const params = {
      funcionarioId: '1'
    }
    const sut = new CalcularContribuicaoSindical()
    // action
    const result = sut.perform(params)
    // assert
    // 1500 / 30 => 50
    expect(result.contribuicaoSindical).toBe(50)
  })
})
