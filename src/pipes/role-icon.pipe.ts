import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RoleIcon',
  standalone: true
})
export class RoleIconPipe implements PipeTransform {

  

  transform(value: string): string {
    switch(value){
      case('admin'): {
        return '👨‍💼'
      }
      case('student'):{
        return '🎒'
      }
      case('teacher'):{
        return '👩‍🏫'
      }
      default:{
        return '🙎'
      }

    }
    
  }


}
