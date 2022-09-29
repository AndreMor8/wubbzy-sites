fetch("https://api.lanyard.rest/v1/users/577000793094488085")
    .then(r => r.json())
    .then(res => {
        document.getElementById("andremor").innerHTML = res.data.discord_user.username + "#" + res.data.discord_user.discriminator;
    });
