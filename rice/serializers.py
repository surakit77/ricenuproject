from rest_framework import serializers 
from .models import Rice, Rice_Bio, Rice_Qc
 
 
class RiceSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Rice
        fields = ('id',
                  'nameTh',
                  'nameEn',
                  'certified',
                  'province',
                  'year',
                  'season',
                  'Type',
                  'typeorganic',
                  'analysisyear',
                  'analysisfacility',
                  'source',       
                  )

class SearchSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Rice
        fields = (
                  'nameTh',
                  'nameEn'     
                  )

class BioSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Rice_Bio
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Rice_Qc
        fields = (
                    'group',
                    'column_name',
                    'title',
                    'type_rice',
                    'title_En',
                    'rice_categories',
                    'units_1',
                    'units_2',  
                  )