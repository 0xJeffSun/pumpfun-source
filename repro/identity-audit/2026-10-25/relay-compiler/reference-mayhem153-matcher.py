"""Full-helper comparison using the published v1461 matcher; analysis only."""
from pathlib import Path
import hashlib,json,struct
ROOT=Path(__file__).resolve().parent
REPO=next(p for p in ROOT.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
class Elf:
 def __init__(self,path):
  self.path=path;self.b=path.read_bytes();b=self.b;off=struct.unpack_from('<Q',b,40)[0];size,count,ni=struct.unpack_from('<HHH',b,58);self.raw=[struct.unpack_from('<IIQQQQIIQQ',b,off+i*size) for i in range(count)];ns=self.raw[ni];names=b[ns[4]:ns[4]+ns[5]];self.secs={names[s[0]:].split(b'\0',1)[0].decode():s for s in self.raw};self.text=self.secs['.text'];self.lo=self.text[4];self.hi=self.lo+self.text[5];self.symbols={};self.funcs=[]
  for kind in ['.dynsym','.symtab']:
   if kind not in self.secs:continue
   s=self.secs[kind];st=self.raw[s[6]];strings=b[st[4]:st[4]+st[5]]
   for i,p in enumerate(range(s[4],s[4]+s[5],24)):
    n,info,_,idx,value,length=struct.unpack_from('<IBBHQQ',b,p);name=strings[n:].split(b'\0',1)[0].decode()
    if kind=='.dynsym':self.symbols[i]=name
    if info&15==2 and length and self.lo<=value<self.hi:self.funcs.append({'name':name,'start':value,'size':length})
  self.relocations={};self.entries={f['start'] for f in self.funcs};entry=struct.unpack_from('<Q',b,24)[0]
  if self.lo<=entry<self.hi:self.entries.add(entry)
  if '.rel.dyn' in self.secs:
   s=self.secs['.rel.dyn']
   for i in range(s[4],s[4]+s[5],16):
    at,info=struct.unpack_from('<QQ',b,i);typ=info&0xffffffff;symbol=self.symbols.get(info>>32,'');self.relocations[at]={'type':typ,'symbol':symbol}
    if typ==8:
     ptr=(struct.unpack_from('<I',b,at+4)[0] | (struct.unpack_from('<I',b,at+12)[0]<<32)) if self.lo<=at<self.hi and b[at]==0x18 else struct.unpack_from('<Q',b,at)[0]>>32
     if self.lo<=ptr<self.hi and ptr%8==0:self.entries.add(ptr)
  self.calls={};norm=bytearray(b)
  for at in range(self.lo,self.hi,8):
   # Relocated external calls also use src=1 with imm=-1; they are not
   # self-calls or independent function-entry evidence.
   if b[at]==0x85 and b[at+1]==0x10 and self.relocations.get(at,{}).get('type')!=10:
    imm=struct.unpack_from('<i',b,at+4)[0];target=at+8+imm*8;self.calls[at]=target;norm[at+4:at+8]=bytes(4)
    if self.lo<=target<self.hi and target%8==0:self.entries.add(target)
   if at in self.relocations:
    typ=self.relocations[at]['type']
    if typ==8 and b[at]==0x18:norm[at+4:at+8]=bytes(4);norm[at+12:at+16]=bytes(4)
    elif typ==10 and b[at]==0x85:norm[at+4:at+8]=bytes(4)
  self.normalized=bytes(norm);self.entries=sorted(self.entries)
 def pattern(self,start,size):
  return [{'offset':at-start,**r} for at,r in sorted(self.relocations.items()) if start<=at<start+size]
 def callsites(self,start,size):return [{'offset':at-start,'target':target} for at,target in self.calls.items() if start<=at<start+size]
 def identity(self):return {'path':('<packet>/'+str(self.path.relative_to(ROOT)) if self.path.is_relative_to(ROOT) else str(self.path.relative_to(REPO))),'sha256':hashlib.sha256(self.b).hexdigest(),'text_sha256':hashlib.sha256(self.b[self.lo:self.hi]).hexdigest()}
def references(e,start,size):
 out=[];at=start
 while at<start+size:
  if e.b[at]==0x18 and at+16<=start+size:
   value=struct.unpack_from('<I',e.b,at+4)[0]|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
   hits=[]
   for name,s in e.secs.items():
    if s[2]&2 and s[1]!=8 and s[3]<=value<s[3]+s[5]:
     offset=s[4]+value-s[3];n=min(64,s[5]-(value-s[3]));raw=e.b[offset:offset+n]
     hits.append({'section':name,'value':value,'section_offset':value-s[3],'prefix_bytes':n,'prefix_hex':raw.hex(),'prefix_sha256':hashlib.sha256(raw).hexdigest(),'object_extent':'unproved; bounded64byteprefixnotcompleteobjectidentity'})
   out.append({'instruction_offset':at-start,'immediate':value,'relocation':e.relocations.get(at),'pointee_prefixes':hits});at+=16
  else:at+=8
 return out

def analyze():
 orig=Elf(REPO/'evidence/original/mayhem/deployed.so');out={'method':'Publishedv1461 fullfunction matching: maskonly internalcall displacement and loaderrelocationimmediates in analysis; require exactrelocationoffset/type/symbol; retain entry/nextentry/raw/callconsistency and explicit boundeddatareference records. Noexecutablespatched.','original':orig.identity(),'builds':{}}
 builds={'v152':(REPO/'repro/mayhem/sell-result-error-main-twentyfour/main/candidate.so',REPO/'repro/mayhem/sell-result-error-main-twentyfour/main/unstripped.so'),'v153':(ROOT/'build-01/candidate.so',ROOT/'build-01/unstripped.so')}
 for name,(cp,sp) in builds.items():
  candidate=Elf(cp);symbols=Elf(sp);assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
  assert candidate.text[3]==candidate.text[4] and orig.text[3]==orig.text[4]
  funcs={}
  for f in symbols.funcs:
   if f['size']<16 or not(f['name'].startswith(('_ZN4core','_ZN5alloc','_ZN3std','_ZN9hashbrown','_ZN17compiler_builtins')) or f['name'] in ['__multi3','__udivti3','__divti3','__udivmodti4','__ashlti3','__lshrti3','__ashrti3','rust_begin_unwind','custom_panic','__rust_start_panic']):continue
   funcs.setdefault((f['start'],f['size']),[]).append(f['name'])
  results=[]
  for (start,size),names in sorted(funcs.items()):
   body=candidate.b[start:start+size];needle=candidate.normalized[start:start+size];matches=[];position=orig.lo
   while (at:=orig.normalized.find(needle,position,orig.hi))>=0:
    position=at+1
    if at%8 or orig.pattern(at,size)!=candidate.pattern(start,size):continue
    next_entry=next((x for x in orig.entries if x>at),None)
    matches.append({'original_start':at,'inferred_function_entry':at in orig.entries,'next_inferred_entry':next_entry,'next_entry_equals_window_end':next_entry==at+size,'raw_byte_equality':orig.b[at:at+size]==body,'original_raw_sha256':hashlib.sha256(orig.b[at:at+size]).hexdigest(),'raw_different_byte_count':sum(a!=b for a,b in zip(body,orig.b[at:at+size])),'original_internal_calls':orig.callsites(at,size),'original_data_references':references(orig,at,size)})
   results.append({'names':names,'candidate_start':start,'bytes':size,'raw_sha256':hashlib.sha256(body).hexdigest(),'analysis_normalized_sha256':hashlib.sha256(needle).hexdigest(),'relocations':candidate.pattern(start,size),'internal_calls':candidate.callsites(start,size),'candidate_data_references':references(candidate,start,size),'matches':matches})
  mapping={x['candidate_start']:x['matches'][0]['original_start'] for x in results if len(x['matches'])==1 and x['matches'][0]['inferred_function_entry']}
  for x in results:
   for match in x['matches']:
    oc={c['offset']:c['target'] for c in match['original_internal_calls']};checked=[]
    for call in x['internal_calls']:
     if call['target'] in mapping:checked.append({'offset':call['offset'],'candidate_target':call['target'],'mapped_original_target':mapping[call['target']],'actual_original_target':oc.get(call['offset']),'agrees':mapping[call['target']]==oc.get(call['offset'])})
    match['mapped_helper_call_checks']=checked;match['mapped_helper_calls_consistent']=all(c['agrees'] for c in checked)
    cr={r['instruction_offset']:r for r in x['candidate_data_references']};orr={r['instruction_offset']:r for r in match['original_data_references']}
    match['bounded_data_prefix_comparisons']=[{'instruction_offset':k,'candidate_pointees':cr[k]['pointee_prefixes'],'original_pointees':orr[k]['pointee_prefixes'],'same_prefix_hashes':[v['prefix_sha256'] for v in cr[k]['pointee_prefixes']]==[v['prefix_sha256'] for v in orr[k]['pointee_prefixes']],'complete_data_object_identity':False} for k in cr.keys()&orr.keys() if cr[k]['pointee_prefixes'] or orr[k]['pointee_prefixes']]
  out['builds'][name]={'candidate':candidate.identity(),'symbol_source':symbols.identity(),'functions':results,'summary':{'candidate_functions':len(results),'any_instruction_and_relocation_matches':sum(bool(x['matches']) for x in results),'unique_inferred_entry_matches':len(mapping),'entry_bounded_call_consistent_matches':sum(any(m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['mapped_helper_calls_consistent'] for m in x['matches']) for x in results),'entry_bounded_raw_exact_matches':sum(any(m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['raw_byte_equality'] for m in x['matches']) for x in results)}}
 return out
if __name__=='__main__':
 out=analyze();(ROOT/'helper-results.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v['summary'] for k,v in out['builds'].items()},indent=2))
