# mirst.py MIRFILE FNHEAD names... : storage markers (StorageLive/Dead counts) of named debug locals in a MIR fn
import sys,re
s=open(sys.argv[1]).read();head=sys.argv[2]
i=s.find('fn '+head+'(');j=s.find('\n}\n',i);body=s[i:j]
open('/Users/shawwalters/amm100-run/lanes/mg-A-mh2/ir/last_fn.mir','w').write(body)
dbg=re.findall(r'debug (\w+) => (_\d+);',body)
want=sys.argv[3:] or sorted(set(k for k,_ in dbg))
for nm in want:
    for k,l in dbg:
        if k!=nm: continue
        sl=len(re.findall(r'StorageLive\('+l+r'\)',body)); sd=len(re.findall(r'StorageDead\('+l+r'\)',body))
        print(f'{nm}={l}:SL{sl}/SD{sd}',end='  ')
print()
