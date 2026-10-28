import json, sys
for l in open(sys.argv[1]):
    try: d = json.loads(l)
    except Exception: continue
    if d.get('level') == 'error':
        sp = d['spans'][0] if d['spans'] else {}
        print(d['message'][:160], sp.get('file_name'), sp.get('line_start'))
