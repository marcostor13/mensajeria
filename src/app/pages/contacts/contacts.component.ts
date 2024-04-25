import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Contacts } from './interfaces/contacts.interface';
import { ContactsService } from './services/contacts.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  value: string = ''
  listOfData: Contacts[] = []
  listOfDataTmp: Contacts[] = []
  isVisible: boolean = false  
  form!: Contacts 

  constructor(
    private contactsServices: ContactsService,
    private message: NzMessageService
  ){}

  ngOnInit(){
    this.getContacts()
    this.initForm()
  }

  initForm(){
    this.form = {
      name: '',
      phone: ''
    }
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
    this.contactsServices.saveContact(this.form).subscribe(_=>{
      this.message.success('Contacto guardado')
      this.getContacts()
      this.initForm()      
    })
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    if(this.form._id){
      this.update()
    }else{
      this.createContact()
    }
    this.isVisible = false
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
    this.contactsServices.updateContact(this.form).subscribe(_=>{
      this.message.success('Contacto actualizado')
    })
  }

  edit(data: Contacts){
    this.form = data
    this.isVisible = true
  }

}
