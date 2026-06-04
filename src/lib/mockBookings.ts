export interface Booking {
  id: string;
  customer: string;
  phone: string;
  email: string;
  serviceType: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  status: "pending" | "confirmed" | "completed";
  createdAt: string;
}

export const mockBookings: Booking[] = [
  {
    id: "BR-001",
    customer: "John Smith",
    phone: "+44 7700 123456",
    email: "john@example.com",
    serviceType: "airport",
    pickup: "Heathrow Airport, Terminal 5",
    destination: "Kensington, London",
    date: "2026-06-15",
    time: "14:00",
    passengers: 2,
    status: "confirmed",
    createdAt: "2026-06-10T10:30:00",
  },
  {
    id: "BR-002",
    customer: "Sarah Johnson",
    phone: "+44 7700 234567",
    email: "sarah@example.com",
    serviceType: "corporate",
    pickup: "Canary Wharf",
    destination: "Heathrow Airport",
    date: "2026-06-16",
    time: "08:30",
    passengers: 3,
    status: "pending",
    createdAt: "2026-06-11T14:20:00",
  },
  {
    id: "BR-003",
    customer: "Michael Brown",
    phone: "+44 7700 345678",
    email: "michael@example.com",
    serviceType: "group",
    pickup: "Victoria Station",
    destination: "Gatwick Airport",
    date: "2026-06-17",
    time: "09:00",
    passengers: 8,
    status: "confirmed",
    createdAt: "2026-06-12T09:15:00",
  },
  {
    id: "BR-004",
    customer: "Emma Wilson",
    phone: "+44 7700 456789",
    email: "emma@example.com",
    serviceType: "private",
    pickup: "Soho, London",
    destination: "Windsor Castle",
    date: "2026-06-18",
    time: "11:00",
    passengers: 4,
    status: "completed",
    createdAt: "2026-06-13T16:45:00",
  },
];

export const serviceTypeLabels: Record<string, string> = {
  airport: "Airport Transfer",
  corporate: "Corporate Transport",
  group: "Group Transport",
  private: "Private Journey",
};

export const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(255,180,50,0.15)", text: "#ffb432" },
  confirmed: { bg: "rgba(50,200,100,0.15)", text: "#32c864" },
  completed: { bg: "rgba(100,150,255,0.15)", text: "#6496ff" },
};
