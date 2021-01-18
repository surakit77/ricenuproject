from django.urls import path , re_path
from django.conf.urls import url 
from rice import views 
from .views import RiceView

app_name = "myapp"

urlpatterns = [ 
    url(r'^api/rice$', views.rice_list),
    url(r'^api/rice/(?P<pk>[0-9]+)$', views.rice_detail),
    re_path(r'^api/rice/search/(?P<name>\D+)$', views.search_list_name),
    re_path(r'^api/rice/bio/(?P<pk>[0-9]+)$',views.detail_bio),
    re_path(r'^api/rice/group/bio', views.rice_qc),
    path('api/rice/search', views.rice_list_name),
    path('home', RiceView.as_view()),
    path('upload', views.upload, name='upload'),
]