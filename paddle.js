export default class Paddle{

    constructor(game){
        this.gameWidth = game.gameWidth;

        this.width = 150;
        this.height = 20;

        this.position = {
            x: game.gameWidth/2 - this.width/2 ,
            y: game.gameHeight - this.height - 10
        }
        this.maxSpeed = 15;
        this.speed = 0;
    }

    draw(ctx){
        ctx.drawImage(document.querySelector('#img_paddle'), this.position.x , this.position.y , this.width , this.height);
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = this.maxSpeed;
    }

    stop(){
        this.speed = 0;
    }

    update(deltaTime){
        this.position.x += this.speed;
        if(this.position.x < 0)this.position.x = 0;
        else if(this.position.x > this.gameWidth - this.width)this.position.x = this.gameWidth - this.width;
    }

}