package ies.g25.aLIVE.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import ies.g25.aLIVE.exception.ResourceNotFoundException;
import ies.g25.aLIVE.model.HeartRate;
import ies.g25.aLIVE.repository.BloodPressureRepository;
import ies.g25.aLIVE.repository.BodyTemperatureRepository;
import ies.g25.aLIVE.repository.HeartRateRepository;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.SensorRepository;
import ies.g25.aLIVE.repository.SugarLevelRepository;
import ies.g25.aLIVE.restcontroller.SensorRestController;

public class SensorReceiver {

    @Autowired
    public SensorRepository sensorRepository;

    @Autowired
    public PatientRepository patientRepository;

    @Autowired
    public HeartRateRepository heartRateRepository;

    @Autowired
    public SugarLevelRepository sugarLevelRepository;

    @Autowired
    public BloodPressureRepository bloodPressureRepository;

    @Autowired
    public BodyTemperatureRepository bodyTemperatureRepository;

    @Autowired
    public SensorRestController controller = new SensorRestController(sensorRepository, patientRepository,
            heartRateRepository, sugarLevelRepository, bloodPressureRepository, bodyTemperatureRepository);

    @RabbitListener(queues = "heart_beat")
    public void receive1(String in) throws InterruptedException, ResourceNotFoundException {
        receive(in, 1);
    }

    @RabbitListener(queues = "sugar_level")
    public void receive2(String in) throws InterruptedException, ResourceNotFoundException {
        receive(in, 2);
    }

    @RabbitListener(queues = "blood_pressure")
    public void receive3(String in) throws InterruptedException, ResourceNotFoundException {
        receive(in, 3);
    }

    @RabbitListener(queues = "body_temp")
    public void receive4(String in) throws InterruptedException, ResourceNotFoundException {
        receive(in, 4);
    }

    public void receive(String in, int receiver) throws InterruptedException, ResourceNotFoundException {
        switch (receiver) {
            case 1:
                HeartRate hr = new HeartRate();
                hr.setHeartRate(Integer.parseInt(in));
                controller.createHeartrate(0, hr);
                break;

            case 2:
                
                break;

            case 3:
                
                break;

            case 4:
                
                break;
        
            default:
                break;
        }
    }

    private void doWork(String in) throws InterruptedException {
        for (char ch : in.toCharArray()) {
            if (ch == '.') {
                Thread.sleep(1000);
            }
        }
    }
    

    

}
