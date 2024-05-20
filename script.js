const displayMode = document.querySelector(".mode");
const searchIcon = document.querySelector(".search-icon");
const input = document.querySelector(".input-value");
const crossIcon = document.querySelector(".cross-icon");
const searchbtn = document.querySelector(".btn");

const resultArea = document.querySelector(".result-area");
const profileImg = document.querySelector(".profile-img");
const userName = document.querySelector("[username]");
const gitlink = document.querySelector("[userlink]");
const joinDate = document.querySelector("[userdate]");

const bio = document.querySelector(".bio-line");

const repos = document.querySelector(".repos");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");

const loc = document.querySelector("[location]");
const portfolio = document.querySelector("[portfolio]");
const twitter = document.querySelector("[twitter]");
const company = document.querySelector("[company]");
const loading = document.querySelector(".loading");
const error = document.querySelector(".not-found");

const url = "https://api.github.com/users/";
const light = true;
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day = true;
function init(){
    displayMode.src = "assets/sun.svg";
}
init();

displayMode.addEventListener("click", ()=>{
    day = (day)?false:true;
    document.documentElement.classList.toggle('night');
    console.log(day);
    displayMode.src = (day)?"assets/sun.svg":"assets/moon.svg";
})

searchIcon.addEventListener("click", ()=>{
    input.focus();
});

input.addEventListener('keydown', (e)=>{
    if(e.key==="Enter") searchbtn.click();
});

searchbtn.addEventListener("click", ()=>{
    if(input.value !== ""){
        console.log("Yo");
        getUserData(url+input.value);
    }
});

async function getUserData(gitUrl){
    resultArea.classList.remove("active");
    loading.classList.add("active");
    error.classList.remove("active");
    const response = await fetch(gitUrl);
    const data = await response.json();
    if(!data){
        loading.classList.remove("active");
        error.classList.add("active");
    }
    else if(data?.message !== "Not Found"){
        updateProfile(data);
        loading.classList.remove("active");
        resultArea.classList.add("active");
    }
    else{
        loading.classList.remove("active");
        error.classList.add("active");
    }
}

function updateProfile(data){
    profileImg.src = `${data?.avatar_url}`;
    userName.innerText = data?.name;
    gitlink.innerText = `@${data?.login}`;
    gitlink.href = data?.html_url;
    date = data?.created_at.split("T")[0].split("-");
    joinDate.innerText = `Joined on ${date[2]} ${month[date[1]-1]} ${date[0]}`;
    bio.innerText = (data?.bio===null)?"This profile has no bio":data?.bio;
    repos.innerText = data?.public_repos;
    followers.innerText = data?.followers;
    following.innerText = data?.following;
    loc.innerText = (data?.location===null)?"Not Available":data?.location;
    portfolio.innerText = (data?.blog==="")?"Not Available":data?.blog;
    twitter.innerText = (data?.twitter_username===null)?"Not Available":data?.twitter_username;
    company.innerText = (data?.company===null)?"Not Available":data?.company;
}