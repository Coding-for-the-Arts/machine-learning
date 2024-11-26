class BodyPoint {
    constructor(x, y, confidence, id) {
        this.x = x
        this.y = y
        this.confidence = confidence
        this.id = id
        this.size = 10
        this.color = "#34eb49"
    }

    drawKeypoint(){
        if( this.confidence > 0.1){
            fill(255)
            noStroke()
            ellipse(this.x, this.y, this.size, this.size)
            textSize(this.size)
            fill(this.color)
            text(this.id, this.x + 20, this.y - 20)
        }
    }

    static drawSkeleton(pointA, pointB) {
    if (pointA.confidence > 0.1 && pointB.confidence>0.1){
        stroke(255)
        strokeWeight(this.size/5)
        line(pointA.x, pointA.y, pointB.x, pointB.y)
        }
    }

}