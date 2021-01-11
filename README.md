# IES_Project

## Project Abstract

### Title: **aLIVE**

### Description:

Monitoring of clinical and eldery care patients. 
Multiple patients at home can be followed by a team at the hospital.

---
## Project Team

Team Manager - [João Carvalho](https://github.com/joaocarvalho19) (NMEC: 89059)

Product Owner - [Pedro Bastos](https://github.com/bastos-01) (NMEC: 93150)

Architect - [Francisca Barros](https://github.com/itskikat/) (NMEC: 93102) e [Rui Fernandes](https://github.com/Rui-FMF) (NMEC: 92952)

DevOps - [Margarida Martins](https://github.com/margaridasmartins) (NMEC: 93169)

## API Docs

- http://localhost:8080/api/patients
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of Patients

<br>

- http://localhost:8080/api/patients
- <strong>method:</strong> POST
- <strong>args:</strong> patient
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/patients/{id}
- <strong>method:</strong> GET
- <strong>args:</strong> patient id
- <strong>returns:</strong> Patient

<br>

- http://localhost:8080/api/patients/{id}/picture
- <strong>method:</strong> POST
- <strong>args:</strong> Patient ID, image file
- <strong>returns:</strong> patient

<br>

- http://localhost:8080/api/patients/{id}/bloodpressure
- <strong>method:</strong> GET
- <strong>args:</strong> patient id
- <strong>returns:</strong> Patient blood pressure data

<br>

- http://localhost:8080/api/patients/{id}/heartrate
- <strong>method:</strong> GET
- <strong>args:</strong> patient id
- <strong>returns:</strong> Patient heart rate data

<br>

- http://localhost:8080/api/patients/{id}/sugarlevel
- <strong>method:</strong> GET
- <strong>args:</strong> patient id
- <strong>returns:</strong> Patient sugar level data

<br>

- http://localhost:8080/api/patients/{id}/bodytemperature
- <strong>method:</strong> GET
- <strong>args:</strong> patient id
- <strong>returns:</strong> Patient body temperature data

<br>

- http://localhost:8080/api/patients/{id}/latest
- <strong>method:</strong> GET
- <strong>args:</strong> patient id
- <strong>returns:</strong> Lastest patient data

<br>

- http://localhost:8080/api/professionals
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of Professionals

<br>

- http://localhost:8080/api/professionals/{id}/picture
- <strong>method:</strong> POST
- <strong>args:</strong> Professional ID, image file
- <strong>returns:</strong> Professional

<br>

- http://localhost:8080/api/professionals/{id}
- <strong>method:</strong> GET
- <strong>args:</strong> professionals id
- <strong>returns:</strong> Professional

<br>

- http://localhost:8080/api/professionals/{id}/patients
- <strong>method:</strong> GET
- <strong>args:</strong> professionals id
- <strong>returns:</strong> List of Professional patients

<br>

- http://localhost:8080/api/sensors
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of sensors

<br>

- http://localhost:8080/api/sensors/{id}
- <strong>method:</strong> GET
- <strong>args:</strong> sensor id
- <strong>returns:</strong> Sensor

<br>

- http://localhost:8080/api/sensors/ids
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of sensors ID

<br>

- http://localhost:8080/api/sensors/{id}/sugarlevel
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, sugar level value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/sensors/{id}/bodytemperature
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, body temperature value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/sensors/{id}/bloodpressure
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, blood pressure value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/sensors/{id}/heartrate
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, heart rate value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/data/sugarlevel
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of all sugar levels

<br>

- http://localhost:8080/api/data/sugarlevel/{id}
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, sugar level value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/data/heartrate
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of all heart rates

<br>

- http://localhost:8080/api/data/heartrate/{id}
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, heart rate value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/data/bloodpressure
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of all blood pressures

<br>

- http://localhost:8080/api/data/bloodpressure/{id}
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, blood pressure value
- <strong>returns:</strong> ok

<br>

- http://localhost:8080/api/data/bodytemperature
- <strong>method:</strong> GET
- <strong>args:</strong> null
- <strong>returns:</strong> List of all body temperatures

<br>

- http://localhost:8080/api/data/bodytemperature/{id}
- <strong>method:</strong> POST
- <strong>args:</strong> sensor id, body temperature value
- <strong>returns:</strong> ok

<br>