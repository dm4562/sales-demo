export class User {
  id: number;
  email: string;
  provider: string;
  uid: string;
  name: string;
  nickname: string;
  image: any;
  accessToken: string;
  client: string;
  expiry: string;

  authHeaders: Array<string> = [
    this.uid,
    this.accessToken,
    this.client,
    this.expiry
  ]
}
