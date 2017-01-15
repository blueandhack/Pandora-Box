import serial
import requests
import json
from time import sleep


usbport = 'COM3'


ser = serial.Serial(usbport, 9600)

PRE_LEDinput = b'c'
PRE_DOORinput = b'a'
PRE_WINDinput = b'b'

while 1 :
        # For LED light******************* #
        LED_URL = requests.get("https://alexa.blueandhack.com/api/light/status")
        LED_JSON = json.loads(LED_URL.content)
        LEDstatue = LED_JSON['status']
        
        if LEDstatue == 'on' :
                LEDinput = b'a'
        else :
                LEDinput = b'b'


        if PRE_LEDinput != LEDinput :
                if LEDinput == b'a':
                        print("on")
                else :
                        print("off")
                PRE_LEDinput = LEDinput
        
        if ser.writable() :
                ser.write(LEDinput)
        #************************************#
        # For DOOR **************************#

        DOOR_URL = requests.get("https://alexa.blueandhack.com/api/door/status")
        DOOR_JSON = json.loads(DOOR_URL.content)
        DOORstatue = DOOR_JSON['door']

        if DOORstatue == 'open' :
                DOORinput = b'c'
        else :
                DOORinput = b'd'

        if PRE_DOORinput != DOORinput :
                if DOORinput == b'c' :
                        print("door opend")
                else :
                        print("door closed")
                PRE_DOORinput = DOORinput

        if ser.writable() :
                ser.write(DOORinput)
        #***********************************#
        #******For WIND *********************#
        WIND_URL = requests.get("https://alexa.blueandhack.com/api/fan/status")
        WIND_JSON = json.loads(WIND_URL.content)
        WINDstate = WIND_JSON['fan']

        if WINDstate == 'on' :
                WINDinput = b'e'
        else :
                WINDinput = b'f'

        if PRE_WINDinput != WINDinput :
                if WINDinput == b'e' :
                        print("wind opend")
                else :
                        print("wind closed")
                PRE_WINDinput  = WINDinput

        if ser.writable() :
                ser.write(WINDinput)
        #*************************************#
