import './style.css';
import { LyricsProvidersEnum } from './constants/lyrics-providers.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="logo">
      <img class="logo-img" src="/icon-original.png" width="120px"/>
    </div>
  
    <div class="form-control">
      <label class="form-label" for="lyrics-provider">API:</label>
      <select class="form-select" id="lyrics-provider">
       <option value="${LyricsProvidersEnum.Lyrist}">https://lyrist.vercel.app</option>
      </select>
    </div>
    <p>More providers will be added in the future.</p>
    
    <p>
      <a href="https://github.com/mekedron/chrome-soundcloud-lyrics" target="_blank">GitHub</a>&nbsp;|&nbsp;
      <a href="https://www.buymeacoffee.com/mekedron" target="_blank">Buy me a coffee</a>
    </p>
  </div>
`;
