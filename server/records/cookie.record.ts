import { pool } from '../utils/db';
import { Cookie } from '../model/Cookie';
import { FieldPacket } from 'mysql2';

type AddonName = [{ addonName: String }[], FieldPacket[]]
type BaseName = [{ baseName: String }[], FieldPacket[]]
type CookiePrice = [{ price: Number }[], FieldPacket[]]

export class CookieRecord {
    static async updateCookie (cookie: Cookie) {
        if (cookie.base) {
            await pool.execute(`DELETE FROM cookie`);
            await pool.execute(`INSERT INTO cookie VALUES(:id, :base, :price)`, {
                base: cookie.base,
                price: cookie.price,
                id: 1
            });
        }

        if (cookie.addons) {
            await pool.execute(`DELETE FROM cookie_addons`);
            for (const addon of cookie.addons) {
                await pool.execute(`INSERT INTO cookie_addons VALUES(:id, :base)`, {
                    id: 1,
                    base: addon
                });
            }
        }
    }

    static async getAvailableAddons () {
        const [addons] = await pool.execute('SELECT * From `addons`');
        return addons;
    }

    static async getAvailableBases () {
        const [bases] = await pool.execute('SELECT * From `bases`');
        return bases;
    }

    static async getSavedCookie () {
        const [addons] = await pool.execute(`SELECT name as 'addonName' FROM addons INNER JOIN cookie_addons ON addons.id = cookie_addons.addons_id`) as AddonName;
        const [base] = await pool.execute(`SELECT name as 'baseName' FROM bases INNER JOIN cookie ON cookie.base = bases.id`) as BaseName;
        const [price] = await pool.execute(`SELECT price FROM cookie`) as CookiePrice;

        return {
            addons: addons.map(addon => addon.addonName),
            base: base.map(base => base.baseName)[0],
            price: price.map(price => price.price)[0]
        };
    }
}
