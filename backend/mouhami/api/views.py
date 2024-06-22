from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Commentaire, Lawyer, Comment ,RendezVous, Client, Rating
from .serializers import CommentaireSerializer, LawyerSerializer, RendezVousSerializer , CommentSerializer, RatingSerializer, AverageRatingSerializer
from .forms import LawyerSignUpForm, ClientSignUpForm
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import check_password
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import status
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404



from rest_framework.pagination import PageNumberPagination
@api_view(['GET'])
def getLawyers(request):
    Lawyers=Lawyer.objects.all() #get all lawyers from the database 
    serializer = LawyerSerializer(Lawyers, many=True) #serialize them
    return Response(serializer.data)

@api_view(['GET'])
def searchLawyers(request):
    # Récupère les paramètres de recherche depuis la requête GET
    adresse = request.GET.get('adresse', None)
    specialite = request.GET.get('specialite', None)
    langues = request.GET.get('langues', None)

    # Filtrer les lawyers en fonction des paramètres de recherche s'ils sont présents
    lawyers = Lawyer.objects.all()
    if adresse:
        lawyers = lawyers.filter(adresse__icontains=adresse)
    if specialite:
        lawyers = lawyers.filter(specialite__icontains=specialite)
    if langues:
        lawyers = lawyers.filter(langues__icontains=langues)

    # Serializer les résultats filtrés
    serializer = LawyerSerializer(lawyers, many=True)
    
    if not serializer.data:  # Si la liste des avocats est vide
        return Response({"message": "Aucun avocat trouvé avec ces critères de recherche."}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def user_login(request):
    try:
        if request.method == 'POST':
            email = request.data.get('clientEmail')
            password = request.data.get('clientPassword')

            user = Client.objects.filter(clientEmail=email).first()

            if user is not None and check_password(password, user.clientPassword):
                print(user.id)
                return JsonResponse({'message': 'Client Login successful', 'user_id': int(user.id)})
            else:
                return lawyer_login(request)
        else:
            return JsonResponse({'message': 'Invalid request method'}, status=400)
    except Exception as e:
        print(f"Error in user_login view: {str(e)}")
        return JsonResponse({'message': 'Internal Server Error'}, status=500)



@csrf_exempt  
@api_view(['POST'])
def google_login(request):
    print('please')
    if request.method == 'POST':
        print('login started')
        id_token_data = request.POST.get('idToken')
        print('this is the id_token' , id_token_data)
        try:
            id_info = id_token.verify_oauth2_token(id_token_data, requests.Request())

            user_email = id_info['email']
            user_name = id_info.get('name', '')

            request.session['user_email'] = user_email
            request.session['user_name'] = user_name

            return JsonResponse({'message': 'Login successful'})
        except ValueError as e:
            print('error is ', e) 
            return JsonResponse({'error': 'Invalid token'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_signup(request):
    try:
        if request.method == 'POST':
            form = ClientSignUpForm(request.POST)
            print(request.POST)
            if form.is_valid():
                user = form.save()
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                user_id = user.id  # Récupérer l'ID de l'utilisateur créé
                return JsonResponse({'message': 'Signup successful', 'access_token': access_token, 'user_id': int(user.id)})
                # return JsonResponse({'message': 'Signup successful', 'access_token': access_token})
            else:
                print(form.errors)
                return JsonResponse({'message': 'Invalid form data'}, status=400)
        else:
            return JsonResponse({'message': 'Invalid request method'}, status=400)
    except Exception as e:
        print(f"Error in user_signup view: {str(e)}")
        return JsonResponse({'message': 'Internal Server Error'}, status=500)

def logout(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})

class GoogleLogin(SocialLoginView): 
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://127.0.0.1:3000/'
    client_class = OAuth2Client

@csrf_exempt
@api_view(['POST'])
def lawyer_login(request):
    try:
        if request.method == 'POST':
            # Get email and password from the request
            email = request.data.get('email')
            password = request.data.get('password')

            # Check if email exists in the database
            user = Lawyer.objects.filter(email=email).first()

            if user is not None and check_password(password, user.password):
                # # Here you might want to create tokens or send any success response
                # return JsonResponse({'message': 'Login successful'})

                 # Login successful, include user ID in the response
                print(user.id)
                return JsonResponse({'message': 'Login successful', 'user_id': int(user.id)})
            else:
                return JsonResponse({'message': 'Invalid credentials'}, status=401)
        else:
            return JsonResponse({'message': 'Invalid request method'}, status=400)
    except Exception as e:
        print(f"Error in lawyer_login view: {str(e)}")
        return JsonResponse({'message': 'Internal Server Error'}, status=500)

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def lawyer_signup(request):
    try:
        if request.method == 'POST':
            form = LawyerSignUpForm(request.POST)
            print(request.POST)
            if form.is_valid():
                user = form.save()
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                user_id = user.id  # Récupérer l'ID de l'utilisateur créé
                return JsonResponse({'message': 'Signup successful', 'access_token': access_token, 'user_id': int(user.id)})
                print(user_id)
                # return JsonResponse({'message': 'Signup successful', 'access_token': access_token})
            else:
                print(form.errors)
                return JsonResponse({'message': 'Invalid form data'}, status=400)
        else:
            return JsonResponse({'message': 'Invalid request method'}, status=400)
    except Exception as e:
        print(f"Error in lawyer_signup view: {str(e)}")
        return JsonResponse({'message': 'Internal Server Error'}, status=500)
    


@api_view(['GET']) #method allows to this view
def getRoutes(request):
     routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    #  return JsonResponse(routes, safe=False)
     return Response(routes)

@api_view(['GET'])
def getCommentaires(request):
    commentaires=Commentaire.objects.all() #get all comments from the database 
    serializer = CommentaireSerializer(commentaires, many=True) #serialize them
    return Response(serializer.data)

@api_view(['GET'])
def getCommentaire(request,pk):
    commentaire=Commentaire.objects.get(id=pk) #get the specific comment with the pk 
    serializer = CommentaireSerializer(commentaire, many=False) #serialize them
    return Response(serializer.data)


@api_view(['GET'])
def getLawyer(request,pk):
    oneLawyer=Lawyer.objects.get(id=pk) 
    serializer = LawyerSerializer(oneLawyer, many=False) #serialize it
    return Response(serializer.data)
    
@api_view(['PUT'])
def updateLawyer(request, pk):
    data = request.data
    lawyer = Lawyer.objects.get(id=pk)
    serializer = LawyerSerializer(instance=lawyer, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def deleteLawyer(request, pk):
    lawyer = get_object_or_404(Lawyer, id=pk)
    lawyer.delete()
    
    return Response({'message': 'Lawyer was deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def addCommentaire(request):
    data = request.data
    user_id = data.get('user_id', None)
    
    if user_id is not None:
        # L'utilisateur est connecté
        lawyer_id = data.get('lawyer_id', None)
        avocat = get_object_or_404(Lawyer, pk=lawyer_id)
        utilisateur = get_object_or_404(Client, pk=user_id)

        commentaire = Comment.objects.create(
            clientComment=utilisateur,
            lawyerComment=avocat,
            bodyComment=data['body']
        )
        serializer = CommentSerializer(commentaire, many=False)

        # Ajout du message de succès à la réponse
        response_data = {
            'message': 'Commentaire ajouté avec succès!',
            'commentaire_data': serializer.data
        }
    
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        # L'utilisateur n'est pas connecté, renvoyez une réponse d'erreur
        error_data = {
            'error': 'Vous devez d\'abord vous authentifier pour ajouter un commentaire.'
        }
        return Response(error_data, status=status.HTTP_401_UNAUTHORIZED)

# @api_view(['POST'])
# def addCommentaire(request):
#     data = request.data
#     user_id = data.get('user_id', None)
#     lawyer_id = data.get('lawyer_id', None)
#     avocat = get_object_or_404(Lawyer, pk=lawyer_id)
#     utilisateur = get_object_or_404(Client, pk=user_id)

#     commentaire = Comment.objects.create(
#         clientComment=utilisateur,
#         lawyerComment=avocat,
#         bodyComment=data['body']
#     )
#     serializer = CommentSerializer(commentaire, many=False)

#     # Ajout du message de succès à la réponse
#     response_data = {
#         'message': 'Commentaire ajouté avec succès!',
#         'commentaire_data': serializer.data
#     }
    
#     return Response(response_data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_comments_by_lawyer(request, lawyer_id):
    avocat = get_object_or_404(Lawyer, pk=lawyer_id)
    comments = Comment.objects.filter(lawyerComment=avocat)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_rendezvous(request):
    data = request.data
    user_id = data.get('user_id', None)
    lawyer_id = data.get('lawyer_id', None)
    date = data.get('date', None)
    heure = data.get('heure', None)

    # Vérifier si l'avocat a déjà un rendez-vous à cette heure
    existing_rendezvous = RendezVous.objects.filter(avocat_id=lawyer_id, dateRDV=date, heureRDV=heure)
    if existing_rendezvous.exists():
        return Response({'error': 'Le créneau horaire est déjà pris par un autre client.'}, status=400)

    user = get_object_or_404(Client, pk=user_id)
    avocat = get_object_or_404(Lawyer, pk=lawyer_id)

    rendezvous = RendezVous.objects.create(
        client=user,
        avocat=avocat,
        dateRDV=date,
        heureRDV=heure
    )
    serializer = RendezVousSerializer(rendezvous, many=False)

    # Ajout du message de succès à la réponse
    response_data = {
        'message': 'Rendez-vous ajouté avec succès!',
        'rendezvous_data': serializer.data
    }
    
    return Response(response_data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_rendezvous_by_lawyer(request, lawyer_id):
    avocat = get_object_or_404(Lawyer, pk=lawyer_id)
    rendezvous = RendezVous.objects.filter(avocat=avocat).order_by('dateRDV', 'heureRDV')
    serializer = RendezVousSerializer(rendezvous, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_rating(request):
    data = request.data
    user_id = data.get('user_id', None)

    if user_id is not None:
        # L'utilisateur est connecté
        lawyer_id = data.get('lawyer_id', None)
        avocat = get_object_or_404(Lawyer, pk=lawyer_id)
        utilisateur = get_object_or_404(Client, pk=user_id)

        existing_rating = Rating.objects.filter(clientRating=utilisateur, lawyerRating=avocat).first()

        if existing_rating:
            existing_rating.rating = data['rating']
            existing_rating.save()
            serializer = RatingSerializer(existing_rating, many=False)
        else:
            rating = Rating.objects.create(
                clientRating=utilisateur,
                lawyerRating=avocat,
                rating=data['rating']
            )
            serializer = RatingSerializer(rating, many=False)

        # Ajout du message de succès à la réponse
        response_data = {
            'message': 'Évaluation ajoutée avec succès!',
            'rating_data': serializer.data
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        # L'utilisateur n'est pas connecté, renvoyez une réponse d'erreur
        error_data = {
            'error': 'Vous devez d\'abord vous authentifier pour ajouter un commentaire.'
        }
        return Response(error_data, status=status.HTTP_401_UNAUTHORIZED)


    
@api_view(['GET'])
def get_rating_by_lawyer(request, lawyer_id):
    avocat = get_object_or_404(Lawyer, pk=lawyer_id)
    rating = Rating.objects.filter(lawyerRating=avocat)
    total_ratings = rating.count()
    if total_ratings > 0:
        average_rating = (sum(rating.rating  for rating in rating) // total_ratings)
    else:
        average_rating = 0

    serializer = AverageRatingSerializer({'average_rating': average_rating})
    return Response(serializer.data)