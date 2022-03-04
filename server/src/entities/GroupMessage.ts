import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "group_messages" })
class GroupMessage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  senderId: number;

  @Column()
  groupId: number;

  @ManyToOne(() => User, (user) => user.sentGroupMessages, {
    onDelete: "CASCADE",
  })
  sender: User;

  @ManyToOne(() => Group, (g) => g.messages, {
    onDelete: "CASCADE",
  })
  group: Group;

  @Column({ type: "bigint" })
  createdAt: number;
}

export default GroupMessage;
