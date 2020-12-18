FROM python:3.8
WORKDIR /usr/src/app
COPY . .
RUN python3 -m pip install pika
RUN python3 -m pip install numpy

ADD wait-for-it.sh /
RUN chmod u+x ./wait-for-it.sh

CMD ["./wait-for-it.sh","https://web-server:8080","--","python3","producer.py"]
