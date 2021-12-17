import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

        @Column()
        phone: string;

        @Column()
        CPF: string;

        @Column()
        logradouro: string;

        @Column()
        city: string;

        @Column()
        state: string;

        @Column()
        is_ative: boolean;

}
