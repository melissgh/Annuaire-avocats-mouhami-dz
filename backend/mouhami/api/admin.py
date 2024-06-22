from django.contrib import admin

# Register your models here.
from .models import Commentaire
from .models import Lawyer,Client,RendezVous, Comment, Rating

admin.site.register(Commentaire)
admin.site.register(Lawyer)
admin.site.register(Client)
admin.site.register(RendezVous)
admin.site.register(Comment)
admin.site.register(Rating)