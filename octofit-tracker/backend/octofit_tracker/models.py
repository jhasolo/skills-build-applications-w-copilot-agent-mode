from djongo import models


class AppUser(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        ordering = ['name']

    def __str__(self):
        return self.name


class Team(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=120, unique=True)
    members = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'teams'
        ordering = ['name']

    def __str__(self):
        return self.name


class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True)
    user_email = models.EmailField()
    activity = models.CharField(max_length=120)
    duration = models.PositiveIntegerField()
    occurred_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'activities'
        ordering = ['-occurred_at']

    def __str__(self):
        return f"{self.user_email} - {self.activity}"


class LeaderboardEntry(models.Model):
    id = models.ObjectIdField(primary_key=True)
    team = models.CharField(max_length=120)
    points = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'
        ordering = ['-points']

    def __str__(self):
        return f"{self.team}: {self.points}"


class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=120)
    suggestion = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'workouts'
        ordering = ['name']

    def __str__(self):
        return self.name
