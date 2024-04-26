import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IList } from './interfaces/list.interface';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export default class ListComponent {
  
  value: string = ''
  listOfData: IList[] = []
  isVisible: boolean = false
  form!: IList

  constructor(
    private listService: ListService
  ){}

  ngOnInit(): void {
    this.initForm()    
  }

  initForm(){
    this.form = {
      name: ''
    }
  }

  search(){

  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  edit(list: IList){

  }

  deleteList(id: string){

  }

  handleCancel(){
    this.isVisible = false
  }

  update(){

  }

  handleOk(){
    if(this.form._id){
      this.update()
    }else{
      this.createList()
    }
    this.isVisible = false
  }

  createList(){
    this.listService.saveList(this.form).subscribe(_=>{
      console.log('lista guardada')
    })
  }
}
