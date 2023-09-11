import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    private id!: number;
    @Column()
    private description!: String;
    @Column()
    private complete!: String;
}