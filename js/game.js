let player = document.getElementById('player');
let opponent = document.getElementById('opponent');
let gamezone = document.getElementById('gameZone');
player.style.left = 50 + 'px';
player.style.top = 150 + 'px';
//player.src = "../resources/speedPig.png";
let x, y;
let speed = 1;

let gamezone_left = (window.innerWidth - 400) / 2;

let player_centerX = parseInt(player.style.left) + 50;
let player_centerY = parseInt(player.style.top) + 50;

let mouseX, mouseY;
let distance;

//process web socket
let socket = io.connect('http://localhost:8080');



setInterval(update, 10);

//player.src = "../resources/strengthPig.png";
gamezone.addEventListener('mousemove', (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;
    player_centerX = parseInt(player.style.left) + gamezone_left + 25;
    player_centerY = parseInt(player.style.top) + 25;
    distance = Math.sqrt((mouseX - player_centerX) * (mouseX - player_centerX) + (mouseY - player_centerY) * (mouseY - player_centerY));

})

function update() {

    if (Math.abs(mouseX - parseFloat(player.style.left) - gamezone_left - 25) < 2 && Math.abs(mouseY - parseFloat(player.style.top) - 25) < 2)
        return;

    //console.log(parseFloat(player.style.left) + speed * (mouseX - player_centerX) / distance + 'px');
    player.style.left = parseFloat(player.style.left) + speed * (mouseX - player_centerX) / distance + 'px';
    player.style.top = parseFloat(player.style.top) + speed * (mouseY - player_centerY) / distance + 'px';

    //handle socket event, update coordinate to other client
    socket.emit('position', {
        x: parseFloat(player.style.left) + 25,
        y: parseFloat(player.style.top) + 25
    });

}

//listen socket emit event

socket.on('position', (data) => { //this is opponent's center coordinate
    opponent.style.left = data.x + 'px';
    opponent.style.top = data.y + 'px';
})