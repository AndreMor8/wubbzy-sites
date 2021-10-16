fetch("https://gidget.andremor.dev/api/andremor")
    .then(r => r.text())
    .then(res => {
        document.getElementById("andremor").innerHTML = res;
    });
