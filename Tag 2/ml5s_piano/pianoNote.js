class PianoKey {
    constructor(x, y, w, h, note) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.note = note;
      this.color = color(255);
    }
  
    display() {
      fill(this.color)
      stroke(0);
      rect(this.x, this.y, this.w, this.h);
      fill(0);
      textSize(50)
      textAlign(CENTER, CENTER);
      text(this.note, this.x + this.w / 2, this.y + this.h / 2);
    }
  
    isHovered(mx, my) {
      return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }
  
    playNote() {
      this.color = color(100); // Highlight key
      setTimeout(() => (this.color = color(255)), 200); // Reset color
      // synth.play(note, velocity, time, dur);
      synth.play(this.note + "4", 1, 0, 0.001); // keep the duration at 0
    }
  }

