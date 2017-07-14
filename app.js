(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame ||
     window.msRequestAnimationFrame;

    if (window.requestAnimationFrame || window.mozRequestAnimationFrame
       || window.webkitRequestAnimationFrame ||window.msRequestAnimationFrame) {
             window.requestAnimationFrame = requestAnimationFrame;
       } else {
            alert("Fehler");
       }

})
();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1000,
    height = 400,
    player = {
        x: 300,
        y: height - 5,
        width: 20,
        height: 20,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.4;

    enemy = {
        x: 50,
        y: 80,
        width: 20,
        height: 20,
        speed: 3,
        enemyX: 0,
        enemyY: 0,
        grounded: false,
        jumping: false
    }

    dart = {
        x: 535,
        y: 380,
        width: 20,
        height: 5,
        speed: 4,
        dartX: 0,
        dartY: 0,
        grounded: false,
        jumping: false
    }

var boxes = [];
var boosts = [];
var spikes = [];
var button = [];
var buttonActiv = true;
var checkPoint = [];
var checkedPoint = false;
var gate = [];
var death = 0;
var trap = [];
var goal = [];


//Box Spielfeld links
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});

//Spieler Box
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});

//Box ->
boxes.push({
    x: width - 10,
    y: 0,
    width: 10,
    height: height
});

//Box Nr.1
boxes.push({
    x: 200,
    y: 300,
    width: 40,
    height: 40
})

//Box Nr.2
boxes.push({
    x: 400,
    y: 200,
    width: 30,
    height: 30
})

//Box Nr.3 ÄNDERN auf 300
boxes.push({
    x: 500,
    y: 100,
    width: 20,
    height: 300
})

//Box Nr.4
boxes.push({
    x: 0,
    y: 100,
    width: 300,
    height: 20
})

boxes.push({
    x: 590,
    y: 100,
    width: 500,
    height: 20
})

boxes.push({
    x: 500,
    y: 200,
    width: 300,
    height: 20,
})

boxes.push({
    x: 780,
    y: 210,
    width: 20,
    height: 50
})

boxes.push({
    x: 790,
    y: 240,
    width: 60,
    height: 20
})

boxes.push({
    x: 850,
    y: 200,
    width: 20,
    height: 60
})

boxes.push({
    x: 860,
    y: 200,
    width: 80,
    height: 20
})

boxes.push({
    x: 850,
    y: 250,
    width: 20,
    height: 100
})


boxes.push({
    x: 780,
    y: 250,
    width: 20,
    height: 100
})

boxes.push({
    x: 700,
    y: 350,
    width: 100,
    height: 20
})

boosts.push({
    x: 650,
    y: 370,
    width: 10,
    height: 10
})


boosts.push({
    x: 820,
    y: 230,
    width: 10,
    height: 10
})

//Boosts 1
boosts.push({
    x: 75,
    y: 340,
    width: 10,
    height: 10
})

//Boosts 2
boosts.push({
    x: 300,
    y: 280,
    width: 10,
    height: 10
})

//Boosts 3
boosts.push({
    x: 360,
    y: 140,
    width: 10,
    height: 10
})

boosts.push({
    x: 450,
    y: 110,
    width: 10,
    height: 10
})

//Spikes
spikes.push({
    x: 510,
    y: 71,
    width: 20,
    height: 30
})

spikes.push({
    x: 527,
    y: 180,
    width: 15,
    height: 20,
})

spikes.push({
    x: 542,
    y: 180,
    width: 15,
    height: 20,
})

spikes.push({
    x: 558,
    y: 180,
    width: 15,
    height: 20,
})

spikes.push({
    x: 858,
    y: 180,
    width: 15,
    height: 20,
})

spikes.push({
    x: 792,
    y: 180,
    width: 15,
    height: 20,
})

button.push({
    x: 20,
    y: 50,
    width: 10,
    height: 10
})

checkPoint.push({
    x: 900,
    y: 60,
    width: 10,
    height: 10
})


gate.push({
    x: 940,
    y: 201,
    width: 50,
    height: 18
})

gate.push({
    x: 300,
    y: -1,
    width: 20,
    height: 120
})

trap.push({
    x: 520,
    y: 378,
    width: 20,
    height: 20
})

goal.push({
    x: 740,
    y: 345,
    width: 40,
    height: 5
})

canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    if (death == 1) {
        document.getElementById("life-icon-left").style.opacity = 0;
    } else if (death == 2) {
        document.getElementById("life-icon-middle").style.opacity = 0;
    } else if (death == 3) {
        document.getElementById("life-icon-right").style.opacity = 0;
    }

    if (death == 3) {
        alert("GAME OVER");
        location.reload();
    }

    player.velX *= friction;
    player.velY += gravity;

    ctx.beginPath();
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, width, height);
    ctx.closePath();

    player.grounded = false;
    for (var i=0; i < boxes.length; i++) {

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        ctx.closePath();
        ctx.fill();

        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
    }

    for (var i=0; i < boosts.length; i++) {

        ctx.fillStyle ="#64b51e";
        ctx.beginPath();
        ctx.rect(boosts[i].x, boosts[i].y, boosts[i].width, boosts[i].height);
        ctx.closePath();
        ctx.fill();

        var dir = collisionCheck(player, boosts[i]);

        if (dir) {
            player.jumping = true;
            player.grounded = false;
            //player.velY = -player.speed * 2;
            player.velY = -player.speed * 3;
            ctx.clearRect(boosts[i].x, boosts[i].y, boosts[i].width, boosts[i].height);
        }

    }

    for (var i=0; i < spikes.length; i++) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(spikes[i].x,spikes[i].y);
        ctx.lineTo(spikes[i].x + spikes[i].width / 2, spikes[i].y + spikes[i].height);
        ctx.lineTo(spikes[i].x - spikes[i].width / 2, spikes[i].y + spikes[i].height);
        ctx.closePath();
        ctx.stroke();

        var dir = collisionCheck(player, spikes[i]);

        if (dir) {
            player.x = 300;
            player.y = height -5;

            death++;
            player.x = 100;
            player.y = height -5;
            break;
        }
    }

    for (var i=0; i < trap.length; i++) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.rect(trap[i].x, trap[i].y, trap[i].width, trap[i].height);
        ctx.closePath();
        ctx.fill();

         var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
    }

    for (var i=0; i < goal.length; i++) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.rect(goal[i].x, goal[i].y, goal[i].width, goal[i].height);
        ctx.strokeRect(goal[i].x, goal[i].y, goal[i].width, goal[i].height);
        ctx.closePath();
        ctx.fill();

        var dir = collisionCheck(player, goal[i]);

        if (dir) {
            alert("GEWONNEN ! Super gemacht ! :)")
            location.reload();
        }

    }



    if (buttonActiv) {
        for (var i=0; i < button.length; i++) {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.strokeRect(button[i].x, button[i].y, button[i].width, button[i].height);
            ctx.closePath();

            ctx.fillStyle = "#00fdff";
            ctx.beginPath();
            ctx.fillRect(button[i].x, button[i].y, button[i].width, button[i].height);
            ctx.closePath();
            ctx.fill();

            var dir = collisionCheck(player,button[i]);

            if (dir) {
                console.log("button an");
                buttonActiv = false;
            }
        }
    }

    if (buttonActiv) {

        for (var i=0; i < gate.length; i++) {
            ctx.fillStyle = "#00fdff";
            ctx.beginPath();
            ctx.fillRect(gate[i].x, gate[i].y, gate[i].width, gate[i].height);
            ctx.strokeRect(gate[i].x, gate[i].y, gate[i].width, gate[i].height);
            ctx.closePath();
            ctx.fill();

            var dir = colCheck(player,gate[i])

            if (dir === "l" || dir === "r") {
                player.velX = 0;
                player.jumping = false;
            } else if (dir === "b") {
                player.grounded = true;
                player.jumping = false;
            } else if (dir === "t") {
                player.velY *= -1;
            }


        }

    }




    if (!checkedPoint) {
        for (var i=0; i < checkPoint.length; i++) {
            ctx.fillStyle = "#7700ff";
            ctx.beginPath();
            ctx.arc(checkPoint[i].x, checkPoint[i].y, 7, 0, 2 * Math.PI);

            ctx.closePath();
            ctx.fill();

            var dir = collisionCheck(player,checkPoint[i]);

            if (dir) {
                console.log("Checkpoint aktiviert");
                player.x = 200;
                player.y = 60;
            }
        }
    }


    if(player.grounded){
         player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    ctx.closePath();

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.closePath();
    ctx.fill();

    enemyMove();
    trapShot();

    requestAnimationFrame(update);
}

function trapShot() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.strokeRect(dart.x, dart.y, dart.width, dart.height);
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.fillRect(dart.x, dart.y, dart.width, dart.height);
    ctx.closePath();
    ctx.fill();

    dart.x += dart.speed;
    if (dart.x <= 520) {
        dart.speed = 4;
    } else if (dart.x >= 955 + dart.width) {
        dart.x = 520;
    }

    var dir = collisionCheck(player,dart)

    if (dir) {
        death++;
        player.x = 100;
        player.y = height -5;
    }

}




function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

function enemyMove() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.closePath();
    ctx.fill();

    if (enemy.grounded) {
       enemy.enemyY = 0;
    }

    enemy.x += enemy.speed;
    if (enemy.x <= 50) {
        enemy.speed = 3;
    } else if (enemy.x >= 250 + enemy.width) {
        enemy.speed = -3;
    }

    //Enemy Collision Check
    var dir = collisionCheck(player,enemy)

    if (dir) {
        death++;
        player.x = 100;
        player.y = height -5;
    }

}


function collisionCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        colDir = true;
    } else {
        colDir = false;
    }

    return colDir;
}





document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
});