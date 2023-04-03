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

export interface Admin {
  user: string;
  password: string;
}

export interface ContactMessage {
  id?: string | number;
  names: string;
  correo: string;
  celular: string;
  message: string;
}

export interface Reservation {
  id?: string | number;
  code: string;
  from: string;
  to: string;
  n_rooms: number;
  names: string;
  email: string;
  phone: string;
  total: number;
}