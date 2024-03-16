import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import PaymentDTO from './dto/payment.dto';
import axios, { AxiosError } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('payment/complete')
  async checkPayment(@Body() paymentDto: PaymentDTO) {
    try {
      const paymentResponse = await axios.get(
        `https://api.portone.io/payments/${paymentDto.paymentId}`,
        {
          headers: {
            Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
          },
        },
      );

      //실제로 여기서 데이터베이스에 기입되어 있는 상품명과 가격을 가져와서 비교해야함.
      //예시 코드이므로 여기서는 주문명과 화폐가 일치하는지만 확인함.

      if (paymentResponse.data.orderName != paymentDto.order.orderName) {
        throw new ForbiddenException('Order name not match');
      }

      if (paymentResponse.data.amount.total != paymentDto.order.totalAmount) {
        throw new ForbiddenException('Currency not match');
      }

      if (paymentResponse.data.status === 'PAID') {
        return { status: 'OK' };
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        throw new InternalServerErrorException(error.message);
      }

      if (error instanceof HttpException) {
        console.error(error);
        throw new HttpException(error.message, error.getStatus());
      }
    }
  }
}
