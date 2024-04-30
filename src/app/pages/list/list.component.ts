import { NzMessageService } from 'ng-zorro-antd/message';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IList } from './interfaces/list.interface';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListService } from './services/list.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export default class ListComponent {
  
  value: string = ''
  listOfData: IList[] = []
  listOfDataTmp: IList[] = []
  isVisible: boolean = false
  form!: IList

  constructor(
    private listService: ListService,
    private nzMessageService: NzMessageService
  ){}

  ngOnInit(): void {
    this.initForm()
    this.getLists()
  }

  initForm(){
    this.form = {
      name: ''
    }
  }

  getLists(){
    this.listService.getLists().subscribe(lists=>{
      this.listOfData = lists
      this.listOfDataTmp = lists
    })
  }

  search(){
    if(this.value){
      this.listOfData = this.listOfDataTmp.filter(list=>list.name.toLowerCase().indexOf(this.value.toLowerCase()) > -1)
    }else{
      this.listOfData = this.listOfDataTmp
    }
  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  edit(list: IList){
    this.form = list
    this.isVisible = true
  }

  deleteList(id: string){
    this.listService.deleteList(id).subscribe(_=>{
      this.nzMessageService.success('Lista eliminada')
      this.getLists()
    })
  }

  handleCancel(){
    this.isVisible = false
  }

  update(){
    this.listService.updateList(this.form).subscribe(_=>{
      this.nzMessageService.info('Lista actualizada')
    })
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
      this.getLists()
    })
  }
}
