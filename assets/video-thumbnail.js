// Only pages with an explicitly registered video thumbnail load this script.
(() => {
  'use strict';
  for (const container of document.querySelectorAll('.video-thumbnail[data-video-id]')) {
    const button = container.querySelector('button');
    const image = container.querySelector('img');
    if (!button) continue;
    const hideBrokenImage = () => { if (image) image.hidden = true; };
    image?.addEventListener('error', hideBrokenImage);
    if (image?.complete && image.naturalWidth === 0) hideBrokenImage();
    button.addEventListener('click', () => {
      const id = container.dataset.videoId;
      if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return;
      const frame = document.createElement('iframe');
      frame.className = 'media-video';
      frame.title = container.dataset.videoTitle || 'YouTube動画の使用例';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
      frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      // Autoplay is requested only in response to a deliberate button activation.
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      container.replaceChildren(frame);
      frame.focus();
    }, { once: true });
  }
})();
