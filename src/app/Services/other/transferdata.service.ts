import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferdataService {
  private profileURL = new BehaviorSubject<string>(localStorage.getItem('profilePic')!);

  private profile = this.profileURL.asObservable();

  setProfile(pic:any)
  {
  this.profileURL.next(pic)
  }
  getProfile()
  {
  return this.profile;
  }

}
