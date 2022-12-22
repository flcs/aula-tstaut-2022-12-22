
export interface IRepositoryCreate<ClasseAssociada> {
    create(objeto: ClasseAssociada): Promise<string>
}

export interface IRepositoryFindById<ClasseAssociada> {
    findById(id: string): Promise<ClasseAssociada | undefined>
}

export interface IRepositoryFindAll<ClasseAssociada> {
    findAll(): Promise<ClasseAssociada[]>;
}

export interface IRepositoryUpdate<ClasseAssociada> {
    update(id: string, objeto: ClasseAssociada): Promise<boolean>
}

export interface IRepositoryDelete<ClasseAssociada> {
    delete(id: string): Promise<boolean>;
}


export type IRepository<ClasseAssociada> =
    IRepositoryCreate<ClasseAssociada> |
    IRepositoryFindById<ClasseAssociada> |
    IRepositoryFindAll<ClasseAssociada> |
    IRepositoryDelete<ClasseAssociada> |
    IRepositoryUpdate<ClasseAssociada>
