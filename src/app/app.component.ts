import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formData = []; //these data will be use to construct a form
  infoForm: any;
  initFormUI = false;
  optionUI = false;
  newForm: any;
  generatedForm = false;

  ngOnInit(){
    this.formInit();
  }

  formInit() {
    this.initFormUI = true;
    this.infoForm = new FormGroup({
      label: new FormControl(''),
      type: new FormControl(''),
      options: new FormArray([]),
      value: new FormControl('')
    });
  }

  get Type() {
    //console.log(this.form.get('type').value);
    return this.infoForm.get('type') as FormArray;
  }

  get Options() {
    return this.infoForm.get('options') as FormArray;
  }

  //remove a option in a select input by clicking a button
  removeOption(option: any) {
    let index = this.Options.controls.indexOf(option);
    this.Options.removeAt(index);
  }

  addOptions(option: HTMLInputElement) {
    (this.infoForm.get('options') as FormArray).push(
      new FormControl(option.value)
    );
    option.value = '';
    this.optionUI = true;
  }

  insertFormData() {
    this.formData.push(this.infoForm.value);
    console.log(this.formData);
    this.infoForm.reset();
    this.optionUI = false;
    this.generateForm();
  }

  generateForm() {
    var group: { [key: string]: any } = {};
    this.formData.forEach((e: any) => {
      group[e.label] = new FormControl('');
    });

    this.generatedForm = true;
    this.newForm = new FormGroup(group);
  }

  onSubmit() {
    console.log(this.newForm.value);
  }
}
