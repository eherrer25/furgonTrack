import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentsService } from './../../services/students.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  validations_form: FormGroup;
  errorMessage: string = '';
  user_id: string;

  constructor(private authService: AuthenticationService,private studentService : StudentsService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.studentService.read_Students(this.authService.userDetails().uid).subscribe(data => {
 
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);
    });
    this.validations_form = this.formBuilder.group({
      studentName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
      ])),
      studentAge: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      studentAddress: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  validation_messages = {
    'studentName': [
      { type: 'required', message: 'Nombre es requerido.' },
      { type: 'minlength', message: 'Debe contener un max de 10.' }
    ],
    'studentAge': [
      { type: 'required', message: 'Edad es requerido.' }
    ],
    'studentAddress': [
      { type: 'required', message: 'Dirección es requerido.' }
    ]
  };

  CreateRecord() {
    if(this.authService.userDetails()){
      this.user_id = this.authService.userDetails().uid;
    }
    let record = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
    this.studentService.create_NewStudent(this.user_id,record).then(resp => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      this.errorMessage = "";
      console.log(resp);
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.log(error);
    });
  }
 
  RemoveRecord(rowID) {
    this.user_id = this.authService.userDetails().uid;
    this.studentService.delete_Student(rowID,this.user_id);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    this.user_id = this.authService.userDetails().uid;
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.studentService.update_Student(recordRow.id, record,this.user_id);
    recordRow.isEdit = false;
  }

}
