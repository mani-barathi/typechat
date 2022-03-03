import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "group_members" })
class GroupMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAdmin: Boolean;

  @Column()
  memberId: number;

  @Column()
  groupId: number;

  @ManyToOne(() => Group, (g) => g.members, {
    onDelete: "CASCADE",
  })
  group: Group;

  @ManyToOne(() => User, (user) => user.members, {
    onDelete: "CASCADE",
  })
  member: User;

  @CreateDateColumn()
  createdAt: string;
}

export default GroupMember;
