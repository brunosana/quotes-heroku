import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('quotes')
class Quote {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    message: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Quote;
