import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  isAdmin: '';

  constructor( private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email es requerido.' },
      { type: 'pattern', message: 'Ingresar email valido.' }
    ],
    'password': [
      { type: 'required', message: 'Password es requerido.' },
      { type: 'minlength', message: 'Password debe tener al menos 5 caracteres.' }
    ]
  };
 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      this.errorMessage = "";
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .firestore()
            .doc(`/userProfile/${user.uid}`)
            .get()
            .then(userProfileSnapshot => {
              if(userProfileSnapshot.data().isAdmin){
                this.navCtrl.navigateForward('/dashboard');
              }else{
                this.navCtrl.navigateForward('/menu-conductor');
              }
            });
        }
      });
    }, err => {
      this.errorMessage = err.message;
    });  
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

}
