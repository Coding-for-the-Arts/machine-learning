class DrumKey {
    constructor(x, y, size, soundfile) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.soundfile = soundfile;
      this.color = color(255);
      this.isPlaying = false;
    }

    updatePosition(x,y) {
      this.x = x;
      this.y = y;
      this.display();
    }

    display() {
      fill(this.color)
      circle(this.x, this.y, this.size);
      fill(0);
      textSize(50)
      textAlign(CENTER, CENTER);
      let soundName = this.soundfile.file.split('/')[2];
      soundName = soundName.replace('.wav', '');
      text(soundName, this.x, this.y);
    }
  
    isHovered(mx, my) {
      let d = dist(mx, my, this.x, this.y);
      return d < this.size / 2;
    }
  
    playSound() {
      if (!this.isPlaying) { 
        console.log("playing sound");
        this.isPlaying = true; 
        this.color = color(100); 
        setTimeout(() => {
          this.color = color(255); 
          this.isPlaying = false;
        }, 200); 
        this.soundfile.play();
      }
    }
}
