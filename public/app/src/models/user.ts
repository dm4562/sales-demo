import { Headers } from '@angular/http';

export class User {
  id: number;
  email: string;
  provider: string;
  uid: string;
  name: string;
  nickname: string;
  image: any;

  authHeaders: Headers;
}
