import randomString from '../utils/random-string';

function closeModal(id: string) {
  const modalRoot = document.getElementById(id);

  if (!modalRoot) {
    return;
  }

  modalRoot.remove();

  document.body.classList.remove('g-overflow-hidden');
}

function showModal(
  title: string,
  content: HTMLElement,
  id: string = ''
): string {
  const modalId = id || randomString(10);

  document.body.classList.add('g-overflow-hidden');

  const modalRoot = document.createElement('div');
  modalRoot.classList.add(
    'modal',
    'g-z-index-modal-background',
    'g-opacity-transition',
    'g-z-index-overlay',
    'modalWhiteout',
    'showBackground',
    'g-backdrop-filter-grayscale'
  );
  modalRoot.setAttribute('id', modalId);
  modalRoot.style.outline = 'none';
  modalRoot.style.paddingRight = '0px';
  modalRoot.addEventListener('click', (e) => {
    if (e.target === modalRoot) {
      closeModal(modalId);
    }
  });

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add(
    'modal__modal',
    'sc-border-box',
    'g-z-index-modal-content'
  );
  modalWrapper.style.width = '850px';
  modalWrapper.style.left = '362px';
  modalWrapper.style.marginTop = '76px';
  modalWrapper.style.height = 'auto';

  const modalCloseButton = document.createElement('button');
  modalCloseButton.classList.add('modal__closeButton');
  modalCloseButton.type = 'button';
  modalCloseButton.title = 'Close';
  modalCloseButton.innerText = 'Close';
  modalCloseButton.addEventListener('click', closeModal.bind(null, modalId));

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add(
    'g-modal-title-h1',
    'sc-text-h2',
    'sc-py-1x',
    'sc-truncate'
  );
  modalTitle.innerText = title;

  modalContent.append(modalTitle, content);
  modalWrapper.append(modalCloseButton, modalContent);
  modalRoot.append(modalWrapper);

  document.body.appendChild(modalRoot);

  return modalId;
}

export { showModal, closeModal };
