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

async function list(mapId: string): Promise<MarkerType[] | undefined> {
    try {
        const response = await pb.collection('markers').getFullList({
            filter: `map='${mapId}'`
        })
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
    MarkerForm,
    MarkerFormError
}

export const MarkersApi = {
    list,
    listById,
    create,
    update,
    remove
}