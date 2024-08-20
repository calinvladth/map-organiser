import { pb } from "../services/pb"

type AuthenticationForm = {
    email: string;
    password: string
}

type AuthenticationFormError = {
    email: boolean;
    password: boolean;
}

async function login({ data, cb }: { data: AuthenticationForm, cb: () => void }) {
    await pb.collection('users').authWithPassword(data.email, data.password)
    cb()
}

async function register({ data, cb }: { data: AuthenticationForm, cb: () => void }) {
    const record = await pb.collection('users').create({ ...data, passwordConfirm: data.password });
    await pb.collection('users').authWithPassword(data.email, data.password)
    cb()
}

async function logout(cb) {
    pb.authStore.clear()
    cb()
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