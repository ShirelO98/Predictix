import schedule
import time
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'predictix.settings')
django.setup()

from scripts.simulate_sensors import simulate_sensor_changes 

def job():
    """
    function that runs the sensor update job.
    """
    print("Running sensor update job...")
    simulate_sensor_changes()
    print("Sensor data updated successfully.")

# runs the `job` function every minute
schedule.every(1).minutes.do(job)  

def run_scheduler():
    """
    function that runs the scheduler.
    """
    print("Starting the scheduler...")
    try:
        while True:
            schedule.run_pending()
            time.sleep(1)
    except KeyboardInterrupt:
        print("Scheduler stopped.")

if __name__ == "__main__":
    run_scheduler()
