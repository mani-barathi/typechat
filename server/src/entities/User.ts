import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  OneToMany,
} from "typeorm";
import DirectMessage from "./DirectMessage";

@Entity({ name: "users" })
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true, length: 25 })
  username: string;

  @OneToMany(() => DirectMessage, (dm) => dm.sender)
  sentDirectMessages: DirectMessage[];

  @OneToMany(() => DirectMessage, (dm) => dm.receiver)
  receivedDirectMessages: DirectMessage[];

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
