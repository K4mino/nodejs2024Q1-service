import { User } from './user/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorite } from './favorite/entities/favorite.entity';
interface Database  {
    users?: User[];
    albums?: Album[];
    tracks?: Track[];
    artists?: Artist[];
    favs?: {
        artists?: string[];
        albums?: string[];
        tracks?: string[];
    };
}

export const db: Database ={
    users: [
        new User('1', 'john', 'lennon', 0, 0, 0)
    ],
    albums: [
        
    ],
    tracks: [
        
    ],
    artists: [
        
    ],
    favs: {
        
    }
}