from django.urls import path
from .views import index
urlpatterns = [
    path('',index),
    path('browse',index),
    path('search',index),
    path('detail',index)
]