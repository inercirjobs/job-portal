from django.core.management.base import BaseCommand
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from core.models import User, Job
from datetime import timedelta
import pytz

class Command(BaseCommand):
    help = 'Send daily job alerts to users based on matching skills'

    def handle(self, *args, **kwargs):
        ist = pytz.timezone('Asia/Kolkata')
        today = timezone.now().astimezone(ist).date()

        # Get jobs posted in the last 24 hours
        last_24_hours = timezone.now() - timedelta(days=1)
        jobs = Job.objects.filter(created_at__gte=last_24_hours)

        if not jobs.exists():
            self.stdout.write("No new jobs to notify.")
            return

        users = User.objects.filter(role='user', is_active=True).exclude(email__isnull=True).exclude(email='')

        for user in users:
            if not user.skills:
                continue

            user_skills = [skill.strip().lower() for skill in user.skills.split(',') if skill.strip()]
            matched_jobs = []

            for job in jobs:
                job_skills = [skill.strip().lower() for skill in job.skills.split(',') if skill.strip()]
                if set(job_skills) & set(user_skills):
                    matched_jobs.append(job)

            if matched_jobs:
                # Build message
                job_list_html = "".join([
                    f"""
                    <div style="margin-bottom: 15px;">
                        <h3>{job.title}</h3>
                        <p><strong>Company:</strong> {job.created_by.company_name or "N/A"}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Skills:</strong> {job.skills}</p>
                        <p><strong>Apply by:</strong> {job.application_deadline}</p>
                        <a href="https://www.incirclejobs.com/job/{job.id}" style="color: blue;">View Job</a>
                    </div>
                    """ for job in matched_jobs
                ])

                html_message = f"""
                <html>
                <body>
                    <p>Hi {user.full_name},</p>
                    <p>Here are some new jobs matching your skills:</p>
                    {job_list_html}
                    <p>Best regards,<br/>IncircleJobs Team</p>
                </body>
                </html>
                """

                send_mail(
                    subject="🔥 Daily Job Alert - New Jobs Matching Your Skills",
                    message="",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    fail_silently=True,
                    html_message=html_message
                )

        self.stdout.write(self.style.SUCCESS("✅ Daily job alerts sent."))
