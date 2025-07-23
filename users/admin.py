from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser




class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'full_name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'full_name', 'password', 'role', 'phone')}),
        ('Job Seeker Info', {'fields': ('skills', 'experience')}),
        ('Company Info', {'fields': ('company_name', 'company_website', 'company_description')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'full_name', 'password1', 'password2', 'role', 'phone',
                'skills', 'experience',
                'company_name', 'company_website', 'company_description',
                'is_staff', 'is_active'
            ),
        }),
    )

    search_fields = ('email', 'full_name')

admin.site.register(CustomUser, CustomUserAdmin)
