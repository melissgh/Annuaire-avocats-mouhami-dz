import json
import secrets
import os
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from api.models import Lawyer

class Command(BaseCommand):
    help = 'Import data from JSON file'

    def handle(self, *args, **options):
        # Obtenez le chemin absolu du fichier data.json
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')

        # Charger les données JSON depuis le fichier
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Parcourir les données et les importer dans la base de données
        for item in data:
            # Utilisez secrets pour générer un mot de passe aléatoire
            password = secrets.token_hex(12)

            # Traitement du nom complet
            full_name = item.get('full_name', '')
            names = full_name.split(' ')
            first_name = names[0] if names else ''
            last_name = ' '.join(names[1:]) if len(names) > 1 else ''

            # Traitement des catégories
            categories = item.get('categories', [])
            specialite = ', '.join(categories[:2]) if categories else None
            description = ', '.join(categories[2:]) if len(categories) > 2 else None

            try:
                # Générer une adresse e-mail aléatoire
                email = f"{first_name.lower()}.{last_name.lower()}@example.com"

                lawyer = Lawyer(
                    firstName=first_name,
                    secondName=last_name,
                    email=email,
                    adresse=item.get('address', None),
                    specialite=specialite,
                    description=description,
                    password=password,
                    langues='Français, Arabe',  # Mettez les langues par défaut
                    phoneNumber=item.get('Tel', None)
                )

                # Enregistrez le modèle dans la base de données
                lawyer.save()

            except ValidationError as e:
                self.stderr.write(self.style.ERROR(f"Erreur de validation : {e}"))

        self.stdout.write(self.style.SUCCESS('Données importées avec succès.'))
