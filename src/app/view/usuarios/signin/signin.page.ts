import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar!: FormGroup;

  constructor(private alert: AlertService, private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    })
  }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm(): Boolean{
    if(!this.formLogar.valid){
      this.alert.presentAlert('Erro','Erro ao Preencher')
      return false;
    }else{
      this.alert.simpleLoader();
      this.logar();
      return true;
    }
  }

  private logar(){
    this.auth.signIn(this.formLogar.value['email'], this.formLogar.value['senha'])
    .then(() => {
      this.router.navigate(['/home']);
      this.alert.dismissLoader();
    }
    ).catch((error) => {
      this.alert.presentAlert('Erro ao logar', 'Tente Novamente');
      this.alert.dismissLoader();
      console.log(error.message);
    })
  }

  logarComGoogle(){
    this.auth.signInWithGoogle()
    .then(() => {
      this.router.navigate(['/home']);
    }
    ).catch((error) => {
      this.alert.presentAlert('Erro ao logar', 'Tente Novamente');
      console.log(error.message);
    })
  }

  irParaSignup(){
    this.router.navigate(['/signup']);
  }


}
