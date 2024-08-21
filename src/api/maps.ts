import { pb } from "../services/pb"

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

async function list(userId: string): Promise<MapType[]> {
    return await pb.collection('maps').getFullList({
        filter: `user='${userId}'`
    })
}

async function listById(id: string): Promise<MapType> {
    let response = await pb.collection('maps').getOne(id)

    response.isCentered = !!(response.lat && response.lng)

    return response
}

async function create({ data, cb }: { data: MapsForm, cb: () => void }) {
    await pb.collection('maps').create(data)
    cb()
}

async function update({ mapId, data, cb }: { mapId: string, data: MapType, cb: () => void }) {
    await pb.collection('maps').update(mapId, data)
    cb()
}

async function remove({ mapId, cb }: { mapId: string, cb: () => void }) {
    await pb.collection('maps').delete(mapId)
    cb()
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