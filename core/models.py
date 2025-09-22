from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.conf import settings
from django.utils import timezone


import secrets
import string

def generate_custom_user_id():
    # chars = string.ascii_letters + string.digits + "-_.~!$'()*@"
    chars = string.ascii_letters + string.digits 
    random_id = ''.join(secrets.choice(chars) for _ in range(10))
    return f"user{random_id}"



class User(AbstractUser):
    
    VERIFICATION_STATUS = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
    ]
    # PLAN_CHOICES = [
    #     ('free', 'Free'),
    #     ('legend', 'Legend'),
    #     ('ultra-legend', 'Ultra Legend'),
    #     # add more plans as needed
    # ]
    id = models.CharField(
        primary_key=True,
        default=generate_custom_user_id,
        editable=False,
        max_length=20,
        unique=True
    )
    ROLE_CHOICES = [
        ('user', 'Job Seeker'),
        ('hr', 'Company/HR'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True) 
    # Inside your User model
    image = models.URLField(blank=True, null=True)

    resume = models.URLField(max_length=1000,blank=True, null=True)
    resume_key = models.CharField(max_length=255, blank=True, null=True)
    # Job Seeker specific fields
    skills = models.TextField(blank=True, null=True, help_text="Comma separated skills")
    experience = models.CharField(max_length=50, blank=True, null=True)
    # resume = models.FileField(upload_to='resumes/', blank=True, null=True)

    # resume = models.URLField(blank=True, null=True ,default="https://claude.ai/chat/2862ceeb-0272-42b6-8740-fb3855822d7d")
    location = models.TextField(blank=True, null=True,default="default location")
    plan = models.CharField(max_length=20, default='free')
    subscribe_date = models.DateTimeField(blank=True, null=True)
    
    # Company/HR specific fields
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True,default="update bio here")
    company_type = models.CharField(max_length=255, blank=True, null=True)
    
    website = models.URLField(blank=True, null=True)
    is_verified = models.CharField(
        max_length=10,
        choices=VERIFICATION_STATUS,
        default='pending'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    class Meta:
        db_table = 'users'





class Payment_PG(models.Model):
    STATUS_CHOICES = [
        ("initiated", "Initiated"),
        ("paid", "Paid"),
        ("failed", "Failed"),
    ]

    user = models.ForeignKey('User', on_delete=models.CASCADE)
    plan = models.CharField(max_length=20, null=True)
    amount = models.FloatField( null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="initiated")
    order_id = models.CharField(max_length=100, unique=True, null=True)
    payment_session_id = models.CharField(max_length=255, blank=True, null=True)
    payment_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f"{self.user.email} - {self.plan} - {self.status}"


class AdminUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
    department = models.CharField(max_length=100, blank=True)
    permissions = models.JSONField(default=dict)
    
    def __str__(self):
        return f"Admin: {self.user.username}"

def generate_custom_contact_id():
    chars = string.ascii_letters + string.digits + "-_.~!$'()*@"
    random_id = ''.join(secrets.choice(chars) for _ in range(10))
    return f"contact_{random_id}"

   
class Contact(models.Model):
    
    INQUIRY_TYPE = [
        ('general-inquiry', 'General Inquiry'),
        ('technical-support', 'Technical Support'),
        ('billing-question', 'Billing Question'),
        ('job-seeker-help', 'Job Seeker Help'),
        ('employer-support', 'Employer Support'),
        ('complaint', 'Complaint'),
        ('feedback', 'Feedback'),
        
        # add more as needed
    ]
    id = models.CharField(
        primary_key=True,
        default=generate_custom_contact_id,
        editable=False,
        max_length=20,
        unique=True
    )
    # user = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField() 
    phone = models.CharField(max_length=15, blank=True, null=True)
    inquiry = models.CharField(max_length=100, choices=INQUIRY_TYPE)
    subject = models.CharField(max_length=255, blank=True)
    message = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    
    def __str__(self):
        return f"Admin: {self.subject}" 
    
def generate_custom_job_id():
    chars = string.ascii_letters + string.digits + "-_.~!$'()*@"
    random_id = ''.join(secrets.choice(chars) for _ in range(10))
    return f"job_{random_id}"

class JobManager(models.Manager):
    def get_queryset(self):
        # Return queryset without mutating data to avoid recursion
        return super().get_queryset()

    def close_expired_jobs(self):
        from django.utils import timezone
        expired_jobs = self.filter(
            application_deadline__lt=timezone.now().date(),
            status='active'
        )
        expired_jobs.update(status='closed')

class Job(models.Model):
    JOB_TYPES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('freelance', 'Freelance'),
        ('test', 'test'),
    ]

    WORK_ARRANGEMENTS = [
        ('on_site', 'On-Site'),
        ('remote', 'Remote'),
        ('hybrid', 'Hybrid'),
    ]

    EXPERIENCE_LEVELS = [
        ('entry', 'Entry Level'),
        ('mid', 'Mid Level'),
        ('senior', 'Senior Level'),
        ('manager', 'Manager'),
        ('director', 'Director'),
        
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('closed', 'Closed'),
    ]

    CURRENCY_CHOICES = [
        ('USD', 'USD'),
        ('EUR', 'EUR'),
        ('INR', 'INR'),
        ('GBP', 'GBP'),
        # add more as needed
    ]

    id = models.CharField(
        primary_key=True,
        default=generate_custom_job_id,
        editable=False,
        max_length=20,
        unique=True
    )
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=50, choices=JOB_TYPES)
    work_arrangement = models.CharField(max_length=50, choices=WORK_ARRANGEMENTS)
    experience_level = models.CharField(max_length=50, choices=EXPERIENCE_LEVELS)

    min_salary = models.CharField(max_length=50, blank=True, null=True)
    max_salary = models.CharField(max_length=50, blank=True, null=True)
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES)
    education = models.CharField(max_length=255, blank=True, null=True)

    description = models.TextField()
    responsibilities = models.TextField(help_text="List one responsibility per line")
    requirements = models.TextField(help_text="List one requirement per line")
    skills = models.TextField(help_text="Comma-separated skills")
    benefits = models.TextField(blank=True, null=True, help_text="List one benefit per line")

    application_deadline = models.DateField()
    is_urgent = models.BooleanField(default=False)
    is_remote = models.BooleanField(default=False)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    application_count = models.PositiveIntegerField(default=0)

    # Use the custom manager
    objects = JobManager()

    @property
    def is_expired(self):
        return self.application_deadline < timezone.now().date()

    def save(self, *args, **kwargs):
        # Auto-close if expired
        if self.is_expired and self.status == 'active':
            self.status = 'closed'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.created_by.company_name})"

    class Meta:
        db_table = 'Jobs'
        
