import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import GroupMember from "./GroupMember";
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

  @Column({ type: "bigint" })
  createdAt: number;
}

export default Group;
