package ies.g25.aLIVE.rabbitmq;

import org.json.JSONArray; 
import org.json.JSONObject;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import ies.g25.aLIVE.exception.ResourceNotFoundException;
import ies.g25.aLIVE.model.BloodPressure;
import ies.g25.aLIVE.model.BodyTemperature;
import ies.g25.aLIVE.model.HeartRate;
import ies.g25.aLIVE.model.SugarLevel;
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
                JSONObject jo = new JSONObject(in);
                String val = (String) jo.get("heartbeat"); 
                HeartRate hr = new HeartRate();
                hr.setHeartRate(Integer.parseInt(val));
                controller.createHeartrate(1, hr);
                break;

            case 2:
                /*
                SugarLevel sl = new SugarLevel();
                sl.setSugarLevel(Double.parseDouble(in));
                controller.createSugarLevel(1, sl);
                */
                break;


            case 3:
                /*
                BloodPressure bp = new BloodPressure();
                String[] val = in.split("-");
                bp.setHigh_value(Double.parseDouble(val[0]));
                bp.setLow_value(Double.parseDouble(val[1]));
                controller.createBloodPressure(1, bp);
                */
                break;

            case 4:
                /*
                BodyTemperature bt = new BodyTemperature();
                bt.setbodyTemp(Double.parseDouble(in));
                controller.createBodyTemperature(1, bt);
                */
                break;
        
            default:
                break;
        }
    }


}
