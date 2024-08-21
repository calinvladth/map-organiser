import { alertError, alertSuccess } from "../stores/alerts"
import { ALERT_BANNER_DISPLAY } from "./constants"

let successTimeout;
let errorTimeout;

function successHandler(message: string) {
    alertSuccess.set(message)

    if (typeof successTimeout === 'number') {
        clearTimeout(successTimeout)
    }

    successTimeout = setTimeout(() => {
        alertSuccess.set('')
    }, ALERT_BANNER_DISPLAY)
}

function errorHandler(error: unknown) {
    alertError.set(error?.message || 'Something broke')

    if (typeof errorTimeout === 'number') {
        clearTimeout(errorTimeout)
    }

    errorTimeout = setTimeout(() => {
        alertError.set('')
    }, ALERT_BANNER_DISPLAY)
}

export { successHandler, errorHandler }