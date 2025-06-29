import jwt from 'jsonwebtoken'

export const generarJWT = (uid: any, name: any, role: any) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name, role }

        const secret = process.env.SECRET_JWT_SEED;

        if (!secret) {
            throw new Error('Falta JWT key');
        }

        jwt.sign(payload, secret, { expiresIn: '2h' }, (err, token) => {

            if (err) {
                console.log(err)
                reject(new Error('No se pudo generar el token :('))
            }

            resolve(token)

        })

    })

}
