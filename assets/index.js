fetch("https://gidget.xyz/andremor")
    .then(r => r.text())
    .then(res => {
        document.getElementById("andremor").innerHTML = res;
    });