package ies.g25.aLIVE.rabbitmq;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
public class SensorReceiver {



    @RabbitListener(queues = "heart_beat")
    public void receive1(String in) throws InterruptedException {
        receive(in, 1);
    }

    @RabbitListener(queues = "sugar_level")
    public void receive2(String in) throws InterruptedException {
        receive(in, 2);
    }

    @RabbitListener(queues = "blood_pressure")
    public void receive3(String in) throws InterruptedException {
        receive(in, 3);
    }
    
    @RabbitListener(queues = "body_temp")
    public void receive4(String in) throws InterruptedException {
        receive(in, 4);
    }
    
    public void receive(String in, int receiver) throws InterruptedException {
        System.out.println("instance " + receiver + " [x] Received '" + in + "'");
        doWork(in);
        System.out.println("instance " + receiver + " [x] Done in ");
    }

    private void doWork(String in) throws InterruptedException {
        for (char ch : in.toCharArray()) {
            if (ch == '.') {
                Thread.sleep(1000);
            }
        }
    }
    

    

}
