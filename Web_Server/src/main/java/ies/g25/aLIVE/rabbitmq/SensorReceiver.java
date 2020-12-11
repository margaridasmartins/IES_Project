package ies.g25.aLIVE.rabbitmq;
//https://stackoverflow.com/questions/49512910/how-to-create-a-spring-boot-rabbitmq-consumer-for-a-python-sender
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.util.StopWatch;

public class SensorReceiver {

    @RabbitListener(queues = "#{sugarLevelQueue.name}")
    public void receive1(String in) throws InterruptedException {
        receive(in, 1);
    }

    @RabbitListener(queues = "#{bodyTemperatureQueue.name}")
    public void receive2(String in) throws InterruptedException {
        receive(in, 2);
    }

    @RabbitListener(queues = "#{heartRateQueue.name}")
    public void receive3(String in) throws InterruptedException {
        receive(in, 3);
    }

    @RabbitListener(queues = "#{bloodPressureQueue.name}")
    public void receive4(String in) throws InterruptedException {
        receive(in, 4);
    }

    public void receive(String in, int receiver) throws InterruptedException {
        StopWatch watch = new StopWatch();
        watch.start();
        System.out.println("instance " + receiver + " [x] Received '" + in + "'");
        doWork(in);
        watch.stop();
        System.out.println("instance " + receiver + " [x] Done in " + 
            watch.getTotalTimeSeconds() + "s");
    }

    private void doWork(String in) throws InterruptedException {
        for (char ch : in.toCharArray()) {
            if (ch == '.') {
                Thread.sleep(1000);
            }
        }
    }

}
