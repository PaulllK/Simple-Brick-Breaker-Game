export function detectCollision(gameBall, gameObject){

    const ball = {
        top: gameBall.position.y,
        right: gameBall.position.x + gameBall.size,
        bottom: gameBall.position.y + gameBall.size,
        left: gameBall.position.x
    }

    const object = {
        top: gameObject.position.y,
        right: gameObject.position.x + gameObject.width,       
        bottom: gameObject.position.y + gameObject.height,
        left: gameObject.position.x
    }

    const ballMiddle = (ball.left + ball.right) / 2;

    if(object.left <= ballMiddle && ballMiddle <= object.right){
        
        if(ball.bottom >= object.top && ball.bottom <= object.bottom){ // hits top
            return 1;
        }else if(ball.top <= object.bottom && ball.top >= object.top){ // hits bottom
            return 2;
        }

    }else if(ball.left <= object.right && ball.left > object.left){
        if(gameBall.speed.x < 0){
            if(
                (ball.bottom >= object.top && ball.bottom <= object.bottom)
                || (ball.top <= object.bottom && ball.top >= object.top)
            )return 3; // hits right side of object, coming from the right
        }else{ // hits right side of object, coming from the left, actually means it will hit the top or the bottom
            if(ball.bottom >= object.top && ball.bottom <= object.bottom){ // top
                return 1;
            }else if(ball.top <= object.bottom && ball.top >= object.top){ // bottom
                return 2;
            }
        }
    }else if(ball.right >= object.left && ball.right < object.right){
        if(gameBall.speed.x > 0){
            if(
                (ball.bottom >= object.top && ball.bottom <= object.bottom)
                || (ball.top <= object.bottom && ball.top >= object.top)
            )return 4;                           // hits left side of object, coming from the left
        }else{ // hits left side of object, coming from the right, actually means it will hit the top or the bottom
            if(ball.bottom >= object.top && ball.bottom <= object.bottom){ // top
                return 1;
            }else if(ball.top <= object.bottom && ball.top >= object.top){ // bottom
                return 2;
            }
        }
    }

    return 0;

}

export function updateBallTrajectory(ball, object, collisionPosition){

    switch( collisionPosition ){

        case 1: // top of object
            ball.position.y = object.position.y - ball.size;
            ball.speed.y = -ball.speed.y;               
            break;

        case 2: // bottom of object
            ball.position.y = object.position.y + object.height;
            ball.speed.y = -ball.speed.y;                
            break;

        case 3: // right of object
            ball.position.x = object.position.x + object.width;
            ball.speed.x = -ball.speed.x;         
            break;

        case 4: // left of object  
            ball.position.x = object.position.x - ball.size;
            ball.speed.x = -ball.speed.x;

    }

}