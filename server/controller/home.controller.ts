import { Request, Response } from 'express';
import { COOKIE_BASES, COOKIE_ADDONS, CHOOSEN_ADDONS, CHOOSEN_BASE } from '../data/cookies-data';

export async function getHomeData (req: Request, res: Response) {
    const response = {
        addons: CHOOSEN_ADDONS,
        base: CHOOSEN_BASE
    };
    return res.send(response);
}

export async function getAvailable (req: Request, res: Response) {
    const response = {
        addons: COOKIE_ADDONS,
        base: COOKIE_BASES
    };
    return res.send(response);
}