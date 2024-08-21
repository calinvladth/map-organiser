import { pb } from "../services/pb"
import { errorHandler, successHandler } from "../utils/alertHandler";

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

async function listById(accountId: string): Promise<AccountType | undefined> {
    try {
        return await pb.collection('users').getOne(accountId)
    } catch (err) {
        errorHandler(err)
    }

}

async function update({ accountId, data, cb }: { accountId: string, data: AccountType, cb: () => void }) {
    try {
        await pb.collection('users').update(accountId, data)
        successHandler('Account updated')
        cb()
    } catch (err) {
        errorHandler(err)
    }

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