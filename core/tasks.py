from celery import shared_task
from django.core.management import call_command

@shared_task
def run_daily_job_alerts():
    call_command("send_daily_job_alerts")
