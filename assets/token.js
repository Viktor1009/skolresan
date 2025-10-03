
const key = "ZUQwSUJFcGRmUFJrVFFtdXZlM0VYazNsb0lZYTpTenRfM2FLdW5tWldjU2ZIZXUxOVFUMEF2R01h"; // SKA INTE LIGGA FRONT END

// glöm inte att uppdatera temptoken
// det räcker att kopiera koden på rad ett radera den och sen lägga in den igen
let now = new Date();

    async function checkToken() {
        
        let token = localStorage.getItem("token") == "" ? setToken() : JSON.parse(localStorage.getItem("token"));
        console.log("1");
        console.log(token.expires_in - ((now - new Date(token.time)) / 1000));
        if(((now - new Date(token.time)) / 1000) > token.expires_in){
             token = setToken();
        }else{
            console.log("fresh token");
        }
        return token;
    }

    
//if token.date - now > token.expires_in
// console log old
// else 
    // console log valid

// skapa en ny token om behövs


async function setToken() {
    let url = "https://ext-api.vasttrafik.se/token";
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + key
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    })
    data = await res.json();
    data.time = new Date();
    localStorage.setItem("token", JSON.stringify(data));
    return data;
}
