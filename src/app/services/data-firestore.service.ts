import { Injectable } from '@angular/core';
import { firebaseData } from 'src/app/services/firebasedata';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataFirestoreService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }
  createBooking(apt: firebaseData) {
    return this.bookingListRef.push({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile,
    });
  }
}
