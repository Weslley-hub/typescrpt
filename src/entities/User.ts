/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    	id!: number;

    @Column({ type: "text" })
    	name!: string;

    @Column({ type: "int" })
    	age!: number;

    @Column({ type: "text", unique: true })
    	email!: string; 

    @Column({ type: "text" })
    	password!: string; 

    @OneToMany(() => Channel, (channel) => channel.user)
    	channels: Channel[] | undefined;

}