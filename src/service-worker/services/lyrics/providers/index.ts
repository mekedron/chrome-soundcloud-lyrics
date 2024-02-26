import { LyricsProvidersEnum } from '../../../../constants/lyrics-providers.ts';

interface LyricsProviderResponse {
  lyrics?: string;
  message?: string;
  error: boolean;
}

interface LyricsProvider {
  fetchLyrics(song: string, artist?: string): Promise<LyricsProviderResponse>;
}

export type { LyricsProvider, LyricsProviderResponse };

import LyristProvider from './lyrist';
import AZLyricsProvider from './azlyrics';

const providers = {
  [LyricsProvidersEnum.Lyrist]: LyristProvider,
  // [LyricsProvidersEnum.AZLyrics]: AZLyricsProvider,
};

export default function getProvider(
  provider: LyricsProvidersEnum
): LyricsProvider {
  return providers[provider];
}
