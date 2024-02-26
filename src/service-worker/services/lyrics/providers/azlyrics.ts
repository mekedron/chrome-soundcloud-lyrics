import { LyricsProvider, LyricsProviderResponse } from './index.ts';

const AZLyricsProvider: LyricsProvider = {
  async fetchLyrics(
    song: string,
    artist?: string
  ): Promise<LyricsProviderResponse> {
    return {
      error: true,
    };
  },
};

export default AZLyricsProvider;
