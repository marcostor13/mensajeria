import { Pipe, PipeTransform } from '@angular/core';
import { IList } from '../../list/interfaces/list.interface';

@Pipe({
  name: 'getList',
  standalone: true
})
export class GetListPipe implements PipeTransform {

  transform(listId: string, ...args: IList[][]): string {  
    const lists = args[0] 
    return lists.find(list=>list._id === listId)?.name || '-'
  }

}
