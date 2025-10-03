var token = "";
var showRoute;
var schoolGid = "9021014001760000"; //Brunnsparken
var homeGid = "9021014004760000"; //Marklandsgatan
const allStopUrl = "https://ext-api.vasttrafik.se/pr/v4/stop-areas"
//var all = findAll();
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
    token = await checkToken();
    console.log(token)
    showRoute = document.getElementById("modal");
    htmlTrips = document.querySelector(".trip");

    document.getElementById("home").addEventListener("click", async function(){// Du vill åka hem
        let data = await findTravel(schoolGid, homeGid);
        updateInfo(data.results);
    })
    document.getElementById("away").addEventListener("click", async function(){// Du vill åka hemifrån

        let data = await findTravel(homeGid, schoolGid );
        updateInfo(data.results);
    })
    document.getElementById("exit").addEventListener("click", function(){
        hideDisplay();
    })

    // SKAPA KLCIK EVENT För skola och hem
    //visa modelen och fyll den med info
    // vilken info? välj själv
})

async function showDisplay(){
    showRoute.classList.remove("hidden");
}
async function hideDisplay(){
    showRoute.classList.add("hidden");
}
async function updateInfo(data){
    var lastStop;
    console.log(data[3].tripLegs);
    document.getElementById("trip").innerHTML = "";
    let display = document.getElementById("trip");
    console.log(data);
    for(let i = 1; i < 4; i++){  
        var test = document.createElement("div");
        test.classList.add("trip-example");
        data[i].tripLegs.forEach(function(leg){
            console.log(data[i]);
            let trip = document.createElement("div");
            trip.classList.add("trip");
            trip.innerHTML = `<h4 class="origin">${leg.origin.stopPoint.name}</h4>
                                <h4 class="time">${leg.estimatedDepartureTime.slice(11, 16)}</h4>
                                <h4 class="transport">${leg.serviceJourney.line.shortName}</h4>`;
            test.append(trip);
            lastStop = leg;
        });
    let trip = document.createElement("div");
    trip.classList.add("trip");
        trip.innerHTML = `<h4 class="origin">${lastStop.destination.stopPoint.name}</h4>
                        <h4 class="time">${lastStop.estimatedArrivalTime.slice(11, 16)}</h4>
                        <h4 class="transport">${lastStop.serviceJourney.line.shortName}</h4>`;
        console.log(test);
        test.append(trip);
            display.append(test);
}
    showDisplay();
}