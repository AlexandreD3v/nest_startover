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

        @Column({ nullable: false })
        phone: string;

        @Column({ nullable: false })
        cpf: string;

        @Column({ nullable: false })
        cep: string;

        @Column({ nullable: false })
        logradouro: string;

        @Column({ nullable: false })
        city: string;

        @Column({ nullable: false })
        state: string;

        @Column({ nullable: false })
        is_ative: boolean;
        
        @Column({ nullable: false })
        password: string;

        @CreateDateColumn({ nullable: false })
        createdAt: Date;
      
        @UpdateDateColumn({ nullable: false })
        updatedAt: Date;
        
        @Column({ nullable: false })
        salt: string;
      
        @Column({ nullable: true, type: 'varchar', length: 64 })
        confirmationToken: string;
      
        @Column({ nullable: true, type: 'varchar', length: 64 })
        recoverToken: string;
}
