const button = document.querySelector('.popup__btn');
const status = document.querySelector('.popup__status');

const setStatus = (message, isError = false) => {
  if (!status) return;
  status.textContent = message;
  status.style.color = isError ? '#fca5a5' : '';
};

const collectImages = () => {
  const srcSetUrls = Array.from(document.querySelectorAll('img[srcset]'))
    .flatMap((img) => img.srcset.split(','))
    .map((chunk) => chunk.trim().split(' ')[0])
    .filter(Boolean);

  const srcUrls = Array.from(document.images)
    .map((img) => img.currentSrc || img.src)
    .filter(Boolean);

  const unique = [...new Set([...srcUrls, ...srcSetUrls])];

  return unique;
};

button?.addEventListener('click', async () => {
  if (!chrome?.tabs?.query || !chrome?.scripting?.executeScript) {
    setStatus('Chrome API недоступен', true);
    return;
  }

  setStatus('Сканирую...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      setStatus('Активная вкладка не найдена', true);
      return;
    }

    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: collectImages
    });

    const images = Array.isArray(result?.result) ? result.result : [];
    setStatus(`Найдено: ${images.length}`);
  } catch (error) {
    setStatus('Ошибка сканирования', true);
  }
});