def generate_application_id():
    return f"app_{secrets.token_hex(6)}"  # Example: app_a1b2c3d4e5f6

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('under_review', 'Under Review'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('hired', 'Hired'),
        ('rejected', 'Rejected'),
        ('test', 'test'),
    ]
    application_id = models.CharField(max_length=20, unique=True, default=generate_application_id)
    job = models.ForeignKey('Job', on_delete=models.CASCADE, related_name='applications')
    name = models.CharField(max_length=255,default="name")
    role = models.CharField(max_length=100)
    applied_by = models.ForeignKey('User', on_delete=models.CASCADE)
    applied_on = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new')
    resume_url = models.CharField(max_length=255, null=True, blank=True) 
    main_resume_url = models.CharField(max_length=1000, null=True, blank=True) 

    def __str__(self):
        return f"{self.name} applied for {self.job.title}"
    
    
    @property
    def resume_key(self):
        # Assuming resume_url stores the key path (e.g., 'resumes/user123.pdf')
        return self.resume_url

    class Meta:
        db_table = 'Job_Applications'
    




def generate_custom_subscription_id():
    chars = string.ascii_letters + string.digits + "-_.~!$'()*@"
    random_id = ''.join(secrets.choice(chars) for _ in range(10))
    return f"pay_{random_id}"



class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="resumes")
    file = models.FileField(upload_to="")  # "resumes/" prefix comes from storage 'location'
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} / {self.file.name}"
    
    

class Subscription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    subscription_id = models.CharField(max_length=100, unique=True,null=True)
    plan_id = models.CharField(max_length=100 ,null=True)
    plan_name = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, default='INITIALIZED')  # ACTIVE, PAUSED, etc.
    started_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    raw_response = models.JSONField(blank=True, null=True)  # Optional: store full Cashfree response

    def __str__(self):
        return f"{self.user.username} - {self.subscription_id}"
    
    
    

def generate_custom_WalkInDrive_id():
    chars = string.ascii_letters + string.digits 
    random_id = ''.join(secrets.choice(chars) for _ in range(10))
    return f"walkin{random_id}"

class WalkInDrive(models.Model):
    id = models.CharField(
        primary_key=True,
        default=generate_custom_WalkInDrive_id,
        editable=False,
        max_length=20,
        unique=True
    )
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    date = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    selection = models.CharField(max_length=255)
    venue = models.TextField()
    requirements = models.TextField()
    stipend = models.CharField(max_length=100, blank=True, null=True)
    salary = models.CharField(max_length=100)
    perks = models.TextField(blank=True, null=True)
    contact = models.CharField(max_length=100)
    apply_link = models.URLField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class WalkInApplication(models.Model):
    id = models.AutoField(primary_key=True)
    walkin = models.ForeignKey('WalkInDrive', on_delete=models.CASCADE, related_name='applications')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} applied for {self.walkin.company}"





