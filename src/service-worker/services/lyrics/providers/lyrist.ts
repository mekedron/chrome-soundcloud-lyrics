import { LyricsProvider, LyricsProviderResponse } from './index';

interface LyristResponse {}

const LyristProvider: LyricsProvider = {
  async fetchLyrics(
    song: string,
    artist?: string
  ): Promise<LyricsProviderResponse> {
    let url = `https://lyrist.vercel.app/api/${encodeURIComponent(song)}/${encodeURIComponent(artist || '')}`;

    const response = await fetch(url, {
      headers: {
        accept: '*/*',
      },
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      return {
        error: true,
        message:
          response.status === 404
            ? 'No lyrics for this song yet :('
            : `API returned ${response.status} status code. :(`,
      };
    }

    const result = await response.json();

    if (!result || !result.lyrics) {
      return {
        error: true,
        message: 'No lyrics for this song yet :(',
      };
    }

    return {
      error: false,
      lyrics: result.lyrics,
    };
  },
};

export default LyristProvider;
