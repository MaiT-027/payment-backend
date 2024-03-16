import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class OrderDTO {
  @IsString()
  @IsNotEmpty()
  orderName: string;
  @IsString()
  @IsNotEmpty()
  currency: string;
  @IsString()
  @IsNotEmpty()
  payMethod: string;
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
