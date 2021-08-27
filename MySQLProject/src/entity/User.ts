import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
 
  @Column("text")
  title: string;
 

  @Column()
  completed: boolean;
}