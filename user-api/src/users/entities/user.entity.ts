import {
        BaseEntity,
        Entity,
        Unique,
        PrimaryGeneratedColumn,
        Column,
        CreateDateColumn,
        UpdateDateColumn,
      } from 'typeorm';

@Entity()
export class User {

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

        @Column()
        phone: string;

        @Column()
        cpf: string;

        @Column()
        logradouro: string;

        @Column()
        city: string;

        @Column()
        state: string;

        @Column()
        is_ative: boolean;

        @CreateDateColumn()
        createdAt: Date;
      
        @UpdateDateColumn()
        updatedAt: Date;
}
