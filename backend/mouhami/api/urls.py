from django.urls import path
from . import views
from .views import lawyer_signup, lawyer_login, google_login, logout, user_login, user_signup, get_rating_by_lawyer, add_rating

urlpatterns=[
    path('',views.getRoutes,name="routes"),

    path('commentaires/',views.getCommentaires,name='commentaires'),
    path('commentaires/<str:pk>/',views.getCommentaire,name='commentaire'),

    path('signup/', lawyer_signup, name='lawyer_signup'),
    path('login/', lawyer_login, name='lawyer_login'),

    path('signupUser/', user_signup, name='user_signup'),
    path('loginUser/', user_login, name='user_login'),

    path('auth/google/', google_login, name='google_login'),
    path('logout/', logout, name='logout'),

    path('Lawyers/',views.getLawyers,name='Lawyers'),

    path('Lawyers/<str:pk>/update/',views.updateLawyer,name='update-Lawyer'),

    path('Lawyers/<str:pk>/',views.getLawyer,name='Lawyer'),

    path('search-lawyers/', views.searchLawyers, name='search-lawyers'),
    path('delete-lawyer/<str:pk>/', views.deleteLawyer, name='delete-lawyer'),

    path('add-commentaire/', views.addCommentaire, name='add-commentaire'),
    path('get-comments-by-lawyer/<str:lawyer_id>/', views.get_comments_by_lawyer, name='get-comments-by-lawyer'),
    path('add-rendezvous/', views.add_rendezvous, name='add-rendezvous'),
    path('get-rendezvous-by-lawyer/<str:lawyer_id>/', views.get_rendezvous_by_lawyer, name='get-rendezvous-by-lawyer'),
    path('add-rating/', add_rating, name='add-rating'),
    path('get-rating-by-lawyer/<str:lawyer_id>/', get_rating_by_lawyer, name='get-rating-by-lawyer'),

]
