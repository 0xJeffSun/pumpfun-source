"""SDK undefined-symbol check, saved ELF only, without executing the program.
Implements the captured driver's allowlist comparison but records all GLOBAL UND
symbol types. Empty SDK allowlist leaves authority unresolved; actual driver only warns.
"""
from pathlib import Path
import sys,json,struct,hashlib
P=Path(__file__).resolve().parent

def inspect(elf,syscalls,readelf_text=None):
 b=elf.read_bytes();assert b[:6]==b'\x7fELF\x02\x01';offset=struct.unpack_from('<Q',b,40)[0];size,count=struct.unpack_from('<HH',b,58);sections=[struct.unpack_from('<IIQQQQIIQQ',b,offset+i*size)for i in range(count)];undefined=[]
 for s in sections:
  if s[1]!=11:continue
  st=sections[s[6]];strings=b[st[4]:st[4]+st[5]]
  for at in range(s[4],s[4]+s[5],s[9]):
   n,info,other,idx,value,length=struct.unpack_from('<IBBHQQ',b,at);name=strings[n:].split(b'\0',1)[0].decode()
   if name and idx==0 and info>>4==1:undefined.append({'name':name,'type':info&15,'record_offset':at})
 allowed=set(syscalls.read_text().splitlines());allowed={s.rstrip()for s in allowed if s.rstrip()};unknown=[r for r in undefined if r['name']not in allowed]
 import re
 if readelf_text is None:driver_unknown=[r['name']for r in unknown if r['type']==0]
 else:
  entry=re.compile(r'^ *[0-9]+: [0-9a-f]{16} +[0-9a-f]+ +NOTYPE +GLOBAL +DEFAULT +UND +(.+)');driver_unknown=[]
  for line in readelf_text.splitlines():
   match=entry.match(line.rstrip())
   if match and match[1]not in allowed:driver_unknown.append(match[1])
  assert set(driver_unknown)=={r['name']for r in unknown if r['type']==0},'Actual readelf output does not agree with independently parsed ELF NOTYPE imports'
 return {'elf_sha256':hashlib.sha256(b).hexdigest(),'sdk_syscalls_sha256':hashlib.sha256(syscalls.read_bytes()).hexdigest(),'sdk_allowlist_entries':len(allowed),'all_global_undefined_symbols':undefined,'not_allowlisted':unknown,'sdk_warning_condition':bool(driver_unknown),'driver_unknown_symbols':driver_unknown,'actual_readelf_output_checked':readelf_text is not None,'official_driver_check_outcome':'WARNING_ONLY'if driver_unknown else'NO_WARNING','official_warning_messages':['The following functions are undefined and not known syscalls '+json.dumps(driver_unknown)+'.','         Calling them will trigger a run-time error.']if driver_unknown else[],'syscall_authority_status':'UNRESOLVED_EMPTY_OFFICIAL_ALLOWLIST'if not allowed else'UNRESOLVED_UNKNOWN_SYMBOLS'if driver_unknown else'ALLOWLIST_COMPARISON_ONLY','official_driver_exit_semantics':'Warnings do not fail the build; this reproduction does not fabricate a fatal gate','runtime_loader_execution_or_verification':False,'note':'Static SDK postlink check only; never claim VM/loader/exhaustive runtime acceptance. Official driver warns rather than fails on unknown entries.'}
if __name__=='__main__':
 result=inspect(Path(sys.argv[1]),P/'sdk/syscalls.txt',Path(sys.argv[3]).read_text()if len(sys.argv)>3 else None);Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));[print('WARNING: '+line,file=sys.stderr)for line in result['official_warning_messages']];raise SystemExit(0)
