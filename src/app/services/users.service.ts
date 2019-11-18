import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>

  constructor(private firestore: AngularFirestore) { }

  create_NewStudent(record) {
    return this.firestore.collection('user_role').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('user_role').snapshotChanges();
  }
 
  update_Student(recordID,record){
    this.firestore.doc('user_role/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('user_role/' + record_id).delete();
  }
}
