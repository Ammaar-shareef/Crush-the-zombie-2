class Stone
{
    constructor(x,y,w,h){
        var options = {
            restitution: 0.01
        }
        this.body = Bodies.rectangle(x,y,w,h,options);
        this.w = w;
        this.h = h;
        this.image = loadImage("assets/stone.png");
        World.add(world,this.body);
    }
    displayBall(){
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        fill("white");
        ellipseMode(CENTER);
        ellipse(0,0,this.w,this.h);
        pop();
       }
}
