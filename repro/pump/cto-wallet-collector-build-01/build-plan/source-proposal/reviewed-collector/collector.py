"""Exactly two approved non-executable error literals; no code decode/pointer following."""
from pathlib import Path
import argparse,hashlib,json,struct,traceback
P=Path(__file__).resolve().parent;REQUEST=P/'request';IMAGE=P.parent/'pr8-review/evidence/original/pump/deployed.so';OUT=P.parent/'cto-wallet-two-display-literals';H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
REQUEST_SEAL='4c828003394a1bc721170f414320f31427093678d453195923c1552bae82fb01'
def sha_file(p):
 h=hashlib.sha256()
 with p.open('rb')as f:
  while chunk:=f.read(1024*1024):h.update(chunk)
 return h.hexdigest()
def translate(section,start,size):
 _,typ,flags,va,off,length,_,_,_,_=section
 if typ==8 or not flags&2 or flags&4 or size<=0 or start<va or start+size>va+length:return None
 return off+(start-va)
def excludes_relocations(start,size,targets):return all(not(start<target+16 and target<start+size)for target in targets)
def request_check():
 assert H((REQUEST/'manifest.json').read_bytes())==REQUEST_SEAL
 for n,h in J(REQUEST/'manifest.json').items():
  b=(REQUEST/n).read_bytes();assert H(b)==(h if isinstance(h,str)else h['sha256'])
 q=J(REQUEST/'REQUEST.json');assert q['total_new_bytes_maximum']==182 and [(r['literal_start'],r['literal_bytes'])for r in q['ranges']]==[(1806577,91),(1808676,91)]
 return q

def collect():
 q=request_check();assert not OUT.exists();OUT.mkdir();result={'state':'failed','request_seal':REQUEST_SEAL,'new_literal_bytes_read':0,'literal_read_attempts':0,'literal_reads':[],'metadata_reads':[],'scope':'Two exact nonexecDisplayliteralextents only, no body/parser/callee/adjacent/pointer expansion','code_decoder_invocations':0,'target_executions':0,'network_requests':0}
 try:
  assert not IMAGE.is_symlink();result['image_sha256_before']=sha_file(IMAGE);assert result['image_sha256_before']==q['original_sha256'];size=IMAGE.stat().st_size
  with IMAGE.open('rb')as f:
   def readmeta(offset,n):
    assert 0<=offset<=size and 0<=n<=64*1024*1024 and offset+n<=size
    f.seek(offset);b=f.read(n);result['metadata_reads'].append({'offset':offset,'bytes':len(b),'sha256':H(b)});assert len(b)==n;return b
   header=readmeta(0,64);assert header[:6]==b'\x7fELF\x02\x01';fields=struct.unpack('<16sHHIQQQIHHHHHH',header);assert fields[2]==263 and fields[1]==3,'Only captured ET_DYN VA relocation semantics supported'
   shoff,entsize,count=fields[6],fields[11],fields[12];assert entsize==64 and 0<count<256;raw=readmeta(shoff,count*64);sections=[struct.unpack_from('<IIQQQQIIQQ',raw,i*64)for i in range(count)];targets=[];relocation_tables=[]
   for i,s in enumerate(sections):
    if s[1]not in [4,9]:continue
    entry=s[9]or(24 if s[1]==4 else 16);assert entry==(24 if s[1]==4 else 16)and s[5]%entry==0
    b=readmeta(s[4],s[5]);sites=[]
    for at in range(0,len(b),entry):target,info=struct.unpack_from('<QQ',b,at);targets.append(target);sites.append({'target_va':target,'type':info&0xffffffff,'conservative_span_bytes':16})
    relocation_tables.append({'section_index':i,'entries':sites,'table_sha256':H(b)})
   result['relocation_tables']=relocation_tables;result['sections']=[{'index':i,'type':s[1],'flags':s[2],'va':s[3],'file_offset':s[4],'bytes':s[5]}for i,s in enumerate(sections)]
   ranges=[]
   for row in q['ranges']:
    start,n=row['literal_start'],row['literal_bytes'];candidates=[(i,translate(s,start,n))for i,s in enumerate(sections)if translate(s,start,n)is not None];assert len(candidates)==1;index,offset=candidates[0];assert 0<=offset and offset+n<=size and excludes_relocations(start,n,targets)
    for other_i,other in enumerate(sections):
     if other_i==index:continue
     assert not(other[2]&2 and other[5]>0 and start<other[3]+other[5]and other[3]<start+n),'Allocated VA alias/partial overlap'
     assert not(other[2]&4 and other[1]!=8 and other[5]>0 and offset<other[4]+other[5]and other[4]<offset+n),'Executable file-byte alias'
    ranges.append((row,index,offset))
   for row,index,offset in ranges:
    f.seek(offset);result['literal_read_attempts']+=1;b=f.read(row['literal_bytes']);result['new_literal_bytes_read']+=len(b);name=str(row['error'])+'.bin';(OUT/name).write_bytes(b);record={'error':row['error'],'va':row['literal_start'],'file_offset':offset,'section_index':index,'bytes':len(b),'requested_bytes':91,'sha256':H(b),'file':name,'relocation_overlap':False};result['literal_reads'].append(record);assert len(b)==91;record['text_utf8']=b.decode('utf-8')
  result['image_sha256_after']=sha_file(IMAGE);assert result['image_sha256_after']==result['image_sha256_before']and result['new_literal_bytes_read']==182;result['state']='PASS_EXACT182_NONEXEC_LITERAL_BYTES'
 except BaseException:result['failure']=traceback.format_exc()
 finally:
  if result['literal_read_attempts']>0:
   try:
    result['image_sha256_after']=sha_file(IMAGE);assert result['image_sha256_after']==result['image_sha256_before']
   except BaseException:result['state']='failed';result['after_hash_failure']=traceback.format_exc()
 (OUT/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:result[k]for k in ['state','new_literal_bytes_read','literal_reads','failure']if k in result},indent=2));return result['state'].startswith('PASS')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--collect',action='store_true');p.add_argument('--expected-request-seal',required=True);a=p.parse_args();assert a.expected_request_seal==REQUEST_SEAL;request_check()
 if a.collect:raise SystemExit(0 if collect()else 2)
 print('PASS request integrity only; no original image opened or literal read')
