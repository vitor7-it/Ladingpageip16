// script.js
const hightlightsSlides = [
  { id: 0, video: 'video1.mp4', textLists: ['Texto 1'], videoDuration: 10 },
  { id: 1, video: 'video2.mp4', textLists: ['Texto 2'], videoDuration: 10 },
  { id: 2, video: 'video3.mp4', textLists: ['Texto 3'], videoDuration: 10 },
  { id: 3, video: 'video4.mp4', textLists: ['Texto 4'], videoDuration: 10 },
];

let currentVideoId = 0;
let isPlaying = false;
let videos = [];
const videoContainer = document.getElementById('slider');
const controlBtn = document.getElementById('controlBtn');
const controlImg = document.getElementById('controlImg');
const indicatorContainer = document.getElementById('indicatorContainer');

// Função para iniciar o carrossel
function initCarousel() {
  hightlightsSlides.forEach((slide, index) => {
      const videoElement = document.createElement('video');
      videoElement.src = slide.video;
      videoElement.muted = true;
      videoElement.preload = 'auto';
      videoElement.addEventListener('ended', () => handleVideoEnd());
      videoElement.addEventListener('play', () => isPlaying = true);
      videoElement.addEventListener('pause', () => isPlaying = false);
      videos.push(videoElement);
      
      const container = document.createElement('div');
      container.className = 'video-carousel_container';
      container.appendChild(videoElement);
      videoContainer.appendChild(container);
      
      const indicator = document.createElement('span');
      indicator.className = 'indicator';
      indicatorContainer.appendChild(indicator);
  });

  updateIndicator();
  playVideo();
}

// Função para tocar o vídeo atual
function playVideo() {
  videos[currentVideoId].play();
  updateControlImage();
}

// Função para lidar com o fim do vídeo
function handleVideoEnd() {
  if (currentVideoId < hightlightsSlides.length - 1) {
      currentVideoId++;
  } else {
      currentVideoId = 0; // Reiniciar o carrossel
  }
  updateIndicator();
  playVideo();
}

// Função para atualizar os indicadores
function updateIndicator() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
      indicator.style.backgroundColor = index === currentVideoId ? 'white' : 'gray';
  });
}

// Atualizar a imagem do botão de controle
function updateControlImage() {
  controlImg.src = isPlaying ? 'pause.png' : 'play.png'; // Imagens de pausar e tocar
}

// Event listener do botão de controle
controlBtn.addEventListener('click', () => {
  if (isPlaying) {
      videos[currentVideoId].pause();
  } else {
      videos[currentVideoId].play();
  }
  updateControlImage();
});

// Inicializar o carrossel
initCarousel();

