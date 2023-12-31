import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato, Genero } from 'src/app/model/entities/Contato';
import { AlertService } from 'src/app/common/alert.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';

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
  user: any;
  
  lista_contatos: Contato[] = [];
  
  constructor(private alert: AlertService, private firebase: FirebaseService, private router: Router, private auth: AuthService){
    this.user = this.auth.getUserLogged();
  }
  
  ngOnInit() {
  }

  public uploadFile(imagem: any){
      this.imagem = imagem.files;
    }

  cadastrar(){
    if(!this.nome || !this.telefone){
      this.alert.presentAlert("Erro", "Todos os campos são obrigatórios!");
      
    }else{
      let novo: Contato = new Contato(this.nome, this.telefone);
      novo.uid = this.user.uid
      if(this.email){
        novo.email = this.email;
      }
      if(this.genero){
        novo.genero = this.genero;
      }
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)
      }
      try{
      this.firebase.create(novo).then(res => {this.alert.presentAlert("Sucesso", "Contato Cadastrado!");
      this.router.navigate(['/home']);});
      }catch(e){
        this.alert.presentAlert("Erro", "Erro ao cadastrar contato!");
      
      }
      
    }
  }



}
