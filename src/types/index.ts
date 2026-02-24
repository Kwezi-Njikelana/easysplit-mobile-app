export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  createdBy: string;
  members: GroupMember[];
  createdAt: string;
}

export interface GroupMember {
  id: string;
  userId: string;
  user: User;
  role: "admin" | "member";
  color: string;
}

export interface Receipt {
    id: string;
    groupId: string;
    uploadedBy: string;
    merchantName: string;
    date: string;
    subtotal: number;
    tax: number;
    tip: number;
    total: number;
    items: [ReceiptItem];
    imageUrl?: string;
}

export interface ReceiptItem {
    id: string;
    receiptId: string;
    name: string;
    price: number;
    totalPrice: number;
    quantity: number;
    assignedTo: ItemAssignment[];
}

export interface ItemAssignment {
    userId: string;
    sharePercentage: number;
    amount: number;
}

export interface Balance {
    userId: string;
    username: SVGStringList;
    amount: number;
    type: "owed" | "owes"
}