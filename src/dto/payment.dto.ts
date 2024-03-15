export default class PaymentDTO {
  paymentId: string;
  order: {
    orderName: string;
    currency: string;
    payMethod: string;
    amount: number;
  };
}
