export interface IOrder {
  fistName: string,
  lastName: string,
  birthday: string,
  citizen: string,
  email: string,
  tourID: string,
  userID: string,
  orderDate: string,
  status: 'ok' | 'pending' | 'canceled',
  tour?: {
    img: string,
    title: string,
    price: string,
    country: string,
    place: string,
    tourOperator: string
  },
  orderId: string,
  _id?: string
}
