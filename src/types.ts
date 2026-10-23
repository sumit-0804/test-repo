export interface Product {
  id: number;
  name: string;
  priceCents: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalCents: number;
}
