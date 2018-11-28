let player = document.getElementById('player');
let opponent = document.getElementById('opponent');
let gamezone = document.getElementById('gameZone');
let ball = document.getElementById('ball');
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

//initial gamezone boudary
let top_boundary = 5;
let left_boundary = gamezone_left;
let right_boundary = left_boundary + 400;
let bottom_boundary = 670;


//initial ball position
let ball_centerX = gamezone_left + 170 + 25;
let ball_centerY = 335;
let ball_is_move = false;
let ball_normal_speed = 10;
let ball_current_speed = 0;
let ball_move_vector_x;
let ball_move_vector_y;

ball.style.left = gamezone_left + 170 + 'px';
ball.style.top = 310 + 'px';
//opponent.style.top = 400 + 'px';

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

});

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && getDistance(ball_centerX, ball_centerY, player_centerX, player_centerY) < 57) {
        ball_is_move = true;
    }
    //console.log(ball_centerY);
    //console.log(player_centerX);
    //console.log(player_centerY);
    //console.log(getDistance(ball_centerX, ball_centerY, player_centerX, player_centerY));
});

function getDistance(aX, aY, bX, bY) {
    return Math.sqrt((aX - bX) * (aX - bX) + (aY - bY) * (aY - bY));
}

function ballMoving() {
    if (ball_is_move && ball_current_speed == 0) { //setting ball speed vector
        ball_move_vector_x = ball_centerX - player_centerX;
        ball_move_vector_y = ball_centerY - player_centerY;
        ball_current_speed = ball_normal_speed;
        console.log("A");
    }
    if (ball_is_move) { //handle ball how to moving
        console.log("B");
        ball.style.left = parseFloat(ball.style.left) + ball_normal_speed * ball_move_vector_x / getDistance(0, 0, ball_move_vector_x, ball_move_vector_y) + 'px';
        ball.style.top = parseFloat(ball.style.top) + ball_normal_speed * ball_move_vector_y / getDistance(0, 0, ball_move_vector_x, ball_move_vector_y) + 'px';
    }
    //out of right boudary
    if (parseFloat(ball.style.left) + 50 > right_boundary) {
        ball_move_vector_x *= -1;
    }
    //out of left boundary
    if (parseFloat(ball.style.left) < left_boundary) {
        ball_move_vector_x *= -1;
    }
    //out of top boundary
    if (parseFloat(ball.style.top) < top_boundary) {
        ball_move_vector_y *= -1;
    }
    //out of bottom boundary
    if (parseFloat(ball.style.top) > bottom_boundary) {
        ball_move_vector_y *= -1;
    }
}

function update() {
    //handle ball move (call ballMove function)
    ballMoving();

    //fullfill condition, will return function
    if (Math.abs(mouseX - parseFloat(player.style.left) - gamezone_left - 25) < 2 && Math.abs(mouseY - parseFloat(player.style.top) - 25) < 2)
        return;

    //console.log(parseFloat(player.style.left) + speed * (mouseX - player_centerX) / distance + 'px');
    player.style.left = parseFloat(player.style.left) + speed * (mouseX - player_centerX) / distance + 'px';
    player.style.top = parseFloat(player.style.top) + speed * (mouseY - player_centerY) / distance + 'px';

    //handle socket event, update coordinate to other client
    socket.emit('position', {
        x: parseFloat(player.style.left),
        y: parseFloat(player.style.top)
    });

}

//listen socket emit event

socket.on('position', (data) => { //this is opponent's center coordinate
    opponent.style.left = data.x + 'px';
    opponent.style.top = data.y + 'px';
})