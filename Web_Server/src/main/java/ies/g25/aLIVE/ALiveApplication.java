package ies.g25.aLIVE;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication()
@EnableRabbit
public class ALiveApplication {

	public static void main(String[] args) {
		SpringApplication.run(ALiveApplication.class, args);
	}

}
