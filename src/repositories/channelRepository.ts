/* eslint-disable linebreak-style */
import { AppDataSource } from "../data-source";
import { Channel } from "../entities/channel";

export const channelRepository = AppDataSource.getRepository(Channel);