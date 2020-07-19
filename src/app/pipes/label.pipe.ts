import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {

  transform(labelList: any[], labelName: string): any {
    if(!labelList) 
    return [];
    if(!labelName) 
    return labelList;
    console.log("labelName:",labelName);
    return labelList.filter( label => {return label.labelName.toLowerCase().includes(labelName.toLowerCase());});
  }

}
