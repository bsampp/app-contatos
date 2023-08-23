import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Contato, Genero } from 'src/app/model/entities/Contato';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome!: string;
  telefone!: number;
  email!: string;
  genero!: Genero;

  lista_contatos: Contato[] = [];

  constructor(private alertController: AlertController) {
    let c1: Contato = new Contato ("Bruno Sampietro", 42998610025)
    this.lista_contatos.push(c1)
  }
  
  cadastrar(){
    if(!this.nome || !this.telefone){
      this.presentAlert("Erro", "Todos os campos são obrigatórios!");
      
    }else{
      this.presentAlert("Sucesso", "Contato Cadastrado!");
      let novo: Contato = new Contato(this.nome, this.telefone);
      if(this.email){
        novo.email = this.email;
      }
      if(this.genero){
        novo.genero = this.genero;
      }
      
      this.lista_contatos.push(novo);
    }
  }
  
  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  
}