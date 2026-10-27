from pathlib import Path
import re,json,hashlib,sys
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex/traces')/(sys.argv[1] if len(sys.argv)>1 else 'owned-control-stages')
raw=(B/'trace.log').read_bytes();text=raw.decode();fn='_ZN14token_metadata9processor4uses7utilize15process_utilize17h9789c7990f4c0b83E'
headers=list(re.finditer(r'(?m)^(?:# )?\*\*\* (?:IR Dump|Final LLVM Code)[^\n]*',text))
out=B/'stages';out.mkdir(exist_ok=True);rows=[];last=None
for i,m in enumerate(headers):
 block=text[m.end():headers[i+1].start() if i+1<len(headers) else len(text)]
 if fn not in block:continue
 ir=re.search(r'(?ms)^define [^\n]*@'+fn+r'[^\n]*\n.*?^}\n',block)
 if ir:body=ir[0]
 else:body=block
 digest=hashlib.sha256(body.encode()).hexdigest();different=digest!=last;last=digest
 calls=[l.strip() for l in body.splitlines() if 'call ' in l and any(s in l for s in ['clone','memcpy','unwrap','drop_in_place'])]
 label=f'{i:03d}';(out/(label+'.txt')).write_text(body)
 rows.append({'id':i,'header':m[0],'bytes':len(body),'sha256':digest,'changed':different,'calls':calls})
(B/'stage-index.json').write_text(json.dumps(rows,indent=2)+'\n')
for r in rows:
 if r['changed']:
  print(r['id'],r['header'],r['bytes'])
print('stages',len(rows))
