
export interface IUseCase<Params, Return> {
    perform(params: Params): Promise<Return>;
}

