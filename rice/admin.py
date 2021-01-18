from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Rice,Rice_Bio

class RiceResource(resources.ModelResource):

    class Meta:
        model = Rice

class RiceAdmin(ImportExportModelAdmin):
    resource_class = RiceResource

admin.site.register([Rice, Rice_Bio])
