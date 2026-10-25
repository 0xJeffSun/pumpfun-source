#!/usr/bin/env python3
"""Static-only full windows and error metadata; excluded business bodies opaque."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,struct,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'approved-proposal'))
from elf_reader import Elf
from analyze import window,format_selector
H=lambda b:hashlib.sha256(b).hexdigest()
def ranges(e,s=None):
 if s is None:return [(a,z-a,[])for a,z in zip(e.entries,e.entries[1:]+[e.hi])]
 d={}
 for f in s.funcs:d.setdefault((f['start'],f['size']),set()).add(f['name'])
 return [(a,n,sorted(names))for(a,n),names in sorted(d.items())]
def inventory(o,c,s):
 cr=ranges(c,s);index={}
 for a,n,names in cr:index.setdefault((n,H(c.normalized[a:a+n]),json.dumps(c.pattern(a,n),sort_keys=True)),[]).append((a,n,names))
 rows=[]
 for a,n,_ in ranges(o):
  matches=index.get((n,H(o.normalized[a:a+n]),json.dumps(o.pattern(a,n),sort_keys=True)),[])
  rows.append({'original_start':a,'original_end':a+n,'bytes':n,'original_raw_sha256':H(o.b[a:a+n]),'original_normalized_sha256':H(o.normalized[a:a+n]),'original_calls':o.callsites(a,n),'original_relocations':o.pattern(a,n),'candidate_matches':[{'start':ca,'end':ca+cn,'names':names,'raw_equal':o.b[a:a+n]==c.b[ca:ca+cn],'candidate_raw_sha256':H(c.b[ca:ca+cn]),'candidate_calls':c.callsites(ca,cn)}for ca,cn,names in matches]})
 return {'boundary':'Original direct-call/relocation inferred entries; candidate distinct symbol windows; no semantics inferred for excluded bodies.','original_windows':len(rows),'candidate_windows':len(cr),'normalized_pattern_matched_original':sum(bool(r['candidate_matches'])for r in rows),'raw_matched_original':sum(any(m['raw_equal']for m in r['candidate_matches'])for r in rows),'rows':rows,'candidate_windows_opaque':[{'start':a,'end':a+n,'bytes':n,'names':names,'raw_sha256':H(c.b[a:a+n]),'normalized_sha256':H(c.normalized[a:a+n]),'calls':c.callsites(a,n),'relocations':c.pattern(a,n)}for a,n,names in cr]}
def run():
 o=Elf(P/'approved-proposal/inputs/original.so');b=Elf(P/'approved-proposal/inputs/candidate.so');bs=Elf(P/'approved-proposal/inputs/symbols.so');c=Elf(P/'candidate.so');s=Elf(P/'unstripped.so')
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.relocations==s.relocations
 def symbol(needle):
  f=[v for v in s.funcs if needle in v['name']];assert len(f)==1,(needle,f);return f[0]
 roles=[('Debug',1436840,1441232,'PumpError$u20$as$u20$core..fmt..Debug'),('Display',1433224,1436840,'PumpError$u20$as$u20$core..fmt..Display'),('name',1405824,1432720,'PumpError4name'),('From',1432720,1433224,'From$LT$pump_recovered..PumpError$GT$')]
 pairs=[];found={}
 for role,oa,oz,needle in roles:
  f=symbol(needle);ca=f['start'];cz=ca+f['size'];found[role]=f
  pairs.append({'role':role,'original':window(o,oa,oz),'candidate':window(c,ca,cz),'symbol':f['name'],'normalized_mismatching_offsets':[k for k in range(0,min(oz-oa,cz-ca),8)if o.normalized[oa+k:oa+k+8]!=c.normalized[ca+k:ca+k+8]],'same_size':oz-oa==cz-ca,'full_normalized_equal':o.normalized[oa:oz]==c.normalized[ca:cz],'raw_equal':o.b[oa:oz]==c.b[ca:cz]})
 names={'original':[format_selector(o,1436840,n,'debug')for n in range(111)],'candidate':[format_selector(c,found['Debug']['start'],n,'debug')for n in range(111)]}
 messages={'original':[format_selector(o,1433224,n,'display')for n in range(111)],'candidate':[format_selector(c,found['Display']['start'],n,'display')for n in range(111)]}
 idl=json.loads((P/'approved-proposal/inputs/official-idl.json').read_text())['errors'];assert len(idl)==110
 assert all(x['text']==y['text']for x,y in zip(names['original'],names['candidate']))
 assert all(x['text']==y['text']for x,y in zip(messages['original'],messages['candidate']))
 assert names['candidate'][110]['text']=='QuoteMintNotWritable'
 local=[]
 for f in s.funcs:
  if 'ReconstructionError'in f['name']:local.append({'symbol':f['name'],'window':window(c,f['start'],f['start']+f['size'])})
 result={'identities':{k:{'sha256':H(e.b),'bytes':len(e.b)}for k,e in [('original',o),('baseline',b),('baseline_symbols',bs),('candidate',c),('symbols',s)]},'metadata_windows':pairs,'debug_selection':names,'display_selection':messages,'local_reconstruction_metadata':local,'full_original_byte_equality':o.b==c.b,'scope':'Complete metadata bodies/selection and opaque whole-window inventory. No new checks or business call sites inferred; stopped bodies unexamined semantically.'}
 inv={'identities':result['identities'],'before':inventory(o,b,bs),'after':inventory(o,c,s)}
 return result,inv
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--check',action='store_true');a=ap.parse_args();r,i=run()
 for n,v in [('fresh-metadata.json',r),('before-after-inventory.json',i)]:
  if a.check:assert json.loads((P/n).read_text())==v,n
  else:(P/n).write_text(json.dumps(v,indent=2)+'\n')
 print(json.dumps({'metadata':[{k:v for k,v in x.items()if k not in ['original','candidate']}for x in r['metadata_windows']],'all111names_and_messages_equal':True,'before':{k:v for k,v in i['before'].items()if k not in ['rows','candidate_windows_opaque']},'after':{k:v for k,v in i['after'].items()if k not in ['rows','candidate_windows_opaque']},'full_original_byte_equality':r['full_original_byte_equality']},indent=2))
