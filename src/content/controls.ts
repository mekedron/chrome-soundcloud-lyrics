import { showModal } from './modal';
import LyricsService, {
  LyricsServiceMessage,
  LyricsServiceResponse,
} from '../service-worker/services/lyrics';
import { ServiceListenerMessage } from '../service-worker/services';
import ServiceRoutes from '../constants/service-routes.ts';
import services = chrome.privacy.services;

function controls() {
  console.debug('Initializing SoundCloud Lyrics extension...');
  injectLyricsBtnToPlayControlsPanel();
}

function injectLyricsBtnToPlayControlsPanel() {
  setInterval(() => {
    const soundBadgeActions = document
      .getElementsByClassName('playbackSoundBadge__actions')
      .item(0);

    if (
      !soundBadgeActions ||
      soundBadgeActions.querySelector('.button-song-lyrics')
    ) {
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add(
      'button-song-lyrics',
      'playbackSoundBadge__follow',
      'sc-mr-1x',
      'sc-button',
      'sc-button-small',
      'sc-button-icon',
      'sc-button-responsive',
      'sc-button-secondary',
      'm-boldIcon'
    );

    soundBadgeActions.prepend(button);

    button.addEventListener('click', () => {
      const { song, artist } = getCurrentTrackInfo();

      showLyrics(song, artist).catch((err) => console.error(err));
    });
  }, 100);
}

function getCurrentTrackInfo() {
  const songLink = document.querySelector('.playbackSoundBadge__titleLink');
  const artistLink = document.querySelector('.playbackSoundBadge__lightLink');

  if (!songLink || !artistLink) {
    return {
      song: undefined,
      artist: undefined,
    };
  }

  return {
    song: songLink.getAttribute('title') || undefined,
    artist: artistLink.getAttribute('title') || undefined,
  };
}

async function showLyrics(song?: string, author?: string) {
  const message: ServiceListenerMessage<LyricsServiceMessage> = {
    route: ServiceRoutes.Lyrics,
    song: song,
    artist: author,
  };

  const response: LyricsServiceResponse =
    await chrome.runtime.sendMessage(message);

  const content = document.createElement('div');
  if (response.error) {
    content.innerText = `${response.message}`;
  } else if (!response.lyrics) {
    content.innerText = `No lyrics for this song yet :(`;
  } else {
    content.innerText = response.lyrics;
  }

  showModal(`${song} - ${author}`, content, 'lyrics');
}

controls();
