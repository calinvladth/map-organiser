import { pb } from "../services/pb"
import { errorHandler } from "../utils/alertHandler";

type MapType = {
    id: string;
    name: string;
    lat: string;
    lng: string;
    isCentered: boolean
}

type MapsForm = {
    name: string;
    user: string;
}

type MapsFormError = {
    name: boolean;
    user: boolean;
}

async function list(userId: string): Promise<MapType[] | undefined> {
    try {
        return await pb.collection('maps').getFullList({
            filter: `user='${userId}'`
        })
    } catch (err) {
        errorHandler(err)
    }
}

async function listById(id: string): Promise<MapType | undefined> {
    try {
        let response = await pb.collection('maps').getOne(id)

        response.isCentered = !!(response.lat && response.lng)

        return response
    } catch (err) {
        errorHandler(err)
    }
}

async function create({ data, cb }: { data: MapsForm, cb: () => void }) {
    try {
        await pb.collection('maps').create(data)
        cb()
    } catch (err) {
        errorHandler(err)
    }
}

async function update({ mapId, data, cb }: { mapId: string, data: MapType, cb: () => void }) {
    try {
        await pb.collection('maps').update(mapId, data)
        cb()
    } catch (err) {
        errorHandler(err)
    }
}

async function remove({ mapId, cb }: { mapId: string, cb: () => void }) {
    try {
        await pb.collection('maps').delete(mapId)
        cb()
    } catch (err) {
        errorHandler(err)
    }
}

export const MapsApi = {
    list,
    listById,
    create,
    update,
    remove
}

export type {
    MapType,
    MapsForm,
    MapsFormError
}