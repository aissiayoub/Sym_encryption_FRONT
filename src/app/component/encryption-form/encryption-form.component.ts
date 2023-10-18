import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-encryption-form',
  templateUrl: './encryption-form.component.html',
  styleUrls: ['./encryption-form.component.scss']
})
export class EncryptionFormComponent {
  @Input() text = '';
  @Input() passPhrase = '';
  @Input() btnTxt = '';
  @Input() result = '';
  @Output() btnEvent = new EventEmitter<any>();
  algorithms = ["Basic", "Strong", "AES"];

  formData = this.formBuilder.group({
    textValue: new FormControl('', Validators.required),
    passPhraseValue: new FormControl('', Validators.required),
    algorithmValue: new FormControl('', Validators.required)
  });


  constructor(private formBuilder: FormBuilder){

  }

  btnClick(){
    this.btnEvent.emit(this.formData.value);
  }
}
