import { pool } from '../utils/db';
import { Cookie } from '../model/Cookie';
import { FieldPacket } from 'mysql2';

type AddonName = [{ addonName: String }[], FieldPacket[]]
type BaseName = [{ baseName: String }[], FieldPacket[]]

export class CookieRecord {
    static async updateCookie (cookie: Cookie) {
        console.log(cookie.base);

        await pool.execute(`UPDATE cookie SET base = :base WHERE id = 1`, {
            base: cookie.base,
            id: 1
        });
        for (const addon of cookie.addons) {
            // await pool.execute(`INSERT INTO cookie_addons VALUES`, {
            //     base: addon,
            //     id: 1
            // });
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

        return {
            addons: addons.map(addon => addon.addonName),
            base: base.map(base => base.baseName)[0]
        };
    }
}
