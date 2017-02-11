import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config';
import { LoginPage } from '../login/login'

/*
  Generated class for the Intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
  ) { }

  ionViewDidLoad() {
  }

  goToLogin() {
    // set intro as seen
    this.configProvider.introSetSeen();

    // go to login page
    this.navCtrl.setRoot(LoginPage, null, { animate: true, direction: 'forward' })
  }

}