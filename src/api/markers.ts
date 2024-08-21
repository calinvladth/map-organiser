import { pb } from "../services/pb";

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

async function list(mapId: string): Promise<MarkerType[]> {
    const response = await pb.collection('markers').getFullList({
        filter: `map='${mapId}'`
    })
    return response.map(pick => ({ ...pick, location: [pick.lat, pick.lng] }))
}

async function listById(pickId: string): Promise<MarkerType> {
    return await pb.collection('markers').getOne(pickId)
}

async function create({ data, cb }: { data: MarkerType, cb: () => void }) {
    await pb.collection('markers').create(data)
    cb()
}

async function update({ pickId, data, cb }: { pickId: string, data: MarkerType, cb: () => void }) {
    await pb.collection('markers').update(pickId, data)
    cb()
}

function remove() {
    return
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