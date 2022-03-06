import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "group_members" })
class GroupMember extends BaseEntity {
  @Column()
  isAdmin: Boolean;

  @PrimaryColumn()
  memberId: number;

  @PrimaryColumn()
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
