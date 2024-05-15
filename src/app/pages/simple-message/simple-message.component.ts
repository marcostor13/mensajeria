import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SimpleMesageService } from './services/simple-mesage.service';

@Component({
  selector: 'app-simple-message',
  standalone: true,
  imports: [
    NzInputModule, 
    ReactiveFormsModule, 
    NzButtonModule,
    NzSelectModule
  ],
  templateUrl: './simple-message.component.html',
  styleUrl: './simple-message.component.scss',
})
export default class SimpleMessageComponent {
  form!: FormGroup;
  init: boolean = false
  listOfOption: string[] = []
  constructor(
    private readonly fb: FormBuilder,
    private simpleMessageService: SimpleMesageService
  ) {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      phones: new FormControl([], [
        Validators.required
      ]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.init = true
    if(this.form.valid){
      this.simpleMessageService.sendSms(this.form.value).subscribe(response=>{
        console.log('response', response)
      })
    }
  }
  
  get phones(){ return this.form.get('phones') }
  get message(){ return this.form.get('message') }


}
