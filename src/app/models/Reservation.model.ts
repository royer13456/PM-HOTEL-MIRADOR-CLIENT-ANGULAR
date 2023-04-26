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