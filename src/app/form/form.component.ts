import { Component, OnInit, DoCheck } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {User} from "../shared/models/user";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, DoCheck {
  form: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder) {
    this.buildForm();
    }

  ngOnInit() {
  }

  ngDoCheck() {
    }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      pw: ['', Validators.required],
      repw: ['', Validators.required]
    }, {validator: this.validatePw.bind(this)});
  }

   validatePw (form: FormGroup) {
    const pw = form.get('pw').value;
    const repw = form.get('repw').value;

    if(pw <= 0 && repw <= 0){
      return null;
    }

    if (pw !== '' && repw !== '' && pw === repw) {
      console.log('is a match');
      return false;
      } else {
      console.log('is not match');
      return {
        isMatch: true
      };
    }
  }

  submitForm (){
    if(this.form.valid){
      this.users.push(this.form.value);
    }
  }

}
