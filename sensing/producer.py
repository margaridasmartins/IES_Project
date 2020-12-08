#!/usr/bin/env python
import pika
import sys
import argparse
import numpy as np

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
            self.channel.basic_publish(exchange='logs', routing_key='', body="Heart beats per minute: " + str(hb))
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
                self.channel.basic_publish(exchange='logs', routing_key='', body="Blood pressure per minute: " + str(systolic) + " - " + str(diastolic))
            x+=1
    
    def gen_body_temp(self):
        mu = 37
        sigma = 1.0
        x = 0
        while x < 10:
            temperature = np.random.randn(1) * sigma + mu
            if(34 < temperature < 42):
                self.channel.basic_publish(exchange='logs', routing_key='', body="Body temperature per minute: " + str(temperature))
            x+=1


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--hb", help="Normal heart beat", type=int, default=80)

    args = parser.parse_args()

    g = Generator(args.hb)

    g.gen_heart_beats(g.hearbeat)
    g.gen_blood_pressure()
    g.gen_body_temp()