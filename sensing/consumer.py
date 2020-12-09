#!/usr/bin/env python
import pika
import requests
import time

url_heart = 'http://localhost:8080/api/data/heartrate/1'
url_temp = 'http://localhost:8080/api/data/bodytemperature/1'
url_blood = 'http://localhost:8080/api/data/bloodpressure/1'
url_sugar = 'http://localhost:8080/api/data/sugarlevel/1'

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='direct')

result = channel.queue_declare(queue='health_data', exclusive=True)
queue_name = result.method.queue

channel.queue_bind(exchange='logs', queue=queue_name, routing_key="heart_beat")
channel.queue_bind(exchange='logs', queue=queue_name, routing_key="blood_pressure")
channel.queue_bind(exchange='logs', queue=queue_name, routing_key="body_temp")

print(' [*] Waiting for logs. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print(" [x] %r" % body)
    if method.routing_key == "heart_beat":
    	time.sleep(0.2)
    	requests.post(url_heart,json={"heartRate":body.decode()})
    elif method.routing_key == "blood_pressure":
    	b=body.decode().split("-")
    	requests.post(url_blood,json={"low_value":b[1], "high_value":b[0]})
    elif method.routing_key == "body_temp":
    	b= body.decode()
    	requests.post(url_temp, json={"bodyTemp":b})

channel.basic_consume(
    queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
