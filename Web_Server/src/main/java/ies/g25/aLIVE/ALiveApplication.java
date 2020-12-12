package ies.g25.aLIVE;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Binding.DestinationType;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication()
@EnableRabbit
public class ALiveApplication {

	public static void main(String[] args) {
		SpringApplication.run(ALiveApplication.class, args);
	}

	@Bean
    public Queue queue() {
        return new Queue("health_data");
    }
	
	@Bean
    public Binding binding() {
        return new Binding("health_data", DestinationType.QUEUE, "logs", "heart_beat", null);
    }

    @RabbitListener(queues = "health_data")
    public void listener(String in) {
        System.out.println(in);
    }

}
