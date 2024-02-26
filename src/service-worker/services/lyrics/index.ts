import { LyricsProvidersEnum } from '../../../constants/lyrics-providers';
import { Service, ServiceMessage, ServiceResponse } from '../index';
import getProvider from './providers';

interface LyricsServiceMessage extends ServiceMessage {
  song?: string;
  artist?: string;
}

interface LyricsServiceResponse extends ServiceResponse {
  lyrics?: string;
  provider?: LyricsProvidersEnum;
}

export type { LyricsServiceMessage, LyricsServiceResponse };

export default class LyricsService
  implements Service<LyricsServiceMessage, LyricsServiceResponse>
{
  async execute(
    sender: chrome.runtime.MessageSender,
    message: LyricsServiceMessage
  ): Promise<LyricsServiceResponse> {
    const provider = getProvider(LyricsProvidersEnum.Lyrist);

    if (!message.song) {
      return {
        error: true,
        message: 'Please provide song name at least.',
      };
    }

    const providerResponse = await provider.fetchLyrics(
      message.song,
      message.artist
    );

    return {
      lyrics: providerResponse.lyrics,
      provider: LyricsProvidersEnum.Lyrist,
      error: providerResponse.error,
      message: providerResponse.message,
    };
  }
}

export type { LyricsService };
