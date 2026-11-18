export interface EquipmentItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  rentalRate: number;
  isActive: boolean;
  image: string;
  createdAt: string;
}

export interface EquipmentJson {
  success: boolean;
  count: number;
  data: EquipmentItem[];
}

export type RentalStatus = "pending" | "approved" | "handed_over" | "returned" | "rejected";

export interface RentalItem {
  _id: string;
  equipment: EquipmentItem;
  user: { _id: string; name: string; email: string; tel: string; role: string };
  quantity: number;
  startDate: string;
  returnDate: string;
  status: RentalStatus;
  updatedAt: string;
}

export interface RentalJson {
  success: boolean;
  count: number;
  data: RentalItem[];
}

export interface CartItem {
  equipmentId: string;
  name: string;
  image: string;
  rentalRate: number;
  availableQuantity: number;
  quantity: number;
  startDate: string;
  returnDate: string;
  error?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
}
