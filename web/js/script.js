async function getZmones () {
    try {
        const res = await fetch("/json/zmones");
        if (res.ok) {
            const data = await res.json();
            const div = document.getElementById("zmones");
            const table = document.createElement("table");

            for (const zmogus of data) {
                const tr = document.createElement("tr");
                let td;
                td = document
            }
        } else {
            console.log("Uzklausa is serverio  atejo suklaida", res.status);
        }
    }
    catch (err) {
        console.log("Klaida gaunant duomenis is serverio", err);
    }
}

function cleanNode(node)

async function getZmogus() {
    let id = pa
}