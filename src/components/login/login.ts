import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MykiProvider } from '../../providers/myki';
import { ConfigProvider } from '../../providers/config';
import { Firebase } from '@ionic-native/firebase';
import * as $ from "jquery";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  username = "";
  password = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public mykiProvider: MykiProvider,
    public configProvider: ConfigProvider,
    public loadingCtrl: LoadingController,
    public firebase: Firebase,
  ) {
  }

  ionViewDidLoad() {
    // handle login username ENTER behavior
    $("input[name=username]").on('keydown', (e) => {
      if (e.which == 13) {
        // focus to password
        $("input[name=password]").focus()
      }
    })

    // handle login password ENTER behavior
    $("input[name=password]").on('keydown', (e) => {
      if (e.which == 13) {
        // submit log in
        this.logIn()
      }
    })
  }

  loggingIn() {
    return this.mykiProvider.loggingIn
  }

  loadingAccount() {
    return this.mykiProvider.loggedIn && !this.mykiProvider.mykiAccount.loaded
  }

  logIn() {
    // check if username and password filled
    if (!this.username || !this.password) {
      let alert = this.alertCtrl.create({
        title: 'Username and password required',
        buttons: ['OK'],
        enableBackdropDismiss: false
      })
      alert.present()
      return;
    }

    this.mykiProvider.loginGetAccount(this.username, this.password).then(
      success => {
        // save login
        this.configProvider.loginSave(this.username, this.password)

        // log event
        this.firebase.logEvent("login", {})
      },
      error => {
        if (error === 'login') {
          // login error
          let alert = this.alertCtrl.create({
            title: 'Username or password incorrect',
            subTitle: 'Could not log in. Verify your username and password.',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Forgot username',
                handler: () => {
                  window.open('https://www.mymyki.com.au/NTSWebPortal/common/Auxillary/ForgottenUsername.aspx', '_system');
                }
              },
              {
                text: 'Forgot password',
                handler: () => {
                  window.open('https://www.mymyki.com.au/NTSWebPortal/common/Auxillary/ForgotPassword.aspx', '_system');
                }
              },
              {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                }
              }
            ]
          })
          alert.present()
        }

        if (error === 'account') {
          // error
          let alert = this.alertCtrl.create({
            title: 'Error loading account',
            subTitle: 'There was an error loading your account details and cards.',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Retry',
                role: 'cancel',
                handler: () => {
                  this.mykiProvider.getAccountDetails()
                }
              }
            ]
          })
          alert.present()
        }
      })
  }

  register() {
    // log event
    this.firebase.logEvent("sign_up", {})

    // open myki register page
    window.open('https://www.mymyki.com.au/NTSWebPortal/Common/register/SetupWebAccess.aspx?menu=Set%20up%20web%20access', '_system');
  }

}
