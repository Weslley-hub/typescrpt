/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    	id: number | undefined;

    @Column({type: "text"})
    	name: string | undefined;

    @Column({type: "int"})
    	age: number | undefined;

    @Column({type: "text"})
    	email: string | undefined; 

    @Column({type:"text"})
    	password: string | undefined; 

    @OneToMany(() => Channel, (channel) => channel.user)
    	channels: Channel[] | undefined;

}