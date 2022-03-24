import { Request, Response } from 'express';
import { CHOOSEN } from '../data/cookies-data';

export async function getHomeData (req: Request, res: Response) {
    const saved = Object.entries(CHOOSEN);
    return res.send({saved});
}