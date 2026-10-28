import re
def denum(b):
    b = re.sub(r'%(\d+)\b', r'%t\1', b)
    b = re.sub(r'(?m)^(\d+):', r't\1:', b)
    return b
