let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");
let stepbackward = document.getElementById("stepbackward");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");

let songs = [
  { id: "0", songName: "Its always Blue", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { id: "1", songName: "Trap Cartel", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { id: "2", songName: "They Mad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { id: "3", songName: "Pug Walk", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { id: "4", songName: "Adhuri Kahani", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { id: "5", songName: "Safety Dance", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { id: "6", songName: "Back it up", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { id: "7", songName: "One Lady", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { id: "8", songName: "Teri Meri", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { id: "9", songName: "Let Me Love you", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

function getSongCart(song) {
  return `
<div class="songItem">
<img src= ${song.coverPath} alt="">
<span class="songName">${song.songName}</span>
<span class="songlistplay">
    <span class="timestamp">05:34
        <i id=${+song.id + 1} class="fa-solid songItemPlay fa-play-circle"></i>
    </span>
</span>
</div>
`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadSongsCard();

  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      masterSongName.innerText = songs[songIndex].songName;
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `./songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  });
});

function loadSongsCard() {
  let songItemsContainer = document.querySelector(".songItemsContainer");
  let songsCart = "";
  songs.forEach((song) => {
    songsCart += getSongCart(song);
  });
  songItemsContainer.innerHTML = songsCart;
}

// audioElement.play();
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    gif.style.opacity = 0;
  }
});

// stepbackward.addEventListener("click",()=>{
//     if(audioElement.play)
// }

audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");

  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.add("fa-play-circle");
    element.classList.remove("fa-pause-circle");
  });
};

console.log(Array.from(document.getElementsByClassName("songItemPlay")));

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `./songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 9) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `./songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
