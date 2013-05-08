int ledPin = 13;
int buttonPin = 22;
boolean isDown = false;
boolean isHold = false;
boolean isUp = false;
unsigned long lastTimer = 0;
int holdInterval = 1000;
int clickInterval = 5;

void setup() {
  pinMode(ledPin, OUTPUT); 
  pinMode(buttonPin, INPUT);
  ledOn();
  delay(50);
  ledOff();
  delay(150);
  ledOn();
  delay(50);
  ledOff();
}

void ledOn() {
  digitalWrite(ledPin, HIGH);
}

void ledOff() {
  digitalWrite(ledPin, LOW);
}

void leftClick(){
  Mouse.set_buttons(1, 0, 0);
  delay(clickInterval);
  Mouse.set_buttons(0, 0, 0);
}

void rightClick(){
  Mouse.set_buttons(0, 0, 1);
  delay(clickInterval);
  Mouse.set_buttons(0, 0, 0);
}

void onClick(){
  ledOn();
  leftClick();
}

void onHold(){
  ledOn();
  rightClick();
}

void onUp(){
  ledOff();
}

void loop() {
  unsigned long currentTimer = millis();
  
  int btn = digitalRead(buttonPin);

  // button is down  
  if (btn == 1){
    
    // if don't know it's down
    if (isDown == false && isHold == false){
      // then set the state to know it's down
      // and turn on the LED
      isDown = true; 
      isHold = false;
      isUp = false;
      lastTimer = millis();
    }
   
    if (currentTimer - lastTimer > holdInterval){
      
      if (isHold == false){
        isHold = true;
        isDown = false;
        isUp = false;
        onHold();
      }
      
    }
    
  } else {
    
    if (isDown){
      onClick();
    }
    
    isDown = false;
    isHold = false;
    isUp = true;
    
    onUp();
  }
}
