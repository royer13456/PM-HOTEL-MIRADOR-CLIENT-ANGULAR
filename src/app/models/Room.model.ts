export interface Room {
  id?: string | number;
  image_url: string;
  title: string;
  price: number;
  description: string;
  category: string;
  visible: boolean | number;
  created_at?: Date;
}