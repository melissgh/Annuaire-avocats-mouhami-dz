from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Commentaire,Lawyer, Client, Comment, RendezVous, Rating

class CommentaireSerializer(ModelSerializer):
    class Meta:
        model= Commentaire
        fields='__all__'  

class LawyerSerializer(ModelSerializer):
    class Meta:
        model= Lawyer
        fields='__all__' 
        # fields=['firstName','secondName','phoneNumber','email','adresse','specialite',"langues",'desciption'] 

class CommentSerializer(ModelSerializer):
    clientName = serializers.CharField(source='clientComment.clientName', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'clientName', 'bodyComment']

class ClientSerializer(ModelSerializer):
    class Meta:
        model= Commentaire
        fields='__all__'  

class RendezVousSerializer(ModelSerializer):
    clientName = serializers.CharField(source='client.clientName', read_only=True)
    class Meta:
        model = RendezVous
        fields = ['clientName', 'avocat', 'dateRDV', 'heureRDV']

class RatingSerializer(ModelSerializer):
    clientName = serializers.CharField(source='client.clientName', read_only=True)

    class Meta:
        model = Rating
        fields = ['rating', 'clientName']

class AverageRatingSerializer(serializers.Serializer):
    average_rating = serializers.FloatField()