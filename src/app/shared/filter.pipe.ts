import { User } from './interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(users: User[], value: string) {
    if (!value.trim()) {
      return users;
    }

    return users.filter((user) =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );
  }
}
