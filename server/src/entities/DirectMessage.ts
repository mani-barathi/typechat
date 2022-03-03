import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity({ name: "direct_messages" })
class DirectMessage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @ManyToOne(() => User, (user) => user.sentDirectMessages, {
    onDelete: "CASCADE",
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedDirectMessages, {
    onDelete: "CASCADE",
  })
  receiver: User;

  @Column({ type: "bigint" })
  createdAt: number;
}

export default DirectMessage;
