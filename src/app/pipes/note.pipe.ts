import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../Model/note.model';

@Pipe({
  name: 'note'
})
export class NotePipe implements PipeTransform {

  transform(note:Note[],searchTerm:String):Note[] {
    if(!note || !searchTerm){
      return note;
    } 
    console.log('notes',note,'title',searchTerm);
    return note.filter(note=>note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.description.toLowerCase().includes(searchTerm.toLowerCase())) ;
  }

}
