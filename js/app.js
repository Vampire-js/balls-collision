import { Vector2d } from "./utils.js"
import { Utils } from "/js/utils.js"

const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight


class Circle {
    constructor(){
        this.position = new Vector2d(0,0)
        this.mass = 1
        this.bounciness = 0.6
        this.velocity = new Vector2d(0,0)
        this.gravity = 0.1
        this.rad = 0
        this.draw()
    }
    getVelocityOne(m1 , m2 , v1 , v2){
        return ((m1-m2)/(m1+m2))*v1 + 2*m2*v2/(m1+m2)
    }
    getVelocityTwo(m1 , m2 , v1 , v2){
        return -((m1-m2)/(m1+m2))*v1 + 2*m2*v2/(m1+m2)
    }
    collide(circle){
        console.log(circle.position)
        if(Utils().dist(circle.position.add(circle.velocity) , this.position.add(this.velocity)) <= this.rad + circle.rad){
           let centralVector = Utils().sub( this.position , circle.position)
           let tangentialVector = Utils().getNormal(centralVector)

           //Final velocity in radial direction 
           let v1rf =  this.getVelocityOne(this.mass , circle.mass , Utils().getProjection(this.velocity , centralVector) , Utils().getProjection(circle.velocity , centralVector))
           let v2rf =  -this.getVelocityOne(this.mass , circle.mass , Utils().getProjection(this.velocity , centralVector) , Utils().getProjection(circle.velocity , centralVector))

           //Final velocity in tangential direction 
           
           let v1tf =  this.getVelocityTwo(this.mass , circle.mass , Utils().getProjection(this.velocity , tangentialVector) , Utils().getProjection(circle.velocity , tangentialVector))
           let v2tf =  -this.getVelocityTwo(this.mass , circle.mass , Utils().getProjection(this.velocity , tangentialVector) , Utils().getProjection(circle.velocity , tangentialVector))

           this.velocity.x = Utils().getProjection(tangentialVector.getUnit().mult(v1tf) , new Vector2d(1,0)) + Utils().getProjection(centralVector.getUnit().mult(v1rf) , new Vector2d(1,0))
           this.velocity.y = Utils().getProjection(tangentialVector.getUnit().mult(v1tf) , new Vector2d(0,1)) + Utils().getProjection(centralVector.getUnit().mult(v1rf) , new Vector2d(0,1))

           
           
           circle.velocity.y = Utils().getProjection(tangentialVector.getUnit().mult(v2tf) , new Vector2d(0,1)) + Utils().getProjection(centralVector.getUnit().mult(v2rf) , new Vector2d(0,1))
           circle.velocity.x = Utils().getProjection(tangentialVector.getUnit().mult(v2tf) , new Vector2d(1,0)) + Utils().getProjection(centralVector.getUnit().mult(v2rf) , new Vector2d(1,0))
        //    this.velocity.y = Utils().getProjection(v1tf , centralVector) + Utils().getProjection(v1rf , centralVector)
        //    console.log(Utils().getProjection(v1tf , tangentialVector))
        // console.log(v1tf)
        }
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2, false);
        c.fillStyle = "white";
        c.fill();
        c.lineWidth = 4;
        c.strokeStyle = "black";
        c.stroke()
        c.closePath();


        if(this.position.y + this.rad + this.velocity.y >= canvas.height){
            this.velocity.y = -Math.floor(this.velocity.y * this.bounciness)
        }
      
        // if(this.position.x - this.rad + this.velocity.x <= 0){
        //     this.velocity.x *= -1  
        // }
        // // if(this.position.x + this.rad + this.velocity.x >= canvas.width){
        // //     this.velocity.x *= -1  
        // // }
        // // if(this.position.y - this.rad + this.velocity.y <= 0){
        // //     this.velocity.y *= -1  
        // // }
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity
    }
}

const circle = new Circle()
circle.position.set(240 , 200)
circle.mass = 15
circle.rad = 30


const circle1 = new Circle()
circle1.position.set(270 , 30)
circle1.rad =30
circle1.mass = 10
circle1.collide(circle)


const animate = () => {
    c.fillStyle = "rgb(200,200,200)"
    c.fillRect(0,0,canvas.width , canvas.height)

circle.update()
circle1.update()
circle1.collide(circle)

    requestAnimationFrame(animate)
}

animate()