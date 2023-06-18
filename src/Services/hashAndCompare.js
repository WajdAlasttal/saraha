import bcrypt from 'bcrypt';
export const hash = (plaintext ,saltRound=process.env.SALTROUND) =>{
    const hashResult = bcrypt.hashSync(plaintext,parseInt(saltRound));
    return hashResult
}
export const compare = (password ,hashValue) =>{
    const hashResult = bcrypt.compareSync(password,hashValue);
    return hashResult
}

