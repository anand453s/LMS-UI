import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {
  profileURL=new BehaviorSubject<string>("");
  constructor() {
    let pic=localStorage.getItem('ProfilePic')==null?"":localStorage.getItem('ProfilePic');
    this.setItem(pic)
   }

   setItem(pic:any)
   {
    this.profileURL.next(pic)
   }

   getItem()
   {
    return this.profileURL;
   }
}
