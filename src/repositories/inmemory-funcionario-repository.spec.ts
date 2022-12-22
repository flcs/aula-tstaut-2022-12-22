// Describe : Caso de uso são as funcionalidades 
// 
// caso de uso: calcular salarios
// fluxo feliz (happy path) (principal)
// fluxos alternativos (erros, condições paralelas, ...)
// 

import { Funcionario } from "../entities/funcionario";
import { InMemoryFuncionarioRepoCreate } from "./inmemory-funcionario-repository"

describe('Funcionario Repository Create', () => {

    it('deveria ser capaz de criar um funcionario (happy path)', async () => {
        // arrange (setup)
        // const sut = new AlgumaCoisa();
        const sut = new InMemoryFuncionarioRepoCreate();
        const funcionario = new Funcionario();

        // act (perform action)
        // const return = sut.perform();
        const id = await sut.create(funcionario);

        // assert (expectation)
        // expect(return).toBe(espectativa)
        expect(id).toBe("0");
    })

    it('deveria ser capaz de encontrar um objeto já foi criado', async () => {
        const sut = new InMemoryFuncionarioRepoCreate();
        const funcionario = new Funcionario();
        funcionario.id = '0'
        const funcionario2 = funcionario;

        // act (perform action)
        // const return = sut.perform();
        const id1 = await sut.create(funcionario);
        const existe = sut.existeObjeto(funcionario2)

        expect(existe).toBe(true)
    })

    it('não deveria ser capaz de incluir um mesmo funcionario duas vezes', async () => {
        // arrange (setup)
        // const sut = new AlgumaCoisa();
        const sut = new InMemoryFuncionarioRepoCreate();
        const funcionario = new Funcionario();
        funcionario.id = '1'
        const funcionario2 = funcionario;

        // act (perform action)
        // const return = sut.perform();
        const id1 = await sut.create(funcionario);

        await expect(
            // Promise.reject(new Error('octopus'))
            sut.create(funcionario2) 
        ).rejects.toThrow('objeto já salvo');
    })

})

