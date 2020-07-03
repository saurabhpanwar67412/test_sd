
import { Component , OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  type: string;
  item: any;
  id: string;
  image_url ;


  constructor(private aut: AngularFireAuth,
    private router: Router , public services: ServicesService,    private callNumber: CallNumber,
    public afs: AngularFirestore,private localNotifications: LocalNotifications ) {
       
  this.image_url = this.services.image_url;
  this.localnotification();
  this.localnotificationsc();

    }

  ngOnInit() {
    this.logued();
    this.type = 'deposit';
  }
  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  localnotificationsc()
  {
    this.localNotifications.schedule({

      'title':'Please fill self assessment form',
      'text' : 'Company request you to fill self assessment form twice a day',
      led: 'FF0000',
      trigger: { every: {hour: 10, minute: 1}},

    });

  }
  

 

  localnotification()
  {
    this.localNotifications.schedule({

      'title':'Please fill self assessment form',
      'text' : 'Company request you to fill self assessment form twice a day',
      led: 'FF0000',

    });

  }



  logued() {
    this.aut.authState
      .subscribe(
        user => {
          if (user) {
            console.log('loged');
            this.id = user.uid;
            console.log(this.id);
            this.getProfile(this.id);
          } else {
            this.router.navigateByUrl('/login');
          }
        },
        () => {
          // this.router.navigateByUrl('/login');
        }
      );
  }

  async signOut() {
    const res = await this.aut.signOut();
    console.log(res);
    this.router.navigateByUrl('/login');
  }

  async getProfile(id) {
    await this.services.getProfile(id).subscribe((data: any) => {
      if (data.length === 0) {
        console.log('profile empty');
        this.router.navigateByUrl(`edit-profile`);
      } else {
        console.log('Profile not empty');
        console.log(data);
        this.item = data;
      }
    });
  }


  profile() {
    this.router.navigateByUrl(`profile`);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  static_image() {
    this.afs.collection('static_images').get();

  }
}
