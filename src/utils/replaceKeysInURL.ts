function replaceKeysInUrl(url: string, keys: { [key: string]: string }) {
    let newUrl = url

    for (let [key, value] of Object.entries(keys)) {
        newUrl = newUrl.replace(key, value)
    }

    return newUrl
}

export default replaceKeysInUrl