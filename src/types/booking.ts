import type { Chef } from "../components/ChefCard";

export type BookingStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";

export interface Booking {
  id: string;
  chef: Chef;
  date: string;
  time: string;
  guests: number;
  hours: number;
  location: string;
  occasion: string;
  details: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
  statusHistory: {
    status: BookingStatus;
    timestamp: string;
    note?: string;
  }[];
}
