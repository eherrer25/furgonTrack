import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController, NavController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-menu-conductor',
  templateUrl: './menu-conductor.page.html',
  styleUrls: ['./menu-conductor.page.scss'],
})
export class MenuConductorPage implements OnInit {

  userEmail: string;

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private router: Router,
              private menu: MenuController) { }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  navigateStudent() {
    this.router.navigate(['students']);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
