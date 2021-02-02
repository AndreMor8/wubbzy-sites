fetch("https://gidget.xyz/api/andremor")
    .then(r => r.text())
    .then(res => {
        document.getElementById("andremor").innerHTML = res;
    });
