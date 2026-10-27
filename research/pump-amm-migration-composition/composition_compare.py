"""Apply only the inherited compute-consumption and source-coordinate normalization."""
import re

def logs(values):
    return [re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',
        re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',v))
        for v in values if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',v)]

def clean(value):
    if isinstance(value,dict):return {k:logs(v) if k=='logs' else clean(v) for k,v in value.items()}
    if isinstance(value,list):return [clean(v) for v in value]
    return value
