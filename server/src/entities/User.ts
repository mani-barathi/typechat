import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from "typeorm";

@Entity({ name: "users" })
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true, length: 25 })
  username: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
