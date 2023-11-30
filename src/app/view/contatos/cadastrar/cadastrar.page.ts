import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato, Genero } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome!: string;
  telefone!: number;
  email!: string;
  genero!: Genero;
  imagem: any;
  
  lista_contatos: Contato[] = [];
  
  constructor(private alertController: AlertController, private firebase: FirebaseService, private router: Router) {
  
  }
  
  ngOnInit() {
  }

  public uploadFile(imagem: any){
      this.imagem = imagem.files;
    }

  cadastrar(){
    if(!this.nome || !this.telefone){
      this.presentAlert("Erro", "Todos os campos são obrigatórios!");
      
    }else{
      let novo: Contato = new Contato(this.nome, this.telefone);
      if(this.email){
        novo.email = this.email;
      }
      if(this.genero){
        novo.genero = this.genero;
      }
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)
      }
      else{
        
        try{
        this.firebase.create(novo).then(res => {this.presentAlert("Sucesso", "Contato Cadastrado!");
        this.router.navigate(['/home']);});
        }catch(e){
          this.presentAlert("Erro", "Erro ao cadastrar contato!");
        }
      }
      
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