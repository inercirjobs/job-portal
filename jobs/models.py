from django.db import models
from users.models import CustomUser  # import your custom user model

class Job(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    job_type = models.CharField(max_length=50)
    salary = models.CharField(max_length=100)
    description = models.TextField()
    posted_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

#  Add Application model below Job to apply jobs
class Application(models.Model):
    applicant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(blank=True)

    def __str__(self):
        return f"{self.applicant.email} -> {self.job.title}"
