from django.db import models

# Create your models here.
class Lawyer(models.Model):
    firstName = models.CharField(max_length=100)
    secondName = models.CharField(max_length=100)
    phoneNumber = models.IntegerField(null=True, default='0518142560')
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    specialite = models.CharField(max_length=100, null=True)
    langues = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    adresse = models.CharField(max_length=200, null=True)
    image = models.ImageField(upload_to = 'images/', null=True, blank=True)
    def __str__(self):
        return f"{self.firstName} {self.secondName}"

class Client(models.Model):
    clientName=models.CharField(max_length=100)
    clientEmail=models.CharField(max_length=100)
    clientPassword= models.CharField(max_length=100)
    def __str__(self):
        return f"{self.clientName}"

class Commentaire(models.Model):
    name = models.CharField(max_length=30)
    body=models.TextField()
    date = models.DateTimeField(auto_now=True)

class User(models.Model):
    emailUser = models.EmailField(unique=True)
    nameUser = models.CharField(max_length=100)

class RendezVous(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    avocat = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    dateRDV = models.DateField()
    heureRDV = models.TimeField()
    def __str__(self):
        return f"{self.dateRDV}"

class Comment(models.Model):
    clientComment = models.ForeignKey(Client, on_delete=models.CASCADE)
    lawyerComment = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    bodyComment = models.TextField()
    def __str__(self):
        return f"{self.bodyComment}"

class Rating(models.Model):
    clientRating = models.ForeignKey(Client, on_delete=models.CASCADE)
    lawyerRating = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])

    def __str__(self):
        return f"{self.clientRating.clientName} -> {self.lawyerRating.firstName} {self.lawyerRating.secondName}: {self.rating} rating"
    
