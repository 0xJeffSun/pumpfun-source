import json,subprocess,sys
V=json.load(open(sys.argv[1])); out=[]
for k,b in V.items():
    json.dump({k:b},open('one.json','w'))
    r=subprocess.run([sys.executable,'-B','chk2.py','one.json'],capture_output=True,text=True)
    line=[l for l in r.stdout.splitlines() if l.startswith(k)]
    print(line[0] if line else f'{k:5} COMPILE-FAIL', flush=True)
