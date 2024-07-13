export class Vector2d {
    constructor(x,y){
        this.x = x
        this.y = y
        this.mag = Math.sqrt(Math.abs(x*x) + Math.abs(y*y))
    }
    set(x,y){
        this.x = x
        this.y = y
    }
    add(v){
        return new Vector2d(this.x + v.x , this.y + v.y)
    }
    mult(m){
       return new Vector2d(this.x*m  , this.y*m)
    }
    copy(v){
        this.x = v.x
        this.y = v.y
    }
    getMag(){
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
    getUnit(){
        return new Vector2d(
            this.x/this.mag,
            this.y/this.mag,
        )
    }
}

export function Utils () {
    function sub(v1 , v2){
        return new Vector2d(v2.x - v1.x,
        v2.y - v1.y
        )
       } 

       function dist(v1 , v2){
        return Math.sqrt(((v1.x-v2.x)*(v1.x-v2.x)) +((v1.y-v2.y)*(v1.y-v2.y)) )
       }
       function getNormal(v){
        return new Vector2d(-v.y , v.x)
       }

       function dot(v1 , v2){
        let a = (v1.x*v2.x + v1.y*v2.y)
        return a
       }

       function getProjection(v1,v2){
        //projection of v1 on v2
        console.log(v1 , v2)
        return ((v1.x*v2.x + v1.y*v2.y))/v2.getMag()
       }

       function distPointToLine (point , m , k) {
        //y = mx + k => y-mx-k = 0 ;
        let denom = Math.sqrt(m*m + 1)
        let num = Math.abs(point.y - m*point.x - k)

        return num/denom
       }

       function rotateAxes({point , pivot , angle}) {
        //Using rotation of axes using matrices
        let c = Math.cos(angle)
        let s = Math.sin(angle)

        let rp = sub(point , pivot)
        let vec = new Vector2d(0,0)
        vec.x = rp.x * c + rp.y*s  + point.x
        vec.y = -rp.x * s + rp.y*c + point.y

        return vec
       }

       

       function getPolarCoords (pivot ,length , angle){
        let a = new Vector2d(length * Math.cos(angle),length * Math.sin(angle))
        let r = new Vector2d(a.x + pivot.x , a.y + pivot.y)
        return r
       }
    return {
       sub:sub,
       dist:dist,
       distPointToLine:distPointToLine,
       rotateAxes:rotateAxes,
       getPolarCoords:getPolarCoords,
       dot:dot,
       getProjection:getProjection,
       getNormal:getNormal
    }
}