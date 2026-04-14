from django.contrib import admin

from .models import Activity, AppUser, LeaderboardEntry, Team, Workout


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team', 'created_at')
    search_fields = ('name', 'email', 'team')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'activity', 'duration', 'occurred_at')
    search_fields = ('user_email', 'activity')


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('team', 'points', 'updated_at')
    search_fields = ('team',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
