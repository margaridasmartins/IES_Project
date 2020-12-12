package ies.g25.aLIVE.rabbitmq;

import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    /*
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange("logs");
    }

    @Profile("receiver")
    private static class ReceiverConfig {



        @Bean
        public Queue sugarLevelQueue() {
            return new Queue("health_data");
        }

        @Bean
        public Queue bodyTemperatureQueue() {
            return new Queue("health_data");
        }

        @Bean
        public Queue bloodPressureQueue() {
            return new Queue("health_data");
        }

        @Bean
        public Queue heartRateQueue() {
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
        public Binding bindingHR(DirectExchange direct, 
            Queue heartRateQueue) {
            return BindingBuilder.bind(heartRateQueue)
                .to(direct)
                .with("heart_beat");
        }

        @Bean
        public SensorReceiver receiver() {
            return new SensorReceiver();
        }
    }
    */

}