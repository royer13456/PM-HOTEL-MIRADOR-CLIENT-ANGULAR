export interface Room {
  id?: string | number;
  image_url: string;
  title: string;
  price: number;
  description: string;
  visible: boolean | number;
  created_at?: Date;
}

export interface Admin {
  user: string;
  password: string;
}

export interface ContactMessage {
  names: string;
  correo: string;
  celular: string
  message: string;
}