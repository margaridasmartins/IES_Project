#!/usr/bin/env python
import pika
import sys
import argparse
import numpy as np
import json
import time
import asyncio

#---------------------------------------------------------------------

class Generator:

    def __init__(self, heartbeat):
        self.hearbeat = heartbeat
        # rabbit connections
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()

    async def gen_heart_beats(self, heartbeat=80):
        mu = heartbeat
        sigma = 10.0

        while True:
            hb = np.random.randn(1) * sigma + mu
            json_text = {'id': 1, 'heartbeat': float(hb)}
            self.channel.basic_publish(exchange='logs', routing_key='heart_beat', body= json.dumps(json_text))
            await asyncio.sleep(2)

    async def gen_blood_pressure(self):
        systolic_mu = 130
        diastolic_mu = 85
        sigma = 20.0

        while True:
            systolic = np.random.randn(1) * sigma + systolic_mu
            diastolic = np.random.randn(1) * sigma + diastolic_mu
            
            json_text = {'id': 1, 'systolic': float(systolic), 'diastolic': float(diastolic)}
            self.channel.basic_publish(exchange='logs', routing_key='blood_pressure', body= json.dumps(json_text))
            await asyncio.sleep(2)
    
    async def gen_body_temp(self):
        mu = 37
        sigma = 1.0

        while True:
            temperature = np.random.randn(1) * sigma + mu
        
            json_text = {'id': 1, 'temperature': float(temperature)}
            self.channel.basic_publish(exchange='logs', routing_key='body_temp', body= json.dumps(json_text))
            await asyncio.sleep(2)
    
    async def gen_sugar_level(self):
        before_mu = 5.0
        after_mu = 6.9
        sigma = 1.0

        while True:
            before = np.random.randn(1) * sigma + before_mu
            after = np.random.randn(1) * sigma + after_mu

            json_text = {'id': 1, 'after': float(after), 'before': float(before)}
            self.channel.basic_publish(exchange='logs', routing_key='sugar_level', body= json.dumps(json_text))
            await asyncio.sleep(2)



if __name__ == "__main__":

    # arguments (maybe)
    parser = argparse.ArgumentParser()
    # normal heart beat argument
    parser.add_argument("--hb", help="Normal heart beat", type=int, default=80)
    args = parser.parse_args()
    
    # generator class
    g = Generator(args.hb)


    # asyncio to send all at once
    #loop
    loop = asyncio.get_event_loop()

    #tasks
    hb_task = loop.create_task(g.gen_heart_beats())
    bp_task = loop.create_task(g.gen_blood_pressure())
    bt_task = loop.create_task(g.gen_body_temp())
    sl_task = loop.create_task(g.gen_sugar_level())

    # run them
    loop.run_until_complete(asyncio.gather(hb_task, bp_task, bt_task, sl_task))

    #loop close
    loop.close()

