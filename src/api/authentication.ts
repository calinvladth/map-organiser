import { pb } from "../services/pb"

type AuthenticationForm = {
    email: string;
    password: string
}

type AuthenticationFormError = {
    email: boolean;
    password: boolean;
}

async function login(data: AuthenticationForm) {
    await pb.collection('users').authWithPassword(data.email, data.password)
}

async function register(data: AuthenticationForm) {
    console.log('DATA: ', data)

    const record = await pb.collection('users').create({ ...data, passwordConfirm: data.password });

    console.log('RECORD: ', record)
    // TODO: Login

    // await pb.collection('users').authWithPassword(data.email, data.password)
    // console.log('AUTH: ', pb.authStore)
}

export type {
    AuthenticationForm,
    AuthenticationFormError
}

export const AuthenticationApi = {
    login,
    register
}