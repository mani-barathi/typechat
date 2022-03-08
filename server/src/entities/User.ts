import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  OneToMany,
} from "typeorm";
import DirectMessage from "./DirectMessage";
import Group from "./Group";
import GroupMember from "./GroupMember";
import GroupMessage from "./GroupMessage";

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

  @OneToMany(() => Group, (g) => g.creator)
  createdGroups: Group[];

  @OneToMany(() => GroupMember, (g) => g.member)
  members: GroupMember[];

  @OneToMany(() => GroupMessage, (g) => g.sender)
  sentGroupMessages: GroupMessage[];

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
