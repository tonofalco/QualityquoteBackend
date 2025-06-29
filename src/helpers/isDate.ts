const moment = require('moment')

export const isDate = (value: any, { req, location, path }: { req: any; location: any; path: any }) => {
    if (!value) {
        return false
    }

    const fecha = moment(value)
    if (fecha.isValid()) {
        return true
    } else {
        throw new Error('Fecha no válida')
    }
}