async function getZmones() {
    try {
        const res = await fetch("/json/zmones");
        if (res.ok) {
            const data = await res.json();
            const div = document.getElementById("zmones");
            cleanNode(div);
            const table = document.createElement("table");
            for (const zmogus of data) {
                const tr = document.createElement("tr");
                let td;
                td = document.createElement("td");
                td.appendChild(document.createTextNode(zmogus.id));
                tr.appendChild(td);
                td = document.createElement("td");
                td.appendChild(document.createTextNode(zmogus.vardas));
                tr.appendChild(td);
                td = document.createElement("td");
                td.appendChild(document.createTextNode(zmogus.pavarde));
                tr.appendChild(td);
                td = document.createElement("td");
                if (zmogus.gimimoData) {
                    const d = new Date(zmogus.gimimoData);
                    let month = "00" + (d.getMonth() + 1);
                    month = month.substring(month.length - 2);
                    let day = "00" + d.getDate();
                    day = day.substring(day.length - 2);
                    zmogus.gimimoData = `${d.getFullYear()}-${month}-${day}`;
                    td.appendChild(document.createTextNode(zmogus.gimimoData));
                }
                tr.appendChild(td);
                td = document.createElement("td");
                if (zmogus.alga) {
                    td.appendChild(document.createTextNode(zmogus.alga));
                }
                tr.appendChild(td);
                table.appendChild(tr);
            }
            div.appendChild(table);
        } else {
            console.log("Uzklausa is serverio atejo su klaida", res.status);
        }
    }
    catch (err) {
        console.log("Klaida gaunant duomenis is serverio", err);
    }
}

async function getZmogus() {
    let id = parseInt(document.getElementById("id").value);
    if (!isFinite(id)) {
        return;
    }
    try {
        const res = await fetch("/json/zmones/" + id);
        if (res.ok) {
            const zmogus = await res.json();
            const div = document.getElementById("zmones");
            cleanNode(div);
            document.getElementById("vardas").value = "";
            document.getElementById("pavarde").value = "";
            document.getElementById("alga").value = "";
            document.getElementById("gimimoData").value = "";
            if (zmogus) {
                div.appendChild(document.createTextNode("ID:"));
                div.appendChild(document.createTextNode(zmogus.id));
                div.appendChild(document.createElement("br"));
                div.appendChild(document.createTextNode("Vardas:"));
                div.appendChild(document.createTextNode(zmogus.vardas));
                document.getElementById("vardas").value = zmogus.vardas;
                div.appendChild(document.createElement("br"));
                div.appendChild(document.createTextNode("Pavarde:"));
                div.appendChild(document.createTextNode(zmogus.pavarde));
                document.getElementById("pavarde").value = zmogus.pavarde;
                div.appendChild(document.createElement("br"));
                div.appendChild(document.createTextNode("Gimimo data:"));
                if (zmogus.gimimoData) {
                    const d = new Date(zmogus.gimimoData);
                    let month = "00" + (d.getMonth() + 1);
                    month = month.substring(month.length - 2);
                    let day = "00" + d.getDate();
                    day = day.substring(day.length - 2);
                    zmogus.gimimoData = `${d.getFullYear()}-${month}-${day}`;
                    div.appendChild(document.createTextNode(zmogus.gimimoData));
                    document.getElementById("gimimoData").value = zmogus.gimimoData;
                }
                div.appendChild(document.createElement("br"));
                div.appendChild(document.createTextNode("Alga:"));
                if (zmogus.alga) {
                    div.appendChild(document.createTextNode(zmogus.alga));
                    document.getElementById("alga").value = zmogus.alga;
                }
                div.appendChild(document.createElement("br"));
            }
        } else {
            console.log("Uzklausa is serverio atejo su klaida", res.status);
        }
    }
    catch (err) {
        console.log("Klaida gaunant duomenis is serverio", err);
    }
}

async function deleteZmogus() {
    let id = parseInt(document.getElementById("id").value);
    if (!isFinite(id)) {
        return;
    }
    try {
        const res = await fetch("/json/zmones/" + id, {
            method: "DELETE"
        });
        if (res.ok) {
            getZmones();
        } else {
            console.log("Uzklausa is serverio atejo su klaida", res.status);
        }
    }
    catch (err) {
        console.log("Klaida gaunant duomenis is serverio", err);
    }
}

async function addZmogus() {
    const vardas = document.getElementById("vardas").value;
    const pavarde = document.getElementById("pavarde").value;
    const gimimoData = document.getElementById("gimimoData").value;
    const alga = parseInt(document.getElementById("alga").value);
    const zmogus = {
        vardas,
        pavarde,
        gimimoData,
        alga
    };
    try {
        const res = await fetch("/json/zmones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(zmogus)
        });
        if (res.ok) {
            getZmones();
        } else {
            console.log("Uzklausa is serverio atejo su klaida", res.status);
        }
    }
    catch (err) {
        console.log("Klaida gaunant duomenis is serverio", err);
    }
}

