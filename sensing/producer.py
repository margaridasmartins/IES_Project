#!/usr/bin/env python
import pika
import sys
import argparse
import numpy as np
import json

#---------------------------------------------------------------------

class Generator:

    def __init__(self, heartbeat):
        self.hearbeat = heartbeat
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        self.channel.exchange_declare(exchange='logs', exchange_type='fanout')

    def gen_heart_beats(self, heartbeat):
        mu = heartbeat
        sigma = 10.0
        x = 0
        while x < 10:
            hb = np.random.randn(1) * sigma + mu
            json_text = {'heartbeat': float(hb)}
            self.channel.basic_publish(exchange='logs', routing_key='', body= json.dumps(json_text))
            x+=1

    def gen_blood_pressure(self):
        systolic_mu = 130
        diastolic_mu = 85
        sigma = 20.0
        x = 0
        while x < 10:
            systolic = np.random.randn(1) * sigma + systolic_mu
            diastolic = np.random.randn(1) * sigma + diastolic_mu
            if ((systolic - diastolic) > 30) and (systolic > 90) and (diastolic > 50):
                json_text = {'systolic': float(systolic), 'diastolic': float(diastolic)}
                self.channel.basic_publish(exchange='logs', routing_key='', body= json.dumps(json_text))
                x+=1
    
    def gen_body_temp(self):
        mu = 37
        sigma = 1.0
        x = 0
        while x < 10:
            temperature = np.random.randn(1) * sigma + mu
            if(34 < temperature < 42):
                json_text = {'temperature': float(temperature)}
                self.channel.basic_publish(exchange='logs', routing_key='', body= json.dumps(json_text))
                x+=1
    
    def gen_sugar_level(self):
        before_mu = 5.0
        after_mu = 6.9
        sigma = 1.0
        x = 0
        while x < 10:
            before = np.random.randn(1) * sigma + before_mu
            after = np.random.randn(1) * sigma + after_mu
            if(4 < before < 5.9) and (6 < after < 7.8):
                json_text = {'after': float(after), 'before': float(before)}
                self.channel.basic_publish(exchange='logs', routing_key='', body= json.dumps(json_text))
                x+=1


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--hb", help="Normal heart beat", type=int, default=80)

    args = parser.parse_args()

    g = Generator(args.hb)

    g.gen_heart_beats(g.hearbeat)
    g.gen_blood_pressure()
    g.gen_body_temp()
    g.gen_sugar_level()