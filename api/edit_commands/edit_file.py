import json


def create_table(string):
		values = string.split("  ")
		ret = [x for x in values if x != ""]
		return ',' + ",".join(ret)


def create_csv(string):
		ret = ""
		b = False
		for i in range(1, len(string)):
				if not b:
						ret += string[i]
				if string[i] == '\n':
						b = True
				if b and string[i] == ',':
						b = False
		return ret


# ok
def get_discribe(file):
		ret = str(file.describe())
		return f'{create_table(ret)}'

# ok
def get_mode(file):
		ret = str(file.mode(axis=0))
		return create_table(ret)

# ok
def get_mean(file, column):
		n = column['mean']
		ret = str(file[n].mean(axis=0))
		return n + "\n" + ret

# ok
def get_median(file, column):
		n = column['median']
		ret = str(file[n].median(axis=0))
		return n + "\n" + ret

# ok
def get_min(file, column):
		n = column['min']
		ret = str(file[n].min(axis=0))
		return n + "\n" + ret

# ok
def get_max(file, column):
		n = column['max']
		ret = str(file[n].max(axis=0))
		return n + "\n" + ret

# ok
def get_sum(file, column):
		n = column['sum']
		ret = str(file[n].sum(axis=0))
		return n + "\n" + ret

# ok
def set_index(file, column):
		n = json.loads(column)['set_index']
		ret = file.set_index(column)
		return ret

# ok
"""{
	"choice_rows": {
		"from": 10,
		"to": 20
	}
}"""
def choice_rows(file, choice):
		n = choice['choice_rows']
		start = int(n['from'])
		end = int(n['to'])
		ret = str(file.iloc[start:end].to_csv())
		return create_csv(ret)

# ok
"""
{
	"choice_columns": "atrybut1",
}
"""
def choice_columns(file, choice):
		n = choice['choice_columns']
		ret = str(file[n.strip()].to_csv())
		return create_csv(ret)

# ok
"""
{
	"rename_columns": {
		"old": "atrybut1",
		"new": "atrybut4"
	}
}
"""
def rename_columns(file, choice):
		n = choice['rename_columns']
		old_name = n['old']
		new_name = n['new']
		ret = str(file.rename(columns={old_name: new_name}).to_csv())
		return create_csv(ret)

# ok
def remove_nulls(file):
		ret = str(file.dropna().to_csv())
		return create_csv(ret)

# ok
"""
{
	"sorting": {
		"column": "atrybut1",
		"asce": ""
	}
}
"""
# Domyślnie
# column="" -> index
# asce=True
def sorting(file, choice):
		n = choice['sorting']
		col = n['column']
		asce = True if not n['asce'] else False
		if not col:
				ret = file.sort_values(by=0, ascending=asce)
		else:
				ret = file.sort_values(by=[col], ascending=asce)
		return create_csv(str(ret.to_csv()))

# ok

def del_column(file, column):
		n = column['del_column']
		ret = file.drop(columns=[n], axis=1)
		return create_csv(str(ret.to_csv()))

# ok
"""
{
	"where": {
		"column": "atrybut1",
		"con": ">",
		"value": "10"
	}
}
"""
def where(file, condition):
		n = condition['where']
		col = n['column']
		con = n['con']
		value = n['value']
		var = f"file['{col}'] {con} {value}"
		ret = file.where(eval(var))
		return remove_nulls(ret)