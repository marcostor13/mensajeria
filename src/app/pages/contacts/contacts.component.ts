import { ListService } from './../list/services/list.service';
import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Contacts } from './interfaces/contacts.interface';
import { ContactsService } from './services/contacts.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IList } from '../list/interfaces/list.interface';
import { GetListPipe } from './pipes/get-list.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzSelectModule,
    GetListPipe
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export default class ContactsComponent {
  value: string = ''
  listOfData: Contacts[] = []
  listOfDataTmp: Contacts[] = []
  isVisible: boolean = false  
  form!: FormGroup 
  lists: IList[] = []
  contactId: string = ''
  init: boolean = false

  constructor(
    private contactsServices: ContactsService,
    private message: NzMessageService,
    private listService: ListService,
    private fb: FormBuilder
  ){
    this.initForm()
  }

  ngOnInit(){
    this.getContacts()
    this.getLists()
  }

  initForm(){
    this.form = this.fb.group({
      listId: new FormControl(''),
      name:  new FormControl('', [Validators.required]),
      phone:  new FormControl('', [
        Validators.required, 
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
    })
  }

  getLists(){
    this.listService.getLists().subscribe(lists=>{
      this.lists = lists
    })
  }

  getContacts(){
    this.contactsServices.getContacts().subscribe((contacts: Contacts[])=>{
      this.listOfData = contacts
      this.listOfDataTmp = contacts
    })
  }

  search(){
    this.listOfData = this.listOfDataTmp.filter((contact: Contacts)=> contact.name.toLowerCase().indexOf(this.value.toLowerCase()) > -1 )
  }

  createContact(){
    this.contactsServices.saveContact(this.form.value).subscribe(_=>{
      this.message.success('Contacto guardado')
      this.getContacts()
      this.initForm()      
    })
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    console.log('errors', this.phone?.errors)
    this.init = true
    if(this.form.valid){
      if(this.contactId){
        this.update()
      }else{
        this.createContact()
      }
      this.isVisible = false
    }
  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  deleteContact(_id: string){
    this.contactsServices.deleteContact(_id).subscribe(_=>{
      this.message.success('Contacto eliminado')
      this.getContacts()
    })
  }

  update(){
    this.contactsServices.updateContact(this.form.value).subscribe(_=>{
      this.message.success('Contacto actualizado')
    })
  }

  edit(data: Contacts){
    this.contactId = data._id || ''
    this.form.patchValue(data)
    this.isVisible = true
  }

  get name() { return this.form?.get('name') }
  get phone() { return this.form?.get('phone') }
  get listId() { return this.form?.get('listId') }

}
