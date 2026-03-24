import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order } from '../models/order.model';

const MOCK_ORDERS: Order[] = [
  { id: 1, userId: 1, total: 120 },
  { id: 2, userId: 1, total: 340 },
  { id: 3, userId: 1, total: 80 },
  { id: 4, userId: 2, total: 200 },
  { id: 5, userId: 2, total: 450 },
  { id: 6, userId: 3, total: 60 },
];

@Injectable({ providedIn: 'root' })
export class OrderService {
  getOrders(): Observable<Order[]> {
    return of(MOCK_ORDERS).pipe(delay(400));
  }
}
