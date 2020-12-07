import argparse
import numpy as np

class Generator:

    def __init__(self, heartbeat):
        self.hearbeat = heartbeat

    def gen_heart_beats(self, heartbeat):
        mu = heartbeat
        sigma = 10.0

        while True:
            data = data = np.random.randn(1) * sigma + mu
            print(data)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--hb", help="Normal heart beat", type=int, default=80)

    args = parser.parse_args()

    g = Generator(args.hb)

    g.gen_heart_beats(g.hearbeat)