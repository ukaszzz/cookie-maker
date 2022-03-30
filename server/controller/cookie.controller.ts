import { Request, Response } from 'express';
import { CookieRecord } from '../records/cookie.record';

export async function getHomeData (req: Request, res: Response) {
    const cookie = await CookieRecord.getSavedCookie();
    const response = {
        addons: cookie.addons,
        base: cookie.base
    };
    res.send(response);
}

export async function getAvailableAddons (req: Request, res: Response) {
    const addons = await CookieRecord.getAvailableAddons();
    const bases = await CookieRecord.getAvailableBases();
    const response = {
        addons: addons,
        bases: bases
    };
    res.send(response);
}

export async function saveCookie (req: Request, res: Response) {
    await CookieRecord.updateCookie(req.body.params);
    res
        .status(200)
        .send('ok');
}