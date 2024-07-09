import Track from "./track.js";

const tracks = [
    new Track(
        "Symphony",
        "Clean Bandit ft. Zara Larsson",
        "assets/1.png",
        "assets/song-list_Clean-Bandit-Symphony.mp3"
    ),
    new Track(
        "As It Was",
        "Harry Styles",
        "assets/4.png",
        "assets/song-list_Harry-Styles-As-It-Was.mp3"
    ),
    new Track(
        "Physical",
        "Dua Lipa",
        "assets/5.png",
        "assets/song-list_Dua-Lipa-Physical.mp3"
    )
]
const initialSongIdx = Math.floor(tracks.length / 2);
let currSongIdx = initialSongIdx;
let songPlayingState = false;
let onLoadPlaybackFired = false;
let showRemainingOrCurrentTime = true; // 0 - Remaining, 1 - Current

// DOM API elements
const songTitle = document.querySelector(".song-title");
const songAuthor = document.querySelector(".author-name");
const songPlaybackElem = document.querySelector(".song-playback");
const prevSongButton = document.querySelector(".prev-song");
const pausePlayButton = document.querySelector(".pause-play-btn");
const nextSongButton = document.querySelector(".next-song");
let playIconElem = createIcon("fa-solid", "fa-play");
let pauseIconElem = createIcon("fa-solid", "fa-pause");
const playbackDurationElem = document.querySelector(".overall-song-duration");
const playbackRemainingTimeElem = document.querySelector(".remaining-song-time");

function initializeProgram() {
    initSwiper();
    defineEventHandlers();
    pausePlayButton.appendChild(playIconElem);
    updatePlayingSong(currSongIdx);
}

function initSwiper() {
    new Swiper('.album-covers-wrapper', {
        direction: 'horizontal',
        slidesPerView: "auto",
        centeredSlides: true,
        initialSlide: initialSongIdx,
        spaceBetween: 50,
        allowTouchMove: false,

        effect: "coverflow",
        coverflowEffect: {
            slideShadows: false,
            rotate: 20,
        },
        navigation: {
            nextEl: '.next-song',
            prevEl: '.prev-song',
        },
    });
}

function defineEventHandlers() {
    prevSongButton.addEventListener("click", () => updatePlayingSong(--currSongIdx));
    nextSongButton.addEventListener("click", () => updatePlayingSong(++currSongIdx));
    pausePlayButton.addEventListener("click",
        () => setTimeout(() => setOrFlipPlayBtnState(), 100));
    songPlaybackElem.addEventListener("canplay",
        () => songPlayingState ? songPlaybackElem.play() : songPlaybackElem.pause());
    songPlaybackElem.addEventListener("durationchange",
        () => playbackDurationElem.textContent = formatDecimalSecondsAsTime(songPlaybackElem.duration));
    songPlaybackElem.addEventListener("timeupdate", () => setRemainingOrCurrentTime());
    playbackRemainingTimeElem.addEventListener("click", () => {
        showRemainingOrCurrentTime ^= true
        setRemainingOrCurrentTime();
    });
}

function updatePlayingSong(targetSongIdx) {
    let currTrack = tracks[targetSongIdx];
    songTitle.textContent = currTrack.title;
    songAuthor.textContent = currTrack.authorName;
    songPlaybackElem.src = "../" + currTrack.trackPath;
    if (!onLoadPlaybackFired && currSongIdx !== initialSongIdx) {
        onLoadPlaybackFired = true;
        setOrFlipPlayBtnState(true);
    }
}

function setOrFlipPlayBtnState(doPlaySong) {
    songPlayingState = doPlaySong ?? !songPlayingState;
    if (songPlayingState) {
        pausePlayButton.replaceChild(pauseIconElem, playIconElem);
        songPlaybackElem.play();
    } else {
        pausePlayButton.replaceChild(playIconElem, pauseIconElem);
        songPlaybackElem.pause();
    }
}

function createIcon(...classList) {
    let icon = document.createElement("i");
    icon.classList.add(...classList);
    return icon;
}

function formatDecimalSecondsAsTime(fSec) {
    let roundedSeconds = Math.round(fSec);
    let minutes = Math.floor(roundedSeconds / 60);
    let seconds = roundedSeconds % 60;

    function appendZero(number) {
        return number < 10 ? "0" + number : number;
    }

    return `${appendZero(minutes)}:${appendZero(seconds)}`;
}

function setRemainingOrCurrentTime() {
    playbackRemainingTimeElem.textContent = formatDecimalSecondsAsTime(showRemainingOrCurrentTime
        ? songPlaybackElem.currentTime
        : songPlaybackElem.duration - songPlaybackElem.currentTime || 0);
}


initializeProgram();