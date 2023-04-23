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
  id_room: string;
  code: string;
  check_in_date: string;
  check_out_date: string;
  names: string;
  email: string;
  total: number;
}