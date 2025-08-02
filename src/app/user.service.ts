

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserName {
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private userNameSubject = new BehaviorSubject<UserName>({ firstName: 'adas', lastName: 'adasi' });

  userName$: Observable<UserName> = this.userNameSubject.asObservable();

  getCurrentUserName(): UserName {
    return this.userNameSubject.value;
  }

  setUserName(firstName: string, lastName: string): void {
    this.userNameSubject.next({ firstName, lastName });
  }
}
