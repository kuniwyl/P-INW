from asyncio import constants
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from io import StringIO
import pandas as pd
import json
import api.edit_commands.edit_file as ef

# plik:
# 	zapis do pliku					save_to_file				main
# 	pobierz									dowload							bezpośrednio

# opis:																					gdzie	czyjest	czyPost
# 	decribe									describe						here 	ok			ok
# 	mean										mean								here 	ok			ok
# 	median									median							here 	ok			ok
# 	mode										mode								here 	ok			ok
# 	min 										min									here 	ok 			ok
# 	max											max									here 	ok			ok
# 	sum											sum									here 	ok			ok

# edycja:
# 	index										set_index						here 	ok			ok
# 	wyświetlanie wierszy 		choice_rows					here 	ok			ok
# 	wyświetlanie kolumn			choice_columns			here 	ok			ok
# 	zmiana nazwy kolumny		rename_columns			here 	ok			ok
# 	remove nulls dropna			remove_nulls				here 	ok			ok
# 	sortowanie							sorting							here  ok			ok
# 	usuwanie kolumny				del_column					here	ok			ok

# zapytanie:	
# 	where										where								here 	ok			ok

class ProjectFilesSaveView(APIView):
		permission_classes = (IsAuthenticated, )

		def post(self, requset, format=None):
				data = requset.data
				file = pd.read_csv(StringIO(data['file']))
				return Response({"kk": ";;"}, status=status.HTTP_200_OK)


class ProjectFilesEditionView(APIView):
		permission_classes = (IsAuthenticated, )

		def post(self, request, format=None):
				data = request.data
				file = pd.read_csv(StringIO(data['file']))
				res = dict()
				keys = data.keys()
				if 'describe' in keys:
						res['describe'] = ef.get_discribe(file)
						
				if 'mode' in keys:
						res['mode'] = ef.get_mode(file)

				if 'mean' in keys:
						res['mean'] = ef.get_mean(file, data)

				if 'median' in keys:
						res['median'] = ef.get_median(file, data)

				if 'min' in keys:
						res['min'] = ef.get_min(file, data)

				if 'max' in keys:
						res['max'] = ef.get_max(file, data)

				if 'sum' in keys:
						res['sum'] = ef.get_sum(file, data)	


				if 'set_index' in keys:
						res['set_index'] = ef.set_index(file, data)	


				if 'choice_rows' in keys:
						res['choice_rows'] = ef.choice_rows(file, data)	

				if 'choice_columns' in keys:
						res['choice_columns'] = ef.choice_columns(file, data)	

				if 'rename_columns' in keys:
						res['rename_columns'] = ef.rename_columns(file, data)	

				if 'remove_nulls' in keys:
						res['remove_nulls'] = ef.remove_nulls(file)	

				if 'sorting' in keys:
						res['sorting'] = ef.sorting(file, data)	

				if 'del_column' in keys:
						res['del_column'] = ef.del_column(file, data)	

				if 'where' in keys:
						res['where'] = ef.where(file, data)	

				data1 = json.dumps(res)
				return Response({data1}, status=status.HTTP_200_OK)