import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  address: string;

  @Column({ enum: ['PENDING', 'SHIPPED', 'DELIVERED'], default: 'PENDING' })
  status: string;
}
