import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { FavoriteController } from './favorite/favorite.controller';
import { TrackService } from './track/track.service';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { FavoriteService } from './favorite/favorite.service';
import { Track } from './track/entities/track.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Favorite } from './favorite/entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User,Track,Artist,Album,Favorite],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User,Track,Artist,Album,Favorite]),
  ],
  controllers: [AppController,UserController,TrackController,ArtistController,AlbumController,FavoriteController],
  providers: [AppService,UserService,TrackService,ArtistService,AlbumService,FavoriteService],
})
export class AppModule {}
