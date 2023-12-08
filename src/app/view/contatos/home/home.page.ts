import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/entities/Contato';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  lista_contatos: Contato[] = [];


  constructor(private router: Router, private firebase: FirebaseService, private auth: AuthService) {
    console.log(this.auth.getUserLogged())
    this.firebase.read().subscribe(res => {
      this.lista_contatos = res.map( contato => {
        return {
          id: contato.payload.doc.id,
          ...contato.payload.doc.data() as any
        } as Contato
      })
    })
  };

  irParaEditar(Contato: Contato){
    this.router.navigateByUrl('/detalhar', {
      state: {contato: Contato}});
  }

  irParaCadastrar(){
    this.router.navigate(['/cadastrar']);
  }

  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['/signin']);
    })
  }
}
  
