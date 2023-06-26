/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Video } from "./video";

@Entity("channels")
export class Channel {

    @PrimaryGeneratedColumn()
    	id: number | undefined;

    @Column({type: "text"})
    	name: string | undefined;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: "id_user"}) 
    	user: User | undefined;

    @OneToMany(() => Video, (video) => video.channel)
    	videos: Video[] | undefined;
} 