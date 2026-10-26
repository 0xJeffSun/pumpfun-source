"""SDK undefined-symbol check, saved ELF only, without executing the program.
Implements the captured driver's allowlist comparison but records all GLOBAL UND
symbol types. Empty SDK allowlist is explicit PENDING, never a validation PASS.
"""
from pathlib import Path
import sys,json,struct,hashlib
P=Path(__file__).resolve().parent

def inspect(elf,syscalls):
 b=elf.read_bytes();assert b[:6]==b'\x7fELF\x02\x01';offset=struct.unpack_from('<Q',b,40)[0];size,count=struct.unpack_from('<HH',b,58);sections=[struct.unpack_from('<IIQQQQIIQQ',b,offset+i*size)for i in range(count)];undefined=[]
 for s in sections:
  if s[1]!=11:continue
  st=sections[s[6]];strings=b[st[4]:st[4]+st[5]]
  for at in range(s[4],s[4]+s[5],s[9]):
   n,info,other,idx,value,length=struct.unpack_from('<IBBHQQ',b,at);name=strings[n:].split(b'\0',1)[0].decode()
   if name and idx==0 and info>>4==1:undefined.append({'name':name,'type':info&15,'record_offset':at})
 allowed=set(syscalls.read_text().splitlines());allowed={s.rstrip()for s in allowed if s.rstrip()};unknown=[r for r in undefined if r['name']not in allowed]
 return {'elf_sha256':hashlib.sha256(b).hexdigest(),'sdk_syscalls_sha256':hashlib.sha256(syscalls.read_bytes()).hexdigest(),'sdk_allowlist_entries':len(allowed),'all_global_undefined_symbols':undefined,'not_allowlisted':unknown,'sdk_warning_condition':bool(unknown),'validation_status':'PENDING_EMPTY_SDK_ALLOWLIST'if not allowed else'FAIL_UNKNOWN_SYSCALLS'if unknown else'PASS_ALLOWLIST_ONLY','runtime_loader_execution_or_verification':False,'note':'Static SDK postlink check only; never claim VM/loader/exhaustive runtime acceptance. Official driver warns rather than fails on unknown entries.'}
if __name__=='__main__':
 result=inspect(Path(sys.argv[1]),P/'sdk/syscalls.txt');Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));raise SystemExit(0 if result['validation_status']=='PASS_ALLOWLIST_ONLY'else 2)
