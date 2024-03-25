export class CreateFavoriteDto {
  trackId: string;
  albumId: string;
  artistId: string;
  userId: string;
  constructor(
    trackId: string,
    albumId: string,
    artistId: string,
    userId: string,
  ) {
    this.trackId = trackId;
    this.albumId = albumId;
    this.artistId = artistId;
    this.userId = userId;
  }
}
