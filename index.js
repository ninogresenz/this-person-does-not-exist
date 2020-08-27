start().catch(e => console.error(e));
async function start() {
    const axios = require('axios');
    const Twitter = require('twitter');
    const twitterCredentials = require('./twitter-credentials');
    const client = new Twitter({
        consumer_key: twitterCredentials.apiKey || process.env.API_KEY,
        consumer_secret: twitterCredentials.secretKey || process.env.SECRET_KEY,
        access_token_key: twitterCredentials.accessTokenKey || process.env.ACCESS_TOKEN_KEY,
        access_token_secret: twitterCredentials.accessTokenSecret || process.env.ACCESS_TOKEN_SECRET
    });
    const response = await axios.get('https://thispersondoesnotexist.com/image', {responseType: 'arraybuffer'});
    const mediaUpload = await client.post('media/upload', {media: response.data});
    await client.post('statuses/update', {status: 'This person does not exist!', media_ids: mediaUpload.media_id_string});
}
