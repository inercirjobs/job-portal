
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, role=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not full_name:
            raise ValueError("Full name is required")
        if not role:
            raise ValueError("Role is required")

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
            role=role,
            phone=extra_fields.get('phone'),
            skills=extra_fields.get('skills'),
            experience=extra_fields.get('experience'),
            company_name=extra_fields.get('company_name'),
            company_website=extra_fields.get('company_website'),
            company_description=extra_fields.get('company_description')
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None):
        user = self.create_user(
            email=email,
            full_name=full_name,
            password=password,
            role='Admin'
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('JobSeeker', 'Job Seeker'),
        ('HR', 'HR/Company'),
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # JobSeeker fields
    skills = models.TextField(blank=True, null=True)
    experience = models.CharField(max_length=100, blank=True, null=True)

    # HR/Company fields
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Job:
    pass