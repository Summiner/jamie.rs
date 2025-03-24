let data = ""
async function ping() {
    var address = document.getElementById("address").value;
    if(address.length<5) return;
    if(address.length>75) return;
    console.log("Address: "+address)
    var res = await fetch('https://ping.jamie.rs/getServer?server='+address, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok) {
        data = await res.json();
        document.getElementById("server-name").textContent = address
        document.getElementById("type-buttons").setAttribute("hidden", "")
        if(data.java != "ERROR") {
            document.getElementById("server-players").textContent = data.java.players+" / "+data.java.max_players;
            document.getElementById("server-version").textContent = data.java.version;
        } else if(data.bedrock != "ERROR") {
            document.getElementById("server-players").textContent = data.bedrock.players+" / "+data.bedrock.max_players;
            document.getElementById("server-version").textContent = data.bedrock.version;
        } else {
            document.getElementById("server-name").textContent = "SERVER NOT FOUND"
            document.getElementById("server-players").textContent = "N/A";
            document.getElementById("server-version").textContent = "N/A";
            document.getElementById("motd-info").setAttribute("hidden", "")
        }
        if(data.java != "ERROR" && data.bedrock != "ERROR") {
            document.getElementById("type-buttons").removeAttribute("hidden")
        }
        document.getElementById("server-info").removeAttribute("hidden")
    } else {
        console.log("ERROR: "+res)
    }
}


function java() {
    document.getElementById("server-players").textContent = data.java.players+" / "+data.java.max_players;
    document.getElementById("server-version").textContent = data.java.version;
}

function bedrock() {
    document.getElementById("server-players").textContent = data.bedrock.players+" / "+data.bedrock.max_players;
    document.getElementById("server-version").textContent = data.bedrock.version;
}
