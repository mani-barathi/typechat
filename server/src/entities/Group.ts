import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import GroupMember from "./GroupMember";
import GroupMessage from "./GroupMessage";
import User from "./User";

@Entity({ name: "groups" })
class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 1 })
  totalMembers: number;

  @Column()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.createdGroups)
  creator: User;

  @OneToMany(() => GroupMember, (gm) => gm.group)
  members: GroupMember[];

  @OneToMany(() => GroupMessage, (gm) => gm.group)
  messages: GroupMessage[];

  @Column({ type: "bigint" })
  createdAt: number;
}

export default Group;
