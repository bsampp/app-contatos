import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato, Genero } from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  lista_contatos: Contato[] = [];


  constructor(private router: Router, contatoService: ContatoService) {
    this.lista_contatos = contatoService.obterTodos();
  }
  
  editar(indice: number){
    this.router.navigate(['/detalhar', indice])
    console.log("teste")
  }

  irParaCadastrar(){
    this.router.navigate(['/cadastrar']);
  }
  
}