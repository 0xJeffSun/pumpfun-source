"""UNEXECUTED pure saved-readelf-text warning reconstruction. No ELF/tool calls."""
from pathlib import Path
import re,json,argparse
ENTRY=re.compile(r'^ *[0-9]+: [0-9a-f]{16} +[0-9a-f]+ +NOTYPE +GLOBAL +DEFAULT +UND +(.+)')
def reconstruct(syscalls,readelf_text):
 known={line.rstrip() for line in syscalls.splitlines()};unknown=[]
 for line in readelf_text.splitlines():
  m=ENTRY.search(line.rstrip())
  if m and m[1] not in known:unknown.append(m[1])
 return {'unknown_matching_symbols':unknown,'driver_semantics':'warnings only, not a failing return','full_import_set_claimed':False,'compiler_invocations':0,'target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--syscalls',type=Path,required=True);a.add_argument('--saved-readelf',type=Path,required=True);x=a.parse_args();print(json.dumps(reconstruct(x.syscalls.read_text(),x.saved_readelf.read_text()),indent=2))
