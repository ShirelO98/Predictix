import threading
import time
from scripts.simulate_sensors import simulate_sensor_changes

def start_sensor_update_task():
    """
    function that starts a background task that updates the sensors every minute.
    """
    def run():
        while True:
            simulate_sensor_changes()  
            time.sleep(60) 

    thread = threading.Thread(target=run, daemon=True)  # create a new thread
    thread.start()
