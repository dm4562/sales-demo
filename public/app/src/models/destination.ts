export class Destination {
  id: number;
  name: string;
  continent: string;
  score: number;
  desc_short: string;
  desc_long: string;
  image_src: string;
  user_id: number;
  created_by: {
    name: string,
    email: string
  }
}
