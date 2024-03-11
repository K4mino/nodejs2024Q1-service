import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [ArtistModule, UserModule, TrackModule, AlbumModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
