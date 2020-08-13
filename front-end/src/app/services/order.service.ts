import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order, ReceiverMomoRequest, SendMomoRequest} from '../models/order';
import {TokenStorageService} from '../auth/token-storage.service';
import {Customer} from '../models/customer';
import {OrderDetail} from '../models/order-detail';
import {Cart, CartId} from '../models/cart';
import {UserKey} from '../models/userKey';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ORDER_API_URL = 'http://localhost:8080/user-order';
  ORDER_DETAIL_API_URL = 'http://localhost:8080/order';
  ORDER_CANCEL_API_URL = 'http://localhost:8080/order-cancel';
  ORDER_CREATE_API_URL = 'http://localhost:8080/order-create';
  ORDER_DETAIL_CREATE_API_URL = 'http://localhost:8080/order-detail-create';
  CART_DELETE_API_URL = 'http://localhost:8080/cart-delete';
  CART_CREATE_API_URL = 'http://localhost:8080/cart-create';
  CART_CHANGE_QUANTITY_API_URL = 'http://localhost:8080/cart-quantity';
  MOMO_API_GET_REQUEST_URL = 'https://cors-anywhere.herokuapp.com/https://test-payment.momo.vn/gw_payment/transactionProcessor';
  idUserSource = new BehaviorSubject<number>(0);
  currentIdUser = this.idUserSource.asObservable();
  customerSource = new BehaviorSubject<Customer>(null);
  currentCustomer = this.customerSource.asObservable();
  page = new BehaviorSubject<number>(0);
  currentPage = this.page.asObservable();
  order = new BehaviorSubject<Order>(null);
  currentOrder = this.order.asObservable();
  httpOptions: any;
  cart: Cart = new Cart();

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  chanceIdUser(id): void {
    this.idUserSource.next(id);
  }

  chanceCustomer(customer): void {
    this.customerSource.next(customer);
  }

  chancePage(page): void {
    this.page.next(page);
  }

  chanceOrder(order): void {
    this.order.next(order);
  }

  findAllOrderByUserId(id: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id, this.httpOptions);
  }


  findAllOrderByUserIdOnPage(id: number, page: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id + '/?page=' + page + '&size=8', this.httpOptions);
  }

  findOrderById(id: number): Observable<any> {
    return this.httpClient.get<Order>(this.ORDER_DETAIL_API_URL + '/' + id, this.httpOptions);
  }

  cancelOrder(id: number): Observable<Order> {
    return this.httpClient.put<Order>(this.ORDER_CANCEL_API_URL + '/' + id, this.httpOptions);
  }

  createOrder(myOrder: Order): Observable<any> {
    return this.httpClient.post<Order>(this.ORDER_CREATE_API_URL, myOrder, this.httpOptions);
  }

  createOrderDetail(orderDetail: OrderDetail): Observable<any> {
    return this.httpClient.post<OrderDetail>(this.ORDER_DETAIL_CREATE_API_URL, orderDetail, this.httpOptions);
  }

  createCart(product: Product, customer: Customer, quantity: number): Observable<any> {
    const userKey2 = new UserKey();
    const cartId = new CartId();
    userKey2.account = customer.account;
    userKey2.address = customer.address;
    userKey2.birthday = customer.birthday;
    userKey2.deleteFlag = customer.deleteFlag;
    userKey2.email = customer.email;
    userKey2.gender = customer.gender;
    userKey2.id = customer.id;
    userKey2.imageUrl = customer.imageUrl;
    userKey2.phone = customer.phone;
    userKey2.userName = customer.userName;
    cartId.product = product;
    cartId.user = userKey2;
    this.cart.id = cartId;
    this.cart.quantity = quantity;
    return this.httpClient.post<Cart>(this.CART_CREATE_API_URL, this.cart, this.httpOptions);
  }

  deleteCart(cart: Cart, customer: Customer): Observable<any> {
    const userKey = new UserKey();
    userKey.account = customer.account;
    userKey.address = customer.address;
    userKey.birthday = customer.birthday;
    userKey.deleteFlag = customer.deleteFlag;
    userKey.email = customer.email;
    userKey.gender = customer.gender;
    userKey.id = customer.id;
    userKey.imageUrl = customer.imageUrl;
    userKey.phone = customer.phone;
    userKey.userName = customer.userName;
    cart.id.user = userKey;
    return this.httpClient.post<Cart>(this.CART_DELETE_API_URL, cart, this.httpOptions);
  }

  changeQuantityCart(cart: Cart, customer: Customer): Observable<any> {
    const userKey1 = new UserKey();
    userKey1.account = customer.account;
    userKey1.address = customer.address;
    userKey1.birthday = customer.birthday;
    userKey1.deleteFlag = customer.deleteFlag;
    userKey1.email = customer.email;
    userKey1.gender = customer.gender;
    userKey1.id = customer.id;
    userKey1.imageUrl = customer.imageUrl;
    userKey1.phone = customer.phone;
    userKey1.userName = customer.userName;
    cart.id.user = userKey1;
    return this.httpClient.post<Cart>(this.CART_CHANGE_QUANTITY_API_URL, cart, this.httpOptions);
  }

  getReceiverMomoRequest(sendRequest: SendMomoRequest): Observable<ReceiverMomoRequest> {
    return this.httpClient.post<ReceiverMomoRequest>(this.MOMO_API_GET_REQUEST_URL, sendRequest);
  }
}
