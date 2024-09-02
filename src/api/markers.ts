import { pb } from "../services/pb";
import { errorHandler } from "../utils/alertHandler";

type MarkerType = {
    id?: string;
    name: string;
    lat: string;
    lng: string;
    location?: string[];
    description: string;
    user: string;
    map: string;
}

type MarkerFormError = {
    name: boolean;
    description: boolean;
}

/**
 * Get list of markers
 * @param mapId ID of the map to retrieve markers
 * @param fields Pocketbase fields to get only selected fields
 */
async function list(mapId: string, fields?: string[]): Promise<MarkerType[] | undefined> {
    try {
        const options: Record<string, any> = {
            filter: `map='${mapId}'`
        };

        if (fields && fields.length > 0) {
            options.fields = fields.join(',');
        }

        const response = await pb.collection('markers').getFullList(options);

        return response.map(pick => ({ ...pick, location: [pick.lat, pick.lng] }))
    } catch (err) {
        errorHandler(err)
    }
}

async function listById(pickId: string): Promise<MarkerType | undefined> {
    try {
        return await pb.collection('markers').getOne(pickId)
    } catch (err) {
        errorHandler(err)
    }
}

async function create({ data, cb }: { data: MarkerType, cb: () => void }) {
    try {
        await pb.collection('markers').create(data)
        cb()
    } catch (err) {
        errorHandler(err)
    }
}

async function update({ pickId, data, cb }: { pickId: string, data: MarkerType, cb: () => void }) {
    try {
        await pb.collection('markers').update(pickId, data)
        cb()
    } catch (err) {
        errorHandler(err)
    }
}

async function remove({ pickId, cb }: { pickId: string, cb: () => void }) {
    try {
        await pb.collection('markers').delete(pickId)
        cb()
    } catch (err) {
        errorHandler(err)
    }
}

export type {
    MarkerType,
    MarkerFormError
}

export const MarkersApi = {
    list,
    listById,
    create,
    update,
    remove
}