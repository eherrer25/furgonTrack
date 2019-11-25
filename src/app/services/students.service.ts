import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private firestore: AngularFirestore) { }

  create_NewStudent(user_id,record) {
    return this.firestore.doc('users/'+user_id).collection('students').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('students').snapshotChanges();
  }
 
  update_Student(record_id,record){
    this.firestore.doc('students/' + record_id).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('students/' + record_id).delete();
  }
}
