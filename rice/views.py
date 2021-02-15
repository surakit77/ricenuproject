from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status, generics
 
from rice.models import Rice, Rice_Bio, Rice_Qc, General, Physical, Chemical, Nutrition, Bioactive
from rice.serializers import RiceSerializer, SearchSerializer, GroupSerializer, RiceNutrition, RiceGeneral, RicePhysical, RiceChemical, RiceBioactive


from rest_framework.decorators import api_view
from rest_framework import viewsets

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
        #     rice =  General(ID = excel_data[i][0],
        #             ricevarietiesTH  = excel_data[i][1],
        #             ricevarieties  = excel_data[i][2],
        #             varietiesApproved = excel_data[i][3],
        #             samplePlantedArea = excel_data[i][4],
        #             yearProduction = excel_data[i][5],
        #             seasonProduction = excel_data[i][6],
        #             typeGrainAnalyzed = excel_data[i][7],
        #             organicProduction = excel_data[i][8],
        #             yearAnalysis = excel_data[i][9],
        #             siteAnalysis = excel_data[i][10],
        #             dataSource= excel_data[i][11])
        #     rice.save()

        # for i in range(1,len(excel_data)):
        #     rice =  Physical(ID = excel_data[i][0],
        #             ricevarietiesTH  = excel_data[i][1],
        #             seedWeights = excel_data[i][2],
        #             length = excel_data[i][3],
        #             width = excel_data[i][4],
        #             thickness = excel_data[i][5],
        #             huskColor = excel_data[i][6],
        #             grainLength = excel_data[i][7],
        #             grainWidth = excel_data[i][8],
        #             grainThickness = excel_data[i][9],
        #             aleuroneLayerColor = excel_data[i][10],
        #             seedShape = excel_data[i][11],
        #             chalkiness = excel_data[i][12],
        #             gloss = excel_data[i][13],
        #             whiteness = excel_data[i][14],
        #             transparency = excel_data[i][15],
        #             moisture_Milled = excel_data[i][16],
        #             moisture_Unpolished = excel_data[i][17],
        #             elongationRatio = excel_data[i][18],
        #             swelling = excel_data[i][19],
        #             texture = excel_data[i][20],
        #             peckViscosity = excel_data[i][21],
        #             trough = excel_data[i][22],
        #             breakdown = excel_data[i][23],
        #             finalViscosity = excel_data[i][24],
        #             setback = excel_data[i][25],
        #             pastingTemperature = excel_data[i][26],
        #             gelatinizationTemperature = excel_data[i][27],
        #             riceFlourViscosity = excel_data[i][28],
        #             precipitation = excel_data[i][29],
        #             retrogradation = excel_data[i][30],
        #             gelation = excel_data[i][31],
        #             gelConsistency = excel_data[i][32],
        #             swellingPower = excel_data[i][33],
        #             hardness = excel_data[i][34],
        #             adhesiveness = excel_data[i][35],
        #             stickiness = excel_data[i][36])
        #     rice.save()
        # for i in range(1,len(excel_data)):
        #     rice =  Chemical(ID = excel_data[i][0],
        #             ricevarietiesTH  = excel_data[i][1],
        #             amylose = excel_data[i][2],
        #             solubleAmyloseContent = excel_data[i][3],
        #             NA = excel_data[i][4],
        #             _2APcontent = excel_data[i][5],
        #             Alkali = excel_data[i][6],
        #             RAG_Milled = excel_data[i][7],
        #             RAG_Unpolished = excel_data[i][8],
        #             SAG_Milled = excel_data[i][9],
        #             SAG_Unpolished = excel_data[i][10],
        #             TG_Milled = excel_data[i][11],
        #             TG_Unpolished = excel_data[i][12],
        #             Ash_Milled = excel_data[i][13],
        #             Ash_Unpolished = excel_data[i][14])
        #     rice.save()
        # for i in range(1,len(excel_data)):
        #     rice =  Nutrition(ID = excel_data[i][0],
        #             ricevarietiesTH  = excel_data[i][1],
        #             water = excel_data[i][2],
        #             carbohydrate_Milled = excel_data[i][3],
        #             carbohydrate_Unpolished = excel_data[i][4],
        #             starch_Milled = excel_data[i][5],
        #             starch_Unpolished = excel_data[i][6],
        #             protein_Milled = excel_data[i][7],
        #             protein_Unpolished = excel_data[i][8],
        #             totalFat_Milled = excel_data[i][9],
        #             totalFat_Unpolished = excel_data[i][10],
        #             saturatedFat_Milled = excel_data[i][11],
        #             saturatedFat_Unpolished = excel_data[i][12],
        #             totalEnergy_Milled = excel_data[i][13],
        #             totalEnergy_Unpolished = excel_data[i][14],
        #             energyFat_Milled = excel_data[i][15],
        #             energyFat_Unpolished = excel_data[i][16],
        #             fiber_dietaryFiber_Milled = excel_data[i][17],
        #             fiber_dietaryFiber_Unpolished = excel_data[i][18],
        #             crudeFiber_Milled = excel_data[i][19],
        #             crudeFiber_Unpolished = excel_data[i][20],
        #             totalSugar_Milled = excel_data[i][21],
        #             totalSugar_Unpolished = excel_data[i][22],
        #             ferulicAcid_Milled = excel_data[i][23],
        #             ferulicAcid_Unpolished = excel_data[i][24],
        #             ferulicAcid_GerminatedUnpolished = excel_data[i][25],
        #             calcium_Milled = excel_data[i][26],
        #             calcium_Unpolished = excel_data[i][27],
        #             iron_Milled = excel_data[i][28],
        #             iron_Unpolished = excel_data[i][29],
        #             magnesium_Milled = excel_data[i][30],
        #             magnesium_Unpolished = excel_data[i][31],
        #             phosphorus_Milled = excel_data[i][32],
        #             phosphorus_Unpolished = excel_data[i][33],
        #             potassium_Milled = excel_data[i][34],
        #             potassium_Unpolished = excel_data[i][35],
        #             sodium_Milled = excel_data[i][36],
        #             sodium_Unpolished = excel_data[i][37],
        #             zinc_Milled = excel_data[i][38],
        #             zinc_Unpolished = excel_data[i][39],
        #             iodine = excel_data[i][40],
        #             copper_Milled = excel_data[i][41],
        #             copper_Unpolished = excel_data[i][42],
        #             manganese_Milled = excel_data[i][43],
        #             manganese_Unpolished = excel_data[i][44],
        #             selenium = excel_data[i][45],
        #             aluminium_Milled = excel_data[i][46],
        #             aluminium_Unpolished = excel_data[i][47],
        #             vitaminC = excel_data[i][48],
        #             thiamine = excel_data[i][49],
        #             niacin_Milled = excel_data[i][50],
        #             niacin_Unpolished = excel_data[i][51],
        #             pantothenicAcid = excel_data[i][52],
        #             vitaminB1_Milled = excel_data[i][53],
        #             vitaminB1_Unpolished = excel_data[i][54],
        #             vitaminB2_Milled = excel_data[i][55],
        #             vitaminB2_Unpolished = excel_data[i][56],
        #             riboflavin = excel_data[i][57],
        #             vitaminB3 = excel_data[i][58],
        #             vitaminB4 = excel_data[i][59],
        #             vitaminB5 = excel_data[i][60],
        #             vitaminB6 = excel_data[i][61],
        #             allFolate = excel_data[i][62],
        #             folicAcid = excel_data[i][63],
        #             foodFolate = excel_data[i][64],
        #             DFE_Folate = excel_data[i][65],
        #             vitaminB12 = excel_data[i][66],
        #             vitaminA = excel_data[i][67],
        #             vitaminA_IU = excel_data[i][68],
        #             vitaminA_RAE = excel_data[i][69],
        #             retinol = excel_data[i][70],
        #             vitaminE_Milled = excel_data[i][71],
        #             vitaminE_Unpolished = excel_data[i][72],
        #             anthocyanin = excel_data[i][73],
        #             betaCarotene = excel_data[i][74],
        #             vitaminE_alphaTocopherol = excel_data[i][75],
        #             vitaminK_phylloquinone = excel_data[i][76],
        #             saturatedFattyAcid = excel_data[i][77],
        #             monosaturatedFattyAcid = excel_data[i][78],
        #             polysaturatedFattyAcid = excel_data[i][79],
        #             cholesterol = excel_data[i][80])
        #     rice.save()
        # for i in range(1,len(excel_data)):
        #     rice =  Bioactive(ID = excel_data[i][0],
        #             ricevarietiesTH  = excel_data[i][1],
        #             tocopherolAlpha_Milled = excel_data[i][2] ,
        #             tocopherolAlpha_Unpolished = excel_data[i][3], 
        #             tocopherolAlpha = excel_data[i][4], 
        #             tocopherolBeta_Milled = excel_data[i][5], 
        #             tocopherolBeta_Unpolished = excel_data[i][6], 
        #             tocopherolBeta = excel_data[i][7], 
        #             tocopherolGamma_Milled = excel_data[i][8], 
        #             gammaTocopherol_Milled = excel_data[i][9], 
        #             tocopherolGamma_Unpolished = excel_data[i][10], 
        #             tocopherolGamma = excel_data[i][11] ,
        #             tocopherolSigma_Milled = excel_data[i][12] ,
        #             tocopherolSigma_Unpolished = excel_data[i][13] ,
        #             tocopherolDelta_Milled = excel_data[i][14] ,
        #             tocopherolDelta_Unpolished = excel_data[i][15] ,
        #             tocotrienolAlpha_Milled = excel_data[i][16] ,
        #             tocotrienolAlpha_Unpolished = excel_data[i][17] ,
        #             tocotrienolBeta_Milled = excel_data[i][18] ,
        #             tocotrienolBeta_Unpolished = excel_data[i][19] ,
        #             tocotrienolGamma_Milled_U1 = excel_data[i][20] ,
        #             tocotrienolGamma_Milled = excel_data[i][21] ,
        #             tocotrienolGamma_Unpolished = excel_data[i][22] ,
        #             tocotrienolSigma_Milled = excel_data[i][23], 
        #             tocotrienolSigma_Unpolished = excel_data[i][24] ,
        #             tocotrienolDelta_Milled = excel_data[i][25] ,
        #             tocotrienolDelta_Unpolished = excel_data[i][26] ,
        #             prolamine = excel_data[i][27], 
        #             albumin = excel_data[i][28] ,
        #             globulin = excel_data[i][29] ,
        #             glutenin = excel_data[i][30] ,
        #             omega3 = excel_data[i][31] ,
        #             omega6 = excel_data[i][32] ,
        #             omega9 = excel_data[i][33] ,
        #             tryptophan_Milled = excel_data[i][34] ,
        #             tryptophan_Unpolished = excel_data[i][35] ,
        #             threonine_Milled = excel_data[i][36]  ,
        #             threonine_Unpolished = excel_data[i][37] , 
        #             isoleucine_Milled = excel_data[i][38] ,
        #             isoleucine_Unpolished = excel_data[i][39] ,
        #             leucine_Milled = excel_data[i][40], 
        #             leucine_Unpolished = excel_data[i][41] ,
        #             lysine_Milled = excel_data[i][42] ,
        #             lysine_Unpolished = excel_data[i][43] ,
        #             methionine_Milled = excel_data[i][44],  
        #             methionine_Unpolished = excel_data[i][45], 
        #             cystine_Milled = excel_data[i][46], 
        #             cystine_Unpolished = excel_data[i][47],  
        #             phenylalanine_Milled = excel_data[i][48] ,
        #             phenylalanine_Unpolished = excel_data[i][49],
        #             tyrosine_Milled = excel_data[i][50] ,
        #             tyrosine_Unpolished = excel_data[i][51], 
        #             valine_Milled = excel_data[i][52] ,
        #             valine_Unpolished = excel_data[i][53] ,
        #             arginnine_Milled = excel_data[i][54] ,
        #             arginnine_Unpolished = excel_data[i][55] ,
        #             histidine_Milled = excel_data[i][56] ,
        #             histidine_Unpolished = excel_data[i][57] ,
        #             alanine_Milled = excel_data[i][58], 
        #             alanine_Unpolished = excel_data[i][59], 
        #             asparticAcid_Milled = excel_data[i][60] ,
        #             asparticAcid_Unpolished = excel_data[i][61] ,
        #             glutamicAcid_Milled = excel_data[i][62], 
        #             glutamicAcid_Unpolished = excel_data[i][63] ,
        #             glycine_Milled = excel_data[i][64], 
        #             glycine_Unpolished = excel_data[i][65], 
        #             proline_Milled = excel_data[i][66] ,
        #             proline_Unpolished = excel_data[i][67], 
        #             serine_Milled = excel_data[i][68] ,
        #             serine_Unpolished = excel_data[i][69], 
        #             cerine_Milled = excel_data[i][70] ,
        #             cerine_Unpolished = excel_data[i][71] ,
        #             ethylAlcohol = excel_data[i][72], 
        #             caffeine = excel_data[i][73] ,
        #             theobromine = excel_data[i][74], 
        #             betaCarotene = excel_data[i][75] , 
        #             alphaCarotene = excel_data[i][76] ,
        #             betaCryptoxanthin = excel_data[i][77] ,
        #             lycopene = excel_data[i][78] ,
        #             luteinZeaxanthin = excel_data[i][79] ,
        #             biotin_Unpolished = excel_data[i][80] ,
        #             gammaOryzanol_Milled = excel_data[i][81] ,
        #             gammaOryzanol_Unpolished = excel_data[i][82] ,
        #             phenolicCompounds = excel_data[i][83] ,
        #             totalAntioxidant_Milled_U1 = excel_data[i][84] ,
        #             totalAntioxidant_Unpolished = excel_data[i][85], 
        #             totalAntioxidant_Milled_U2 = excel_data[i][86] ,
        #             totalAntioxidant = excel_data[i][87], 
        #             antioxidantCompounds = excel_data[i][88] ,
        #             gallicAcid_Milled = excel_data[i][89], 
        #             gallicAcid = excel_data[i][90] ,
        #             eriodictyol_Milled = excel_data[i][91], 
        #             eriodictyol = excel_data[i][92] ,
        #             anthocyanin = excel_data[i][93] ,
        #             apigenin_Milled = excel_data[i][94] ,
        #             apigenin = excel_data[i][95]  ,
        #             isoquercetin_Milled = excel_data[i][96] ,
        #             isoquercetin = excel_data[i][97] ,
        #             hydroquinin_Milled = excel_data[i][98] ,
        #             hydroquinin = excel_data[i][99], 
        #             quercetin_Milled = excel_data[i][100], 
        #             quercetin = excel_data[i][101]  ,
        #             kaempferol_Milled = excel_data[i][102], 
        #             kaempferol = excel_data[i][103], 
        #             rutin_Milled = excel_data[i][104], 
        #             rutin = excel_data[i][105], 
        #             catechin_Milled = excel_data[i][106], 
        #             catechin = excel_data[i][107] ,
        #             tannicAcid_Milled = excel_data[i][108] ,
        #             tannicAcid = excel_data[i][109],  
        #             flavonoid = excel_data[i][110],  
        #             GABAgammaAminobutyricAcid = excel_data[i][111])
        #     rice.save()
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
    
    rice = Rice.objects.filter(Q(id=name) | Q(nameTh__contains=name) | Q(nameEn__contains=name) | 
    Q(certified__contains=name) | Q(province__contains=name) | Q(year__contains=name) | 
    Q(season__contains=name) | Q(Type__contains=name) | Q(typeorganic__contains=name) | 
    Q(analysisyear__contains=name) | Q(analysisfacility__contains=name) | Q(source__contains=name))

    if request.method == 'GET': 
        rice_serializer = RiceSerializer(rice, many=True)
        return JsonResponse(rice_serializer.data, safe=False)

@api_view(['GET'])
def rice_qc(request):
    
    group_data = Rice_Qc.objects.filter(group="Bioactive compounds") 
    
    if request.method == 'GET': 
        group_serializer = GroupSerializer(group_data, many=True)
        return JsonResponse(group_serializer.data, safe=False)

class NutritionViewSet(viewsets.ModelViewSet):
    queryset = Nutrition.objects.all()
    serializer_class = RiceNutrition

class BioactiveViewSet(viewsets.ModelViewSet):
    queryset = Bioactive.objects.all()
    serializer_class = RiceBioactive

class PhysicalViewSet(viewsets.ModelViewSet):
    queryset = Physical.objects.all()
    serializer_class = RicePhysical

class ChemicalViewSet(viewsets.ModelViewSet):
    queryset = Chemical.objects.all()
    serializer_class = RiceChemical    
