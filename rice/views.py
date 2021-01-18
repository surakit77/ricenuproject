from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status, generics
 
from rice.models import Rice, Rice_Bio, Rice_Qc
from rice.serializers import RiceSerializer, SearchSerializer, BioSerializer, GroupSerializer
from rest_framework.decorators import api_view

from django.db.models import Q

import openpyxl
def upload(request):
    if "GET" == request.method:
        return render(request, 'upload.html', {})
    else:
        excel_file = request.FILES["excel_file"]
        wb = openpyxl.load_workbook(excel_file)
        worksheet = wb["Sheet1"]
        print(worksheet)
        excel_data = list()
        # iterating over the rows and
        # getting value from each cell in row
        for row in worksheet.iter_rows():
            row_data = list()
            for cell in row:
                row_data.append((cell.value))     
            excel_data.append(row_data)
        
        # for i in range(1,len(excel_data)):
        #      rice = Rice_Qc(group = excel_data[i][0],
        #                 column_name = excel_data[i][1],
        #                 title = excel_data[i][2],
        #                 type_rice = excel_data[i][3],
        #                 title_En = excel_data[i][4],
        #                 rice_categories = excel_data[i][5],
        #                 units_1 = excel_data[i][6],
        #                 units_2 = excel_data[i][7])
        #      rice.save()        
        # for i in range(1,len(excel_data)):
        #     rice = Rice(id = excel_data[i][0],
        #                 nameTh = excel_data[i][1],
        #                 nameEn = excel_data[i][2],
        #                 certified = excel_data[i][3],
        #                 province = excel_data[i][4],
        #                 year = excel_data[i][5],
        #                 season = excel_data[i][6],
        #                 Type = excel_data[i][7],
        #                 typeorganic = excel_data[i][8],
        #                 analysisyear = excel_data[i][9],
        #                 analysisfacility = excel_data[i][10],
        #                 source = excel_data[i][11])
        #     rice.save()        
        # for i in range(1,len(excel_data)):
        #     riceBio = Rice_Bio(
        #     ID = excel_data[i][0],
        #     Rice_Varieties= excel_data[i][1],
        #     Tocopherol_Alpha_M = excel_data[i][2],
        #     Tocopherol_Alpha_U = excel_data[i][3],
        #     Tocopherol_Alpha = excel_data[i][4],
        #     Tocopherol_Beta_M = excel_data[i][5],
        #     Tocopherol_Beta_U = excel_data[i][6],
        #     Tocopherol_Beta = excel_data[i][7],
        #     Tocopherol_Gamma_M = excel_data[i][8],
        #     Gamma_tocopherol_M = excel_data[i][9],
        #     Tocopherol_Gamma_U = excel_data[i][10],
        #     Tocopherol_Gamma = excel_data[i][11],
        #     Tocopherol_Sigma_M = excel_data[i][12],
        #     Tocopherol_Sigma_U = excel_data[i][13],
        #     Tocopherol_Delta_M = excel_data[i][14],
        #     Tocopherol_Delta_U = excel_data[i][15],
        #     Tocotrienol_Alpha_M = excel_data[i][16],
        #     Tocotrienol_Alpha_U = excel_data[i][17],
        #     Tocotrienol_Beta_M = excel_data[i][18],
        #     Tocotrienol_Beta_U = excel_data[i][19],
        #     Tocotrienol_Gamma_M_mg = excel_data[i][20],
        #     Tocotrienol_Gamma_M = excel_data[i][21],
        #     Tocotrienol_Gamma_U = excel_data[i][22],
        #     Tocotrienol_Sigma_M = excel_data[i][23],
        #     Tocotrienol_Sigma_U = excel_data[i][24],
        #     Tocotrienol_Delta_M = excel_data[i][25],
        #     Tocotrienol_Delta_U = excel_data[i][26],
        #     Prolamine = excel_data[i][27],
        #     Albumin = excel_data[i][28],
        #     Globulin = excel_data[i][29],
        #     Glutenin = excel_data[i][30],
        #     Omega_3 = excel_data[i][31],
        #     Omega_6 = excel_data[i][32],
        #     Omega_9 = excel_data[i][33],
        #     Tryptophan_M = excel_data[i][34],
        #     Tryptophan_U = excel_data[i][35],
        #     Threonine_M = excel_data[i][36],
        #     Threonine_U = excel_data[i][37],
        #     Isoleucine_M = excel_data[i][38],
        #     Isoleucine_U = excel_data[i][39],
        #     Leucine_M = excel_data[i][40],
        #     Leucine_U = excel_data[i][41],
        #     Lysine_M = excel_data[i][42],
        #     Lysine_U = excel_data[i][43],
        #     Methionine_M = excel_data[i][44],
        #     Methionine_U = excel_data[i][45],
        #     Cystine_M = excel_data[i][46],
        #     Cystine_U = excel_data[i][47],
        #     Phenylalanine_M = excel_data[i][48],
        #     Phenylalanine_U = excel_data[i][49],
        #     Tyrosine_M = excel_data[i][50],
        #     Tyrosine_U = excel_data[i][51],
        #     Valine_M = excel_data[i][52],
        #     Valine_U = excel_data[i][53],
        #     Arginnine_M = excel_data[i][54],
        #     Arginnine_U = excel_data[i][55],
        #     Histidine_M = excel_data[i][56],
        #     Histidine_U = excel_data[i][57],
        #     Alanine_M = excel_data[i][58],
        #     Alanine_U = excel_data[i][59],
        #     Aspartic_acid_M = excel_data[i][60],
        #     Aspartic_acid_U = excel_data[i][61],
        #     Glutamic_acid_M = excel_data[i][62],
        #     Glutamic_acid_U = excel_data[i][63],
        #     Glycine_M = excel_data[i][64],
        #     Glycine_U = excel_data[i][65],
        #     Proline_M = excel_data[i][66],
        #     Proline_U = excel_data[i][67],
        #     Serine_M = excel_data[i][68],
        #     Serine_U = excel_data[i][69],
        #     Cerine_M = excel_data[i][70],
        #     Cerine_U = excel_data[i][71],
        #     Ethyl_alcohol = excel_data[i][72],
        #     Caffeine = excel_data[i][73],
        #     Theobromine = excel_data[i][74],
        #     Beta_carotene  = excel_data[i][75],
        #     Alpha_carotene = excel_data[i][76],
        #     Beta_cryptoxanthin = excel_data[i][77],
        #     Lycopene = excel_data[i][78],
        #     Lutein_Zeaxanthin = excel_data[i][79],
        #     Biotin_U =excel_data[i][80],
        #     Gamma_Oryzanol_M = excel_data[i][81],
        #     Gamma_Oryzanol_U = excel_data[i][82],
        #     Phenolic_compounds = excel_data[i][83],
        #     Total_Antioxidant_M  = excel_data[i][84],
        #     Total_Antioxidant_U = excel_data[i][85],
        #     Total_Antioxidant_M_Tr = excel_data[i][86],
        #     Total_Antioxidant = excel_data[i][87],
        #     Antioxidant_compounds = excel_data[i][88],
        #     Gallic_acid_M = excel_data[i][89],
        #     Gallic_acid = excel_data[i][90],
        #     Eriodictyol_M = excel_data[i][91],
        #     Eriodictyol = excel_data[i][92],
        #     Anthocyanin = excel_data[i][93],
        #     Apigenin_M = excel_data[i][94],
        #     Apigenin  = excel_data[i][95],
        #     Isoquercetin_M = excel_data[i][96],
        #     Isoquercetin = excel_data[i][97],
        #     Hydroquinin_M = excel_data[i][98],
        #     Hydroquinin = excel_data[i][99],
        #     Quercetin_M  = excel_data[i][100],
        #     Quercetin  = excel_data[i][101],
        #     Kaempferol_M = excel_data[i][102],
        #     Kaempferol = excel_data[i][103],
        #     Rutin_M = excel_data[i][104],
        #     Rutin = excel_data[i][105],
        #     Catechin_M  = excel_data[i][106],
        #     Catechin  = excel_data[i][107],
        #     Tannic_acid_M  = excel_data[i][108],
        #     Tannic_acid  = excel_data[i][109],
        #     Flavonoid  = excel_data[i][110],
        #     GABA_gamma_Aminobutyric_acid = excel_data[i][111])
        #     riceBio.save()    

        return render(request, 'upload.html', {"excel_data":excel_data})

class RiceView(generics.ListCreateAPIView):
    queryset  = Rice.objects.all()
    serializer_class  = RiceSerializer

@api_view(['GET', 'POST', 'DELETE'])
def rice_list(request):
    if request.method == 'GET':
        rice = Rice.objects.all()
        
        nameTh = request.GET.get('nameTh', None)
        if nameTh is not None:
            rice = rice.filter(nameTh__icontains=nameTh)
        
        rice_serializer = RiceSerializer(rice, many=True)
        return JsonResponse(rice_serializer.data, safe=False)

    elif request.method == 'POST':
        rice_data = JSONParser().parse(request)
        rice_serializer = RiceSerializer(data=rice_data)
        if rice_serializer.is_valid():
            rice_serializer.save()
            return JsonResponse(rice_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(rice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Rice.objects.all().delete()
        return JsonResponse({'message': '{} Rice were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
@api_view(['GET', 'PUT', 'DELETE']) 
def rice_detail(request, pk):
    try: 
        rice = Rice.objects.get(pk=pk) 
    except Rice.DoesNotExist: 
        return JsonResponse({'message': 'The Rice does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        rice_serializer = RiceSerializer(rice) 
        return JsonResponse(rice_serializer.data)

    elif request.method == 'PUT': 
        rice_data = JSONParser().parse(request) 
        rice_serializer = RiceSerializer(rice, data=rice_data) 
        if rice_serializer.is_valid(): 
            rice_serializer.save() 
            return JsonResponse(rice_serializer.data) 
        return JsonResponse(rice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        rice.delete() 
        return JsonResponse({'message': 'Rice was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    # GET / PUT / DELETE tutorial

@api_view(['GET'])
def rice_list_name(request):
    
    rice = Rice.objects.values('nameTh').distinct().order_by('nameTh')
        
    if request.method == 'GET': 
        rice_serializer = SearchSerializer(rice, many=True)
        return JsonResponse(rice_serializer.data, safe=False)

@api_view(['GET'])
def search_list_name(request, name):
    
    rice = Rice.objects.filter(nameTh__contains=name)

    if request.method == 'GET': 
        rice_serializer = RiceSerializer(rice, many=True)
        return JsonResponse(rice_serializer.data, safe=False)

@api_view(['GET'])
def detail_bio(request, pk):
    
    try: 
        rice = Rice_Bio.objects.get(pk=pk) 
    except Rice_Bio.DoesNotExist: 
        return JsonResponse({'message': 'The Rice does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    
    if request.method == 'GET': 
        bio_serializer = BioSerializer(rice) 
        return JsonResponse(bio_serializer.data)

@api_view(['GET'])
def rice_qc(request):
    
    group_data = Rice_Qc.objects.filter(group="Bioactive compounds") 
    
    if request.method == 'GET': 
        group_serializer = GroupSerializer(group_data, many=True)
        return JsonResponse(group_serializer.data, safe=False)