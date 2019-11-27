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
 
  read_Students(user_id) {
    return this.firestore.doc('users/'+user_id).collection('students').snapshotChanges();
  }
 
  update_Student(record_id,record,user_id){
    this.firestore.doc('users/'+user_id).collection('students').doc(record_id).update(record);
  }
 
  delete_Student(record_id,user_id) {
    this.firestore.doc('users/'+user_id).collection('students').doc(record_id).delete();
  }
}
