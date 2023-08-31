import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato, Genero } from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {

  contato!: Contato;
  indice!: number;
  nome!: string;
  telefone!: number;
  email!: string;
  genero!: Genero;
  edicao: boolean = true;

  constructor(private actRoute: ActivatedRoute,
     private contatoService: ContatoService,
     private router:Router,
     private alertController: AlertController){}

  habilitarEdicao(){
    if(this.edicao){
      this.edicao = false
    }else{
      this.edicao = true
    }
  }

  editar(){
    if(!this.nome || !this.telefone){
      this.presentAlert("Erro", "Todos os campos são obrigatórios!");
      
    }else{
      this.presentAlert("Sucesso", "Contato Editado com Sucesso!");
      let editar: Contato = new Contato(this.nome, this.telefone);
      if(this.email){
        editar.email = this.email;
      }
      if(this.genero){
        editar.genero = this.genero;
      }
      
      this.contatoService.editar(editar, this.indice);
      this.router.navigate(['/home']);
    }
  }

  excluir(){
    this.presentConfirmAlert("Confirmação", "Deseja excluir o contato?", "Ao excluir o contato, não será possível recuperá-lo.")
  }

  excluirContato(){
    this.contatoService.excluir(this.indice);
    this.router.navigate(['/home'])
    this.presentAlert("Sucesso", "Contato Excluído com Sucesso");
  }

  ngOnInit() {
    this.actRoute.params.subscribe((parametros) =>{
      if(parametros['indice']){
        this.indice = parametros['indice'];
        this.contato = this.contatoService.obterPorIndice(this.indice);
      }
    })
    console.log(this.contato)
    this.nome = this.contato.nome
    this.telefone = this.contato.telefone
    this.email = this.contato.email
    this.genero = this.contato.genero
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
        handler:(acao) =>{
          this.excluirContato();
        }
      }
    ],
  })
  await alert.present();
  }
}
