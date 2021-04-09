const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const mainBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const image  = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

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
// On load- Select Song
loadSong(songs[songIndex])
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)