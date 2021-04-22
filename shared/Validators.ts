export function checkKeys(keys: Array<string>, data: object) {
    keys.forEach((key) => {
        if (!(key in data)) { throw `La llave ${key} es obligatoria`; }
    })
}
