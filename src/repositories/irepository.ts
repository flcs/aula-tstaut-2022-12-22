
export interface IRepository<ClasseAssociada> {
    create(objeto: ClasseAssociada): Promise<string>
    findById(id: string): Promise<ClasseAssociada>
    findAll(): Promise<ClasseAssociada[]>;
    update(id: string, objeto: ClasseAssociada): Promise<boolean>
    delete(id: string): Promise<boolean>;
}
