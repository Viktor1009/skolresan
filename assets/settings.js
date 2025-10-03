let token = ""
var showRoute;
var schoolGid = "9021014001760000"; //Brunnsparken
var homeGid = "9021014004760000"; //Marklandsgatan
const allStopUrl = "https://ext-api.vasttrafik.se/pr/v4/stop-areas"
//var all = findAll();
let searchedHome;
let searchedSchool;
var htmlTrips;
const date = Date().slice(16,21); // time right now

/*document.addEventListener("DOMContentLoaded"), async function() {
    // här ska skrivas kod för att hämta en token
}*/

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
    let token = await checkToken();
    let stations = await findAll();
    
    console.log(token);
    let results = stations.filter(function(cur){
        return cur.name.startsWith(inputHome.value);
    });
    
    results.forEach(function(n) 
    {
        let p = document.createElement("p");
        p.innerText = n.name;
        document.body.append(p);
    });
})
