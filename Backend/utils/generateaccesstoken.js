import jwt from 'jsonwebtoken';

const  generateaccesstoken = async  (userId) => {
    const token = jwt.sign({ _id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '5h' }
    )
    return token
}

export default generateaccesstoken;