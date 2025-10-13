let token = ""
var showRoute;
const allStopUrl = "https://ext-api.vasttrafik.se/pr/v4/stop-areas"
//var all = findAll();
let searchedHome;
let searchedSchool;
var htmlTrips;
const date = Date().slice(16,21); // time right now







async function findTravel(from, to){
    let url = "https://ext-api.vasttrafik.se/pr/v4/journeys?originGid=" + from + "&destinationGid=" + to;
    let res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" :"Bearer " + token.access_token
        },
        method: "GET"
    })
    data = await res.json();
    return data;
}

async function findAll(){
    let res = await fetch(allStopUrl, {
        
        headers: {
            "Content-Type": "application/json",
            "Authorization" :"Bearer " + token.access_token
        },
        
        method: "GET"
    })
    all = await res.json();
    return all;
}

document.addEventListener("DOMContentLoaded", async function(){
    token = await checkToken();
    let stations = await findAll();

    document.getElementById("homeSubmit").addEventListener("submit",function(event){
        event.preventDefault();
        const stationsDiv = document.getElementById('stations');
        stationsDiv.innerHTML = "";
        
        let results = stations.filter(function(cur){
            return cur.name.toLowerCase().startsWith(inputHome.value.toLowerCase());
        })
        results.forEach(function(n){
            let p = document.createElement("p");
            p.innerText = n.name;
            p.addEventListener("click", function(){
                console.log(n);
                localStorage.setItem("home", JSON.stringify(n));
                let home = JSON.parse(localStorage.getItem("home"));
                console.log(home.name)
                const homeStation = document.getElementById("homeStation")
                homeStation.innerText = JSON.parse(localStorage.getItem("home")).name;
            })
            stationsDiv.append(p);
        });
    })

    


    document.getElementById("schoolSubmit").addEventListener("submit",function(event){
        event.preventDefault();
        const stationsDiv = document.getElementById('stations');
        stationsDiv.innerHTML = "";
        
        let results = stations.filter(function(cur){
            return cur.name.toLowerCase().startsWith(inputSchool.value.toLowerCase());
        })
        results.forEach(function(n){
            let p = document.createElement("p");
            p.innerText = n.name;
            p.addEventListener("click", function(){
                console.log(n);
                localStorage.setItem("school", JSON.stringify(n));
                //localStorage.setItem("homeName", JSON.stringify(n.name));
                //localStorage.setItem("homeGid", JSON.stringify(n.gid));
                let away = JSON.parse(localStorage.getItem("school"));
                console.log(away.name);
                const schoolStation = document.getElementById("schoolStation")
                schoolStation.innerText = JSON.parse(localStorage.getItem("away")).name;
            })


            stationsDiv.append(p);
        });
    })
})
