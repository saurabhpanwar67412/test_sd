import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  uid ; 
  image_url = [ 
   { url: '../../assets/img/1.jpg',label : 'Take Self Assessment Test'},
    {url: '../../assets/img/2.jpg',label : 'Maintain Social Distance'},
    {url: '../../assets/img/3.jpg',label : 'Check app regularly for updates'},
    {url: '../../assets/img/4.jpg',label : 'Greet with Namaste instead of a handshake'},
    {url: '../../assets/img/5.jpg',label : 'Avoid social gatherings'},
    {url: '../../assets/img/6.jpg',label : 'Keep a 6ft. distance from people'}
];


  anuncios: any[] = [];
  info: any[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;


  constructor(public afs: AngularFirestore, public rout: Router,
   public plt: Platform) {
  }


  goto(id) {
    this.rout.navigateByUrl(id);
  }

  // User stuff

  getProfile(id) {
    this.itemsCollection = this.afs.collection<any>(`users/${id}/profile/`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }




  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.uid = value.uid ; 
   
      this.afs.collection(`users/${value.uid}/profile`).add({
        name: value.name,
        phone: value.phone,
        mail: value.mail,
        img: value.img,
        uid: value.uid,
        adress: value.adress,
        date: Date.now(),
        username: value.username,
      });
 
      this.rout.navigateByUrl(`profile`);
    });
  }


  selfassess(data) {

    console.log("data cough yes", data[1]);
    console.log("data", data);
    this.uid = data[0].uid ; 
    var cough_yes = data[1]; 
    var fever = data[2];
    console.log("uid value",this.uid, cough_yes, fever);

    
  
    
    //  this.afs.collection('users').doc(this.uid).collection('self_assess_data').doc(id).set(data);
    //  this.rout.navigateByUrl(`main`);

    
 
    return new Promise<any>((resolve, reject) => {

      this.afs.collection(`users/${this.uid}/self_assess_data`).add({
        uid : data[0].uid,
        Cough_yes : data[1], 
        Fever_yes : data[2], 
        Breathing_yes : data[3], 
        senses_yes : data[4], 
        None_symptom : data[5] , 
        Diabetes_yes : data[6] , 
        Hypertension_yes : data[7], 
        Lung_yes : data[8] , 
        Heart_yes : data[9] , 
        had_following_None : data[10], 
        traveled_Yes : data[11] , 
        traveled_No : data[12] ,
        interacted_Yes : data[13],

        confirmcase : data[14],
        traveleapply_noned_Yes :data[15] , 
        date: Date.now(),


      });

      console.log("success");
    this.rout.navigateByUrl(`main`);
     
    });
  }


  updateUser(value, id?) {
    return this.afs.collection('users').doc(value.uid).collection('profile').doc(id).set(value);
   }

   // Entry stuff

  AddEntry(description) {
    // uniq generetad id 
    const id = Math.random().toString(36).substring(2);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`entrys`).doc(id).set({
        description: description,
        id: id,
        date: Date.now()
      });
      this.rout.navigateByUrl(`profile`);
    });
  }

  

  getEntrys() {
    this.itemsCollection = this.afs.collection<any>(`entrys`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }

bluetoothscan(){
  

}





}
