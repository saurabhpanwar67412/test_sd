import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { ServicesService } from '../services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.page.html',
  styleUrls: ['./self-assessment.page.scss'],
})
export class SelfAssessmentPage implements OnInit {
  jsonData: any;

  Cough_yes; 
  Fever_yes;
  Breathing_yes;
  senses_yes;
  None_symptom;
  Diabetes_yes;
  Hypertension_yes;
  Lung_yes;
  Heart_yes;
  had_following_None;
  traveled_Yes;
  traveled_No;
  interacted_Yes;
  confirmcase;
  traveleapply_noned_Yes;
  id: string;

 
  constructor(public actionSheetController: ActionSheetController,
    private services: ServicesService,
    private afs: AngularFireStorage,
    private route: ActivatedRoute,
    private rout: Router,private aut: AngularFireAuth,public alertController: AlertController) { 
    this.presentActionSheet();

    this.aut.authState
    .subscribe(
      user => {
        if (user) {
          console.log('loged');
          this.id = user.uid;
          console.log(this.id);
          
        } else {
   
        }
      },
      () => {
        // this.router.navigateByUrl('/login');
      }
    );
  }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Please give correct answers',
      subHeader : 'Accurate answers help us- help you better. Medical and support staff are valuable and very limites.Be a responsible worker.',
      cssClass: 'my-custom-class',
      buttons: [{
        text: '',
        icon: '',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Ok, Got it',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: '',
        icon: '',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: '',
        icon: '',
        role: '',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Form submitted',
      message: 'Your assessment form has been submitted !',
      buttons: ['OK'],
      animated : true,
    });

    await alert.present();
  }

  


  traveled(event) { 
    console.log(event.target.id);
  }
 
  
  Cough(event){ this.Cough_yes= event.target.id;console.log(event.target.id);}
  Fever(event){this.Fever_yes = event.target.id;console.log(event.target.id);}
  Breathing(event){this.Breathing_yes = event.target.id;console.log(event.target.id);}
  senses(event){this.senses_yes = event.target.id;console.log(event.target.id);}
  None_symptoms(event){this.None_symptom = event.target.id;console.log(event.target.id);}
  Diabetes(event){this.Diabetes_yes = event.target.id;console.log(event.target.id);}
  Hypertension(event){this.Hypertension_yes = event.target.id;console.log(event.target.id);}
  Lung(event){this.Lung_yes = event.target.id;console.log(event.target.id);}
  Heart(event){this.Heart_yes = event.target.id;console.log(event.target.id);}
  following_None(event){this.had_following_None = event.target.id;console.log(event.target.id);}
  traveled_yes(event){this.traveled_Yes = event.target.id;console.log(event.target.id);}
  traveled_no(event){this.traveled_No = event.target.id;console.log(event.target.id);}
  interacted(event){this.interacted_Yes = event.target.id;console.log(event.target.id);}
  confirmedcase(event){this.confirmcase = event.target.id;console.log(event.target.id);}
  apply_none(event){this.traveleapply_noned_Yes = event.target.id;console.log(event.target.id);}

  submit(){

    this.jsonData=[
      {"uid" : this.id},
      {"Cough_yes":this.Cough_yes || 'null'},
      {"Fever":this.Fever_yes || 'null'},
      {"Breathing":this.Breathing_yes || 'null'},
      {"senses_yes":this.senses_yes || 'null'},
      {"None_symptom":this.None_symptom || 'null'},
      {"Diabetes_yes":this.Diabetes_yes || 'null'},
      {"Hypertension_yes":this.Hypertension_yes || 'null'},
      {"Lung_yes":this.Lung_yes || 'null'},
      {"Heart_yes":this.Heart_yes || 'null'},
      {"had_following_None":this.had_following_None || 'null'},
      {"traveled_Yes":this.traveled_Yes || 'null'},
      {"traveled_No":this.traveled_No || 'null'},
      {"interacted_Yes":this.interacted_Yes || 'null'},
      {"confirmcase":this.confirmcase || 'null'},
      {"traveleapply_noned_Yes":this.traveleapply_noned_Yes || 'null'}

      ];


      console.log("jsondata =>" ,  this.jsonData);
      if(this.jsonData){
        this.services.selfassess(this.jsonData).then(
          res => {
            console.log('Upload' + res);
            this.presentAlert();
            this.rout.navigateByUrl(`/main`);
          });

      }
     

 
  }
  

  


}
