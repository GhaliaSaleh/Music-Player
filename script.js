window.addEventListener('DOMContentLoaded', () => {
  const playlist = document.querySelector('#playlist');
  const playBtn = document.querySelector('#play');
  const pauseBtn = document.querySelector('#pause');
  const stopBtn = document.querySelector('#stop');
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');
  const volumeSlider = document.querySelector('#volume');
  const progressBar = document.querySelector('.progress-bar');
  const progressElement = document.querySelector('.progress');
  const progressTimeElement = document.querySelector('.progress-time');
  const coverArt = document.querySelector('.cover-art');

  let currentSongIndex = 0;
  let audio = null;
  let isPlaying = false;

  const songs = [
    'Calm Down.mp3',
    'Let Me Love You.mp3',
    'Shape Of You.mp3',
    'Unstoppable.mp3',
    'Rockabye (Lyrics).mp3'
  ];

  function loadSong(songIndex) {
    if (audio) {
      audio.pause();
    }

    audio = new Audio(`songs/${songs[songIndex]}`);
    audio.volume = volumeSlider.value;
    audio.addEventListener('ended', next);

    updatePlaylist(songIndex);
  }

  function updatePlaylist(selectedSongIndex) {
    playlist.innerHTML = songs
      .map((song, index) => `<li class="${index === selectedSongIndex ? 'active' : ''}">${song}</li>`)
      .join('');

    const playlistItems = document.querySelectorAll('.playlist li');
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        loadSong(index);
        play();
      });
    });
  }

  function play() {
    audio.play();
    coverArt.style.opacity = 1;
    isPlaying = true;
  }

  function pause() {
    audio.pause();
    isPlaying = false;
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
    coverArt.style.opacity = 0;
    isPlaying = false;
  }

  function prev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
      play();
    }
  }

  function next() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
      play();
    }
  }

  function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    progressElement.style.width = `${progress}%`;
    const currentTime = formatTime(audio.currentTime);
    progressTimeElement.textContent = `${currentTime} / ${formatTime(audio.duration)}`;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(num) {
    return num.toString().padStart(2, '0');
  }

  // Show playlist on page load
  updatePlaylist(currentSongIndex);

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  });

  pauseBtn.addEventListener('click', pause);

  stopBtn.addEventListener('click', stop);

  prevBtn.addEventListener('click', prev);

  nextBtn.addEventListener('click', next);

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });



  loadSong(currentSongIndex);
});
