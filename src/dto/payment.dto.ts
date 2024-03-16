import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import OrderDTO from './order.dto';

export default class PaymentDTO {
  @IsString()
  @IsNotEmpty()
  paymentId: string;
  @IsNotEmptyObject()
  order: OrderDTO;
}
