export interface Room {
  id?: string | number;
  image_url: string;
  title: string;
  price: number;
  description: string;
  visible: boolean;
  created_at: Date;
}