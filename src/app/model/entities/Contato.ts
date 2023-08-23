export class Contato{
    private _nome: string;
    private _telefone: number;
    private _email!: string;
    private _genero!: Genero;

    constructor(nome: string, telefone: number){
        this._nome = nome;
        this._telefone = telefone;
    }

    /**
     * Getter nome
     * @return {string}
     */
	public get nome(): string {
		return this._nome;
	}

    /**
     * Getter telefone
     * @return {number}
     */
	public get telefone(): number {
		return this._telefone;
	}

    /**
     * Setter nome
     * @param {string} value
     */
	public set nome(value: string) {
		this._nome = value;
	}

    /**
     * Setter telefone
     * @param {number} value
     */
	public set telefone(value: number) {
		this._telefone = value;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}
    
    public get genero(): Genero {
        return this._genero;
    }

    public set genero(value: Genero) {
        this._genero = value;
    }


}

export enum Genero{
    MASCULINO = "Masculino",
    FEMININO = "Feminino",
    OUTRO = "Outro"
}