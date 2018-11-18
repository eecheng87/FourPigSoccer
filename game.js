let player = document.getElementById('player');

player.style.left = 50 + 'px';
player.style.top = 150 + 'px';
//player.src = "../resources/speedPig.png";
let x, y;
let speed = 10;

let map = { 65: false, 83: false, 87: false, 68: false };

window.addEventListener('keydown', (e) => {
    if (e.keyCode in map) { //key is exist in map object
        map[e.keyCode] = true;
    }
    //handle different combination of key and move player
    if (map[68] && map[87]) {
        player.style.left = parseInt(player.style.left) + speed + 'px';
        player.style.top = parseInt(player.style.top) - speed + 'px';
        return;
    }
    if (map[68] && map[83]) {
        player.style.left = parseInt(player.style.left) + speed + 'px';
        player.style.top = parseInt(player.style.top) + speed + 'px';
        return;
    }
    if (map[65] && map[87]) {
        player.style.left = parseInt(player.style.left) - speed + 'px';
        player.style.top = parseInt(player.style.top) - speed + 'px';
        return;
    }
    if (map[65] && map[83]) {
        player.style.left = parseInt(player.style.left) - speed + 'px';
        player.style.top = parseInt(player.style.top) + speed + 'px';
        return;
    }
    if (map[68]) { //move to right
        player.style.left = parseInt(player.style.left) + speed + 'px';
        return;
    }
    if (map[65]) {
        player.style.left = parseInt(player.style.left) - speed + 'px';
        return;
    }
    if (map[87]) { //up
        player.style.top = parseInt(player.style.top) - speed + 'px';
        return;
    }
    if (map[83]) {
        player.style.top = parseInt(player.style.top) + speed + 'px';
        return;
    }


});

window.addEventListener('keyup', (e) => {
    if (map[e.keyCode]) {
        map[e.keyCode] = false;
    }
});