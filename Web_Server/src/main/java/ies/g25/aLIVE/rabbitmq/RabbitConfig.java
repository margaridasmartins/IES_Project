package ies.g25.aLIVE.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Binding.DestinationType;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public  class RabbitConfig {
     /*
    @Bean
    public DirectExchange exchange() {
        return new DirectExchange("logs");
    }


    @Bean
    public Queue queue() {
        return new Queue("health_data");
    }

       
        @Bean
        public Binding bindingSL(DirectExchange direct, 
            Queue  sugarLevelQueue){
            return BindingBuilder.bind(sugarLevelQueue)
                .to(direct)
                .with("sugar_level");
        }

        @Bean
        public Binding bindingBT(DirectExchange direct, 
            Queue bodyTemperatureQueue) {
            return BindingBuilder.bind(bodyTemperatureQueue)
                .to(direct)
                .with("body_temp");
        }

        @Bean
        public Binding bindingBP(DirectExchange direct, 
            Queue bloodPressureQueue) {
            return BindingBuilder.bind(bloodPressureQueue)
                .to(direct)
                .with("blood_pressure");
        }
        
    @Bean
    public Binding bindingHR() {
        return BindingBuilder.bind(queue())
            .to(exchange())
            .with("heart_beat");
    }

    @Bean
    public SensorReceiver receiver() {
        return new SensorReceiver();
    }
    */

}