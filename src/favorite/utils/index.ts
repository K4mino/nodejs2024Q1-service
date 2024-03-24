
const findAllByIds = (entity,service,favorites) =>{
    const res = []
    
    switch(entity){
        case 'track':
            favorites?.tracks?.forEach(id => {
                const track = service.findOne(id);
                res.push(track)
            })
        case 'album':
            favorites?.albums?.forEach(id => {
                const album = service.findOne(id);
                res.push(album)
            })
        case 'artist':
            favorites?.artists?.forEach(id => {
                const artist = service.findOne(id);
                res.push(artist)
            })
    }

    return res
}

export { findAllByIds }