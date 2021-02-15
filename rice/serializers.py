from rest_framework import serializers 
from .models import Rice, Rice_Qc, General, Physical, Chemical, Nutrition, Bioactive
 
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
        model = Bioactive
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

class RiceNutrition(serializers.ModelSerializer):
    class Meta:
        model = Nutrition
        fields =  '__all__'

class RiceGeneral(serializers.ModelSerializer):
    class Meta:
        model = General
        fields =  '__all__'

class RiceBioactive(serializers.ModelSerializer):
    class Meta:
        model = Bioactive
        fields =  '__all__'

class RicePhysical(serializers.ModelSerializer):
    class Meta:
        model = Physical
        fields =  '__all__'

class RiceChemical(serializers.ModelSerializer):
    class Meta:
        model = Chemical
        fields =  '__all__'