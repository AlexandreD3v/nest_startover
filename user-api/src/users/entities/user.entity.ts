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

        @Column({ nullable: false })
        name: string;

        @Column({ nullable: true })
        phone: string;

        @Column({ nullable: false })
        cpf: string;

        @Column({ nullable: true })
        cep: string;

        @Column({ nullable: true })
        logradouro: string;

        @Column({ nullable: true })
        city: string;

        @Column({ nullable: true })
        state: string;

        @Column({ nullable: true, default: true })
        is_ative: boolean;
        
        @Column({ nullable: true })
        password: string;

        @CreateDateColumn({ nullable: true })
        createdAt: Date;
      
        @UpdateDateColumn({ nullable: true })
        updatedAt: Date;
        
        @Column({ nullable: true, default: '' })
        salt: string;
      
        @Column({ nullable: true, type: 'varchar', length: 64 })
        confirmationToken: string;
      
        @Column({ nullable: true, type: 'varchar', length: 64 })
        recoverToken: string;
}