async function updateZmogus() {
    let id = parseInt(document.getElementById("id").value);
    if (!isFinite(id)) {
        return;
    }
    const vardas = document.getElementById("vardas").value;
    const pavarde = document.getElementById("pavarde").value;
    const gimimoData = document.getElementById("gimimoData").value;
    const alga = parseInt(document.getElementById("alga").value);
    const zmogus = {
        id,
        vardas,
        pavarde,
        gimimoData,
        alga
    };
    try {
        const res = await fetch("/json/zmones/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(zmogus)
        });
        if (res.ok) {
            getZmones();
        } else {
            console.log("Uzklausa is serverio atejo su klaida", res.status);
        }
    }
    catch (err) {
        console.log("Klaida gaunant duomenis is serverio", err);
    }
}

async function getKontaktai() {
    let zmogusId = parseInt(document.getElementById("zmogusId").value);
    if (!isFinite(zmogusId)) {
      return;
    }
    try {
      const res = await fetch("/json/zmones/" + zmogusId + "/kontaktai");
      if (res.ok) {
        const data = await res.json();
        const div = document.getElementById("kontaktai");
        cleanNode(div);
        if (data) {
          const table = document.createElement("table");
          for (const kontaktas of data) {
            const tr = document.createElement("tr");
            let td;
            td = document.createElement("td");
            td.appendChild(document.createTextNode(kontaktas.id));
            tr.appendChild(td);
            td = document.createElement("td");
            td.appendChild(document.createTextNode(kontaktas.tipas));
            tr.appendChild(td);
            td = document.createElement("td");
            td.appendChild(document.createTextNode(kontaktas.reiksme));
            tr.appendChild(td);
            table.appendChild(tr);
          }
          div.appendChild(table);
        }
      } else {
        console.log("Uzklausa is serverio atejo su klaida", res.status);
      }
    } catch (err) {
      console.log("Klaida gaunant duomenis is serverio", err);
    }
  }
  
  async function getKontaktas() {
    let zmogusId = parseInt(document.getElementById("zmogusId").value);
    if (!isFinite(zmogusId)) {
      return;
    }
    let id = parseInt(document.getElementById("kid").value);
    if (!isFinite(id)) {
      return;
    }
    try {
      const res = await fetch("/json/zmones/" + zmogusId + "/kontaktai/" + id);
      if (res.ok) {
        const kontaktas = await res.json();
        const div = document.getElementById("kontaktai");
        cleanNode(div);
        document.getElementById("tipas").value = "";
        document.getElementById("reiksme").value = "";
        if (kontaktas) {
          div.appendChild(document.createTextNode("ID:"));
          div.appendChild(document.createTextNode(kontaktas.id));
          div.appendChild(document.createElement("br"));
          div.appendChild(document.createTextNode("Tipas:"));
          div.appendChild(document.createTextNode(kontaktas.tipas));
          document.getElementById("tipas").value = kontaktas.tipas;
          div.appendChild(document.createElement("br"));
          div.appendChild(document.createTextNode("Reiksme:"));
          div.appendChild(document.createTextNode(kontaktas.reiksme));
          document.getElementById("reiksme").value = kontaktas.reiksme;
          div.appendChild(document.createElement("br"));
        }
      } else {
        console.log("Uzklausa is serverio atejo su klaida", res.status);
      }
    } catch (err) {
      console.log("Klaida gaunant duomenis is serverio", err);
    }
  }
  
  async function deleteKontaktas() {
    let zmogusId = parseInt(document.getElementById("zmogusId").value);
    if (!isFinite(zmogusId)) {
      return;
    }
    let id = parseInt(document.getElementById("kid").value);
    if (!isFinite(id)) {
      return;
    }
    try {
      const res = await fetch("/json/zmones/" + zmogusId + "/kontaktai/" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        getKontaktai();
      } else {
        console.log("Uzklausa is serverio atejo su klaida", res.status);
      }
    } catch (err) {
      console.log("Klaida gaunant duomenis is serverio", err);
    }
  }
  
  async function addKontaktas() {
    let zmogusId = parseInt(document.getElementById("zmogusId").value);
    if (!isFinite(zmogusId)) {
      return;
    }
    const tipas = document.getElementById("tipas").value;
    const reiksme = document.getElementById("reiksme").value;
    const kontaktas = {
      tipas,
      reiksme,
    };
    try {
      const res = await fetch("/json/zmones/" + zmogusId + "/kontaktai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kontaktas),
      });
      if (res.ok) {
        getKontaktai();
      } else {
        console.log("Uzklausa is serverio atejo su klaida", res.status);
      }
    } catch (err) {
      console.log("Klaida gaunant duomenis is serverio", err);
    }
  }
  
  async function updateKontaktas() {
    let zmogusId = parseInt(document.getElementById("zmogusId").value);
    if (!isFinite(zmogusId)) {
      return;
    }
    let id = parseInt(document.getElementById("kid").value);
    if (!isFinite(id)) {
      return;
    }
    const tipas = document.getElementById("tipas").value;
    const reiksme = document.getElementById("reiksme").value;
    const kontaktas = {
      tipas,
      reiksme,
    };
    try {
      const res = await fetch("/json/zmones/" + zmogusId + "/kontaktai/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kontaktas),
      });
      if (res.ok) {
        getKontaktai();
      } else {
        console.log("Uzklausa is serverio atejo su klaida", res.status);
      }
    } catch (err) {
      console.log("Klaida gaunant duomenis is serverio", err);
    }
  }


function cleanNode(node) {
    if (node instanceof Node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}

