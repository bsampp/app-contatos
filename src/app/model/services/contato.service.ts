import { Injectable } from '@angular/core';
import { Contato } from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private lista_contatos: Contato[] = [];
  
  constructor() {
    let c1: Contato = new Contato ("Bruno Sampietro", 42998610025)
    this.lista_contatos.push(c1)
   }

  public obterTodos(): Contato[]{
    return this.lista_contatos;
  }

  public obterPorIndice(indice: number): Contato{
    return this.lista_contatos[indice];
  }

  public cadastrar(contato: Contato){
    this.lista_contatos.push(contato);
  }
}
