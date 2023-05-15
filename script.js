
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let audioElement = new Audio('songs/1.mp3');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');
let backward = document.getElementById('backward-button');
let forward = document.getElementById('forward-button');
let progress = 0;

let songs = [
    {songName: "Song 1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Song 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Song 3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Song 4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Song 5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Song 6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Song 7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Song 8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Song 9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Song 10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].textContent = songs[i].songName;

})

masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        songItemPlay[songIndex].classList.add('fa-circle-pause');
        songItemPlay[songIndex].classList.remove('fa-circle-play');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    myProgressBar.value = progress;
    if(progress == 100){
        makeAllPlays();
        songIndex = (songIndex+1)%10;
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        songItemPlay[songIndex].classList.add('fa-circle-pause');
        songItemPlay[songIndex].classList.remove('fa-circle-play');
        masterSongName.textContent = songs[songIndex].songName;
    }
})

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
})

const makeAllPlays = (index)=>{
    songItemPlay.forEach((element, i)=>{
        if(i == index)
            return;
        
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

songItemPlay.forEach((element, i)=>{
    element.addEventListener("click", ()=>{
        if(element.classList[3] == 'fa-circle-play'){
            makeAllPlays();
            songIndex = i;
            audioElement.src = songs[i].filePath;
            audioElement.play();
            masterSongName.textContent = songs[songIndex].songName;
            masterPlay.classList.remove('fa-cicle-play');
            masterPlay.classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    })
})

backward.addEventListener("click", ()=>{
    songItemPlay[songIndex].classList.add('fa-circle-play');
    songItemPlay[songIndex].classList.remove('fa-circle-pause');
    if(songIndex == 0){
        songIndex = 9;
    }
    else{
        songIndex = songIndex - 1;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterSongName.textContent = songs[songIndex].songName;
    songItemPlay[songIndex].classList.add('fa-circle-pause');
    songItemPlay[songIndex].classList.remove('fa-circle-play');
})

forward.addEventListener("click", ()=>{
    songItemPlay[songIndex].classList.add('fa-circle-play');
    songItemPlay[songIndex].classList.remove('fa-circle-pause');
    if(songIndex == 9){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterSongName.textContent = songs[songIndex].songName;
    songItemPlay[songIndex].classList.add('fa-circle-pause');
    songItemPlay[songIndex].classList.remove('fa-circle-play');
})