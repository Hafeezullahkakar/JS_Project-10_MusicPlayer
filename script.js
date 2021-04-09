const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const mainBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const image  = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
// List of songs availble
const songs = 
    [{
        name: 'jacinto-1',
        displayName:'Electric Chil Machine',
        artist: 'Jacinto Design' },
    {
        name: 'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist: 'Jacinto Design' },
    {
        name: 'jacinto-3',
        displayName:'Good Night Disco Queen',
        artist: 'Jacinto Design'   },
    {
        name: 'metric-1',
        displayName:'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'    }]

let isPlaying = false;

// Play song 
function playSong(){
    isPlaying = true;
    mainBtn.classList.replace('fa-play', 'fa-pause')
    mainBtn.setAttribute('title', 'Pause')
    music.play()
}
// Pause Music
function pauseSong(){
    isPlaying = false;
    mainBtn.classList.replace('fa-pause', 'fa-play')
    mainBtn.setAttribute('title', 'Play ')
    music.pause()
}


mainBtn.addEventListener('click' , ()=>(
    isPlaying ? pauseSong() : playSong()))

    // Update DOM

    function loadSong(song){
        title.textContent = song.displayName;
        artist.textContent = song.artist;  
        music.src = `music/${song.name}.mp3`
        image.src = `img/${song.name}.jpg`
    }

    // current song
let  songIndex = 0;
function prevSong(){
    songIndex--;
if(songIndex < 0){
    songIndex = songs.length-1
}
    loadSong(songs[songIndex])
    playSong(); 
}
function nextSong(){
    songIndex++;
    if(songIndex >songs.length-1){
        songIndex = 0
    }
        loadSong(songs[songIndex])
        playSong();
    
}
// Update Progress bar 
function updateProgressBar(e){
    if(isPlaying){
        const{duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime/duration)*100;
        // For entire duration
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration/60)
        let durationSeconds = Math.floor(duration%60)
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`
      }
      //   For current time

      const currentMinutes = Math.floor(currentTime/60)
      let currentSeconds = Math.floor(currentTime%60)
      if(currentSeconds<10){
          currentSeconds = `0${currentSeconds}`
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}
}
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration


}
// On load- Select Song
loadSong(songs[songIndex])
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)