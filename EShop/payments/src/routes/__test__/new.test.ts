import mongoose from 'mongoose';
import request from 'supertest';
import { OrderStatus } from '@rusnvc/common';
import { app } from '../../app';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

it('Cant purchase unexistent order', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.getCookie())
    .send({
      token: 'asldkfj',
      orderId: new mongoose.Types.ObjectId().toString(),
    })
    .expect(404);
});