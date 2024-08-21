import { pb } from "../services/pb"
import { errorHandler } from "../utils/alertHandler";

type AuthenticationForm = {
    email: string;
    password: string
}

type AuthenticationFormError = {
    email: boolean;
    password: boolean;
}

async function login({ data, cb }: { data: AuthenticationForm, cb: () => void }) {
    try {
        await pb.collection('users').authWithPassword(data.email, data.password)
        cb()
    } catch (err) {
        errorHandler(err)
    }

}

async function register({ data, cb }: { data: AuthenticationForm, cb: () => void }) {
    try {
        await pb.collection('users').create({ ...data, passwordConfirm: data.password });
        await pb.collection('users').authWithPassword(data.email, data.password)
        cb()
    } catch (err) {
        errorHandler(err)
    }

}

async function logout(cb: () => void) {
    try {
        pb.authStore.clear()
        cb()
    } catch (err) {
        errorHandler(err)
    }

}

export type {
    AuthenticationForm,
    AuthenticationFormError
}

export const AuthenticationApi = {
    login,
    register,
    logout
}