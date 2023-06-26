/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel";

@Entity("videos")
export class Video {

    @PrimaryGeneratedColumn()
    	id: number | undefined;

    @Column({type: "text"})
    	title: string | undefined;

    @Column({type: "text"})
    	description: string | undefined;

    @ManyToOne(() => Channel, (chanell) => chanell.videos)
    @JoinColumn({ name: "chanell_id"})
    	channel : Channel | undefined;
}