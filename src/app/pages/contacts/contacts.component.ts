import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Contacts } from './interfaces/contacts.interface';
import { ContactsService } from './services/contacts.service';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  value: string = ''
  listOfData: Contacts[] = [];
  isVisible: boolean = false
  name: string = ''
  phone: string = ''

  constructor(
    private contactsServices: ContactsService
  ){}

  ngOnInit(){
    this.getContacts()
  }

  getContacts(){
    this.contactsServices.getContacts().subscribe((contacts: Contacts[])=>{
      this.listOfData = contacts
    })
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    //llamar al servicio
    const payload = {
      name: this.name,
      phone: this.phone
    }
    console.log(payload)
    this.isVisible = false
  }

  openModal(){
    this.isVisible = true
  }

}
