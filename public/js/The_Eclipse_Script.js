void setup(){  
  size(1800,1000); fill(0,0,255);
  boolean dev   = false;
  boolean info  = false;
} 

void draw(){ noStroke();
  background(255,255,255);  fill(20,20,20);


  //Top Hull
  quad(1650,475, 1050, 420, 570, 475, 570, 500 );
  /*Coverer*/ rect(593, 473, 1100, 53);
  
  
  fill (150,150,150); quad(1090, 423,  1065, 405,   570, 460,  570, 480 ); rect(100,460, 475,19);
  /*Reverter*/ fill (20,20,20);
  rect(100,479, 495,25);
 
  //Midhull
  ellipse(1690,480,110,40);
  fill(150,150,150); rect(100, 500, 1600, 20);
  /*Reverter*/ fill (20,20,20); 
            
  // Bottom Hull
  quad(100,520, 1200,520, 1200,620, 200, 680);
  rect (1200, 520, 470, 100);
  
  //quad (860, 450,   1060, 520,   1080, 490,   1220, 450);
  
  ellipse(1200, 500, 50, 50);
  quad (1200, 600, 1700, 520, 1630, 780, 1590, 800);
  
  /*Eraser*/ fill(255,255,255); noStroke(); ellipse(1620,808,56,50);
  /*Reverter*/ fill (20,20,20);
  
  /*"Map"*/ text(mouseX,200,280); text(mouseY, 250, 280); 

}
// https://processing.org/examples/continuouslines.html