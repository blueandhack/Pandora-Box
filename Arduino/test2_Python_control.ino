#define IN1  8
#define IN2  9
#define IN3  10
#define IN4  11

//******************* light *****************//
int PIN_LIGHT = 2;
int PIN_LIGHT2 = 3;
int PIN_WIND1 = 4; //ping 4, 5, 6, 7 and 12 bundle together for support enough power to motor
int PIN_WIND2 = 5;
int PIN_WIND3 = 6;
int PIN_WIND4 = 7;
int PIN_WIND5 = 12;

boolean LED_STATE = true;
char INPUT_VALUE = '.';
boolean PRE_STATE = LED_STATE;
//******************************************//

//********* door **********************//
boolean DOOR_STATE = true;
boolean PRE_DOOR_STATE = DOOR_STATE;
int Steps = 0;
boolean Direction = true;// gre
unsigned long last_time;
unsigned long currentMillis ;
int steps_left=10;
long time;
//********** wind *******************//
boolean WIND_STATE = true;
boolean PRE_WIND_STATE = WIND_STATE;
//**************************************//

void setup() {
  Serial.begin(9600);
  Serial.println("Serial Ready !");
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(12, OUTPUT);

  pinMode(IN1, OUTPUT); 
  pinMode(IN2, OUTPUT); 
  pinMode(IN3, OUTPUT); 
  pinMode(IN4, OUTPUT); 
  // put your setup code here, to run once:
}

void loop() {
  if(Serial.available() > 0){
    INPUT_VALUE = Serial.read();
  }
  
  if(INPUT_VALUE=='a'){//detect LED
    LED_STATE=true;
  }
  else if(INPUT_VALUE == 'b'){
    LED_STATE=false;
  }
  else if(INPUT_VALUE == 'c'){
    DOOR_STATE = true;
  }
  else if(INPUT_VALUE == 'd'){
    DOOR_STATE = false;
  }
  else if(INPUT_VALUE == 'e'){
    WIND_STATE = true;
  }
  else if(INPUT_VALUE == 'f'){
    WIND_STATE = false;
  }
  
  if(PRE_STATE != LED_STATE){
    if(LED_STATE){
      Serial.println("on");
    }
    else{
      Serial.println("off");
    }
  }
  
  if(LED_STATE){
    digitalWrite(PIN_LIGHT, HIGH);
    digitalWrite(PIN_LIGHT2,HIGH);
  }
  else{
    digitalWrite(PIN_LIGHT, LOW);
    digitalWrite(PIN_LIGHT2,LOW);
  }
//****************** DOOR ******************//
  if(PRE_DOOR_STATE != DOOR_STATE){
    PRE_DOOR_STATE = DOOR_STATE;
    Serial.print(DOOR_STATE);
    if(DOOR_STATE){
      Direction = true;
    }
    else{
      Direction = false;
    }
    doorAction();
  }
 //*****************************************//
 //***************** WIND ********************//
 if(PRE_WIND_STATE != WIND_STATE){
  PRE_WIND_STATE = WIND_STATE;
  Serial.print(WIND_STATE);
  if(WIND_STATE){
    digitalWrite(PIN_WIND1, HIGH);
    digitalWrite(PIN_WIND2, HIGH);
    digitalWrite(PIN_WIND3, HIGH);
    digitalWrite(PIN_WIND4, HIGH);
    digitalWrite(PIN_WIND5, HIGH);
  }
  else{
    digitalWrite(PIN_WIND1, LOW);
    digitalWrite(PIN_WIND2, LOW);
    digitalWrite(PIN_WIND3, LOW);
    digitalWrite(PIN_WIND4, LOW);
    digitalWrite(PIN_WIND5, LOW);
 }
  // put your main code here, to run repeatedly:
 }
}

void doorAction(){
   steps_left=1100;
   Serial.println("doorAction");
    while(steps_left>0){
      currentMillis = micros();
      if(currentMillis-last_time>=1000){
       stepper(1); 
       time=time+micros()-last_time;
       last_time=micros();
       steps_left--;
    }
  }
}

void stepper(int xw){
switch(Steps){
   case 0:
     digitalWrite(IN1, LOW); 
     digitalWrite(IN2, LOW);
     digitalWrite(IN3, LOW);
     digitalWrite(IN4, HIGH);
   break; 
   case 1:
     digitalWrite(IN1, LOW); 
     digitalWrite(IN2, LOW);
     digitalWrite(IN3, HIGH);
     digitalWrite(IN4, HIGH);
   break; 
   case 2:
     digitalWrite(IN1, LOW); 
     digitalWrite(IN2, LOW);
     digitalWrite(IN3, HIGH);
     digitalWrite(IN4, LOW);
   break; 
   case 3:
     digitalWrite(IN1, LOW); 
     digitalWrite(IN2, HIGH);
     digitalWrite(IN3, HIGH);
     digitalWrite(IN4, LOW);
   break; 
   case 4:
     digitalWrite(IN1, LOW); 
     digitalWrite(IN2, HIGH);
     digitalWrite(IN3, LOW);
     digitalWrite(IN4, LOW);
   break; 
   case 5:
     digitalWrite(IN1, HIGH); 
     digitalWrite(IN2, HIGH);
     digitalWrite(IN3, LOW);
     digitalWrite(IN4, LOW);
   break; 
     case 6:
     digitalWrite(IN1, HIGH); 
     digitalWrite(IN2, LOW);
     digitalWrite(IN3, LOW);
     digitalWrite(IN4, LOW);
   break; 
   case 7:
     digitalWrite(IN1, HIGH); 
     digitalWrite(IN2, LOW);
     digitalWrite(IN3, LOW);
     digitalWrite(IN4, HIGH);
   break; 
   default:
     digitalWrite(IN1, LOW); 
     digitalWrite(IN2, LOW);
     digitalWrite(IN3, LOW);
     digitalWrite(IN4, LOW);
   break; 
}
SetDirection();
} 

void SetDirection(){
if(Direction==1){ Steps++;}
if(Direction==0){ Steps--; }
if(Steps>7){Steps=0;}
if(Steps<0){Steps=7; }
}

