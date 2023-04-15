const axios = require('axios');
const fs = require('fs');

async function downloadTikTokVideo(videoUrl, filename) {
  const response = await axios.get(videoUrl, { responseType: 'stream' });
  const writer = fs.createWriteStream(filename);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Example usage
const videoUrl = 'https://api.tiktok.com/video/1234567890123456789';
const filename = 'video.mp4';
downloadTikTokVideo(videoUrl, filename)
  .then(() => console.log('Video downloaded successfully'))
  .catch(err => console.error(err));
