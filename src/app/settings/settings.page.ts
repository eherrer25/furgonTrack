import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthenticationService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'password': [
      { type: 'required', message: 'Clave es requerida.' },
      { type: 'minlength', message: 'Clave debe ser mayor a 5 caract.' }
    ]
  };

  tryChangePassword(value){
    this.authService.updatePassword(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Cambio de clave exitoso.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

}
