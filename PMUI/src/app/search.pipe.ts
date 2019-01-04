import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], field: string, searchText: string): any[] {    
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item=> item[field].toLowerCase().includes(searchText.toLowerCase())   
    );
  }

}
