exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const SPEECHIFY_KEY = 'sk_a400p1rcz5kjy7sht5wa9jfj7744jpexzvf1yqbmaxw';

  try {
    const { text, voice_id } = JSON.parse(event.body);
    
    const response = await fetch('https://api.sws.speechify.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + SPEECHIFY_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text,
        voice_id: voice_id || 'fa-IR-FaridNeural',
        audio_format: 'mp3'
      })
    });

    const data = await response.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
