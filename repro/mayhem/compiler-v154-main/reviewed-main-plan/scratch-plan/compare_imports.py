"""Postbuild ELF structure/import comparison only; no bytes become compiler input."""
from pathlib import Path
import json,hashlib,struct,sys,collections

def inspect(path):
 b=path.read_bytes();assert b[:7]==b'\x7fELF\x02\x01\x01';h=struct.unpack_from('<HHIQQQIHHHHHH',b,16);typ,machine,version,entry,phoff,shoff,flags,ehsize,phentsize,phnum,shentsize,shnum,shstrndx=h
 assert(typ,machine,version,flags,ehsize,phentsize,shentsize)==(3,263,1,0,64,56,64)
 assert shoff+shnum*shentsize<=len(b)and phoff+phnum*phentsize<=len(b)
 secs=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*shentsize)for i in range(shnum)];ns=secs[shstrndx];strings=b[ns[4]:ns[4]+ns[5]];by={};names=[]
 for s in secs:
  name=strings[s[0]:].split(b'\0',1)[0].decode();names.append(name);by[name]=s
  if s[1]!=8:assert s[4]+s[5]<=len(b)
  if s[8]:assert s[8]&(s[8]-1)==0
 assert{'.text','.dynsym','.dynstr','.rel.dyn','.dynamic'}<=set(by);text=by['.text'];assert text[3]==text[4]and text[5]%8==0 and text[3]<=entry<text[3]+text[5]
 segments=[]
 for at in range(phoff,phoff+phnum*phentsize,phentsize):
  p=struct.unpack_from('<IIQQQQQQ',b,at);assert p[2]+p[5]<=len(b)and p[5]<=p[6];segments.append(p)
 tables={};imports=[]
 for idx,s in enumerate(secs):
  if s[1]not in[2,11]:continue
  assert s[9]==24 and s[5]%24==0 and s[6]<len(secs);st=secs[s[6]];strings=b[st[4]:st[4]+st[5]];rows=[]
  for at in range(s[4],s[4]+s[5],24):
   n,info,other,section,value,length=struct.unpack_from('<IBBHQQ',b,at);assert n<len(strings);name=strings[n:].split(b'\0',1)[0].decode();rows.append(name)
   if s[1]==11 and name and section==0:imports.append({'name':name,'binding':info>>4,'type':info&15})
  tables[idx]=rows
 reloc=[]
 for s in secs:
  if s[1]not in[4,9]:continue
  assert s[9]in[16,24]and s[5]%s[9]==0 and s[6]in tables
  for at in range(s[4],s[4]+s[5],s[9]):
   target,info=struct.unpack_from('<QQ',b,at);kind=info&0xffffffff;symbol=info>>32;assert symbol<len(tables[s[6]])and kind in[8,10]
   assert any(sec[3]<=target<sec[3]+sec[5]for sec in secs if sec[2]&2),'Relocation target outside allocated sections'
   reloc.append({'address':target,'type':kind,'symbol':tables[s[6]][symbol]})
 return {'sha256':hashlib.sha256(b).hexdigest(),'header':{'type':typ,'machine':machine,'flags':flags,'entry':entry},'section_names':names,'program_headers':segments,'undefined_symbols':imports,'relocation_counts':dict(collections.Counter(r['type']for r in reloc)),'relocations':reloc,'structural_checks_passed':True}
if __name__=='__main__':
 original=inspect(Path(sys.argv[1]));candidate=inspect(Path(sys.argv[2]));key=lambda r:(r['name'],r['binding'],r['type']);left=set(map(key,original['undefined_symbols']));right=set(map(key,candidate['undefined_symbols']));out={'original':original,'candidate':candidate,'undefined_import_sets_equal':left==right,'only_original':sorted(left-right),'only_candidate':sorted(right-left),'comparison_only':True,'captured_imports_used_as_sdk_or_compiler_input':False,'runtime_loader_or_syscall_authority_proven':False};Path(sys.argv[3]).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in['original','candidate']}))
