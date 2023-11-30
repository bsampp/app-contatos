import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato, Genero } from 'src/app/model/entities/Contato';
import { AlertService } from 'src/app/model/services/common/alert.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {

  contato!: Contato;
  nome!: string;
  telefone!: number;
  email!: string;
  genero!: Genero;
  edicao: boolean = true;
  public imagem: any

  constructor( private firebase: FirebaseService,
     private router:Router,
     private alert: AlertService,
     private alertController: AlertController){}

  habilitarEdicao(){
    if(this.edicao){
      this.edicao = false
    }else{
      this.edicao = true
    }
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  editar(){
    if(!this.nome || !this.telefone){
      this.alert.presentAlert("Erro", "Todos os campos são obrigatórios!");
      
    }else{
      this.alert.presentAlert("Sucesso", "Contato Editado com Sucesso!");
      let editar: Contato = new Contato(this.nome, this.telefone);
      if(this.email){
        editar.email = this.email;
      }
      if(this.genero){
        editar.genero = this.genero;
      }
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, editar);
      }
      editar.id = this.contato.id
      editar.downloadURL = this.contato.downloadURL;
      this.firebase.update(editar, this.contato.id)
      this.router.navigate(['/home']);
    }
  }

  excluirConfirm(){
    this.presentConfirmAlert("Confirmação", "Deseja excluir o contato?", "Ao excluir o contato, não será possível recuperá-lo.")
  }

  excluirContato(){
    this.firebase.delete(this.contato.id);
    this.router.navigate(['/home'])
    this.alert.presentAlert("Sucesso", "Contato Excluído com Sucesso");
  }

  ngOnInit() {
    this.contato = history.state.contato;
    this.nome = this.contato.nome
    this.telefone = this.contato.telefone
    this.email = this.contato.email
    this.genero = this.contato.genero
  }


  async presentConfirmAlert(titulo : string, subtitulo: string, msg : string)
  {
    const alert = await this.alertController.create({
    header: titulo,
    subHeader: subtitulo,
    message: msg,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: ()=>{}},
      {
        text: 'Confirmar',
        role: 'confirmar',
        handler:() =>{
          this.excluirContato();
        }
      }
    ],
  })
  await alert.present();
  }
}
