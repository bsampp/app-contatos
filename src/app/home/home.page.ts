import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome!: string;
  telefone!: number;

  contatos: any[] = [
    {"nome":"Bruno Sampietro","telefone": 42998611025},
    {"nome":"Joao","telefone": 42998611025},
    {"nome":"Eduardo","telefone": 42998611025},
    {"nome":"Caldas","telefone": 42998611025},

  ]

  constructor() {
    
  }
  
  cadastrar(){
    console.log(this.nome + " " + this.telefone)
  }
}