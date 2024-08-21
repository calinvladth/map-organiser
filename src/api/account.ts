import { pb } from "../services/pb"

type AccountType = {
    username: string;
    email: string
}

type AccountFormErrorType = {
    username: boolean;
    email: boolean;
}

type AccountPasswordType = {
    password: string;
    passwordConfirm: string;
    oldPassword: string
}

type AccountPasswordFormErrorType = {
    password: boolean;
    passwordConfirm: boolean;
    oldPassword: boolean
}

async function listById(accountId: string): Promise<AccountType> {
    return await pb.collection('users').getOne(accountId)
}

async function update({ accountId, data, cb }: { accountId: string, data: AccountType, cb: () => void }) {
    return await pb.collection('users').update(accountId, data)
    cb()
}

export type {
    AccountType,
    AccountFormErrorType,
    AccountPasswordType,
    AccountPasswordFormErrorType
}

export const AccountApi = {
    listById,
    update
}