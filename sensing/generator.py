import argparse
import numpy as np

class Generator:

    def __init__(self, heartbeat):
        self.hearbeat = heartbeat

    def gen_heart_beats(self, heartbeat):
        mu = heartbeat
        sigma = 10.0

        while True:
            hb = np.random.randn(1) * sigma + mu
            print(hb)

    def gen_blood_pressure(self):
        systolic_mu = 130
        diastolic_mu = 85
        sigma = 20.0

        while True:
            systolic = np.random.randn(1) * sigma + systolic_mu
            diastolic = np.random.randn(1) * sigma + diastolic_mu
            if ((systolic - diastolic) > 30) and (systolic > 90) and (diastolic > 50):
                print(systolic , " ----- " , diastolic)
    
    def gen_body_temp(self):
        mu = 37
        sigma = 1.0

        while True:
            temperature = np.random.randn(1) * sigma + mu
            if(34 < temperature < 42):
                print(temperature)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--hb", help="Normal heart beat", type=int, default=80)

    args = parser.parse_args()

    g = Generator(args.hb)

    #g.gen_heart_beats(g.hearbeat)
    #g.gen_blood_pressure()
    #g.gen_body_temp()