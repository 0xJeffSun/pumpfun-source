import sys,re,csv,json,bisect
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
inv=json.load(open(W+'/base/L12/inventory.json'))['windows']
rows=[r for r in csv.DictReader(open(W+'/base/functions.tsv'),delimiter='\t') if r['program']=='pump' and r['variant']=='selected']
names={}
for r in rows:
    a=int(r['original_start']); c=json.loads(r['candidate_names']) if r['candidate_names'] else []
    names[a]=(c[0] if c else '?')
import subprocess
def dem(s):
    return s
for l in open(sys.argv[1]):
    m=re.match(r'(0x[0-9a-f]+)\s+call (-?0x[0-9a-f]+)',l)
    if m:
        a=int(m.group(1),16); v=int(m.group(2),16)
        if v!=-1:
            t=a+8+v*8; n=names.get(t,'?')
            n=re.sub(r'_<|>::|::_\{\{closure\}\}','',n)[-70:]
            l=l.rstrip('\n')+f'   ; {hex(t)} {n}\n'
    sys.stdout.write(l)
