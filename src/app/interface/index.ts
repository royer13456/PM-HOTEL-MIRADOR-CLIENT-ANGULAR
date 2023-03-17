export interface Room {
  id?: string | number;
  image_url: string;
  title: string;
  price: number;
  description: string;
  visible: boolean;
  created_at: Date;
}

export interface Admin {
  user: string;
  password: string;
}