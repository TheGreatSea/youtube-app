console.log("Shit is doing things");
const API_KEY = "AIzaSyBDcGwQ4ehOngEC1JvxklgGhw-OWDUx-04";
console.log("Shit loaded api key");
let nextPageToken = "";
let prevPageToken = "";
let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=10`;
let currentPage;

function fetchVideos() {
    let settings = {
        method: 'GET'
    };
    fetch(currentPage, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error");
        })
        .then(responseJSON => {
            displayVideos(responseJSON);
        })
        .catch(err => {
            console.log(err.message);
        });
}

function displayVideos(data) {
    let results = document.querySelector('.results');
    results.innerHTML = "";
    for (let i = 0; i < data.items.length; i++) {
        results.innerHTML += `
        <div class="thumbnail">
            <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
                <img alt="${data.items[i].snippet.title}" src="${data.items[i].snippet.thumbnails.medium.url}">
                <h3>${data.items[i].snippet.title}</h3>
            </a>
        </div>
        `;
    }
    window.scrollTo(0, 0);
    results.innerHTML += `
    <div class="buttons">
        <span>
            <button id="Prev" class="navButtons hidden" type="submit">Previous</button>
            <button id="Next" class="navButtons hidden" type="submit">Next</button>
        </span>
    </div>
    `;
    navigation(data.nextPageToken, data.prevPageToken);
}

function navigation(nextPageToken, prevPageToken) {
    let navNext = document.querySelector('#Next');
    let navPrev = document.querySelector('#Prev');
    if (nextPageToken) {
        navNext.classList.remove("hidden");
        navNext.addEventListener("click", (event) => {
            currentPage = url + `&pageToken=${nextPageToken}`;
            fetchVideos();
            event.preventDefault();
        });
    }
    if (prevPageToken) {
        navPrev.classList.remove("hidden");
        navPrev.addEventListener("click", (event) => {
            currentPage = url + `&pageToken=${prevPageToken}`;
            fetchVideos();
            event.preventDefault();
        });
    }
}

function searchVideos() {
    let submitButtton = document.querySelector('.submitButtton');
    submitButtton.addEventListener('click', (event) => {
        let searchValue = document.querySelector('#searchTerm').value;
        console.log(searchValue);
        if (searchValue == "") {
            window.alert("Invalid search text");
        } else {
            console.log(`&q=${searchValue}`);
            url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=10&q=${searchValue}`;
            currentPage = url;
            console.log(url);
            fetchVideos();
        }
        event.preventDefault();
    });
}

function init() {
    console.log("Shit")
    searchVideos();
}

init();