start().catch(e => console.error(e));
async function start() {
    require('dotenv').config();
    const axios = require('axios');
    const Twitter = require('twitter');
    const client = new Twitter({
        consumer_key: process.env.API_KEY || '',
        consumer_secret: process.env.SECRET_KEY || '',
        access_token_key: process.env.ACCESS_TOKEN_KEY || '',
        access_token_secret: process.env.ACCESS_TOKEN_SECRET || ''
    });
    const response = await axios.get('https://thispersondoesnotexist.com/image', {responseType: 'arraybuffer'});
    const mediaUpload = await client.post('media/upload', {media: response.data});
    await client.post('statuses/update', {status: 'This person does not exist!', media_ids: mediaUpload.media_id_string});
}
