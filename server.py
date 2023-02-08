import network
import urequests
import utime
import ujson
from machine import Pin, I2C
from lcd_api import LcdApi
from pico_i2c_lcd import I2cLcd

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

ssid = 'Redmi_Felix'
password = '12345678'
wlan.connect(ssid, password)

I2C_ADDR = 0x27
I2C_NUM_ROWS = 2
I2C_NUM_COLS = 16
i2c = I2C(0, sda=machine.Pin(0), scl=machine.Pin(1), freq=400000)
lcd = I2cLcd(i2c, I2C_ADDR, I2C_NUM_ROWS, I2C_NUM_COLS)
lcd.backlight_on()

url = "http://192.168.168.234:3000/school"

while wlan.isconnected():
    try:
        print("GET")
        r = urequests.get(url)
        json_response = r.json() # Décompressez la réponse en JSON
        tableau = json_response["data"]
        print(tableau)
        if r.status_code == 200:
            data = r.json()
            lcd.clear()
            lcd.putstr(str(tableau))
        else:
            print("Request failed with status code {}".format(r.status_code))
        r.close()
        utime.sleep(1)
    except Exception as e:
        print("Error: {}".format(e))
        lcd.clear()
        lcd.putstr("Error")
        # retry after a certain amount of time
        utime.sleep(5)
