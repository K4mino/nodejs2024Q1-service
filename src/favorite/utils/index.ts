import { db } from 'src/db';

const findAllByIds = (entity) =>{
    const res = []
    for(const id of db.favs[entity]){
        res.push(db[entity].find(entity => entity.id === id))
    }
    return res
}

export { findAllByIds }