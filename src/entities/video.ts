/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel";

@Entity("videos")
export class Video {

    @PrimaryGeneratedColumn()
    	id!: number;

    @Column({ type: "text" })
    	title!: string;

    @Column({ type: "text" })
    	description!: string;

    @ManyToOne(() => Channel, (chanell) => chanell.videos)
    @JoinColumn({ name: "chanell_id"})
    	channel : Channel | undefined;
}