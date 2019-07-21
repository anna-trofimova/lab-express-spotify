const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '7dcadd78f00f4829b8495817508312c0';
const clientSecret = '8c9a6b3bd78a4d49a6fa00342dcb6c29';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/:artistId', async (req, res, next) => {
  // .getArtistAlbums() code goes here
  try {
    const id = req.params.artistId;
    const data = await spotifyApi.getArtistAlbums(id);
    console.log(data);
    res.render('albums', data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;