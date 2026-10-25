from pathlib import Path
import argparse,csv,hashlib,io,json,os,re,struct,subprocess
HERE=Path(__file__).resolve().parent
parser=argparse.ArgumentParser(description='Reproduce the pinned source-gap audit from immutable Git objects, without executing contracts.')
parser.add_argument('--repo',type=Path,default=next(p for p in HERE.parents if (p/'repro/programs.json').is_file()))
parser.add_argument('--ref',default='3c5b492be7ed793e062bc14f57c7abf3b3823c61')
parser.add_argument('--output',type=Path,required=True)
args=parser.parse_args();ROOT=args.repo.resolve();OUT=args.output.resolve();OUT.mkdir(parents=True,exist_ok=False);os.chdir(ROOT)
REF=subprocess.check_output(['git','rev-parse',args.ref],text=True).strip()
def blob(p):return subprocess.check_output(['git','show',REF+':'+p],stderr=subprocess.DEVNULL)
def text(p):return blob(p).decode()
def obj(p):return json.loads(blob(p))
def sha(x):return hashlib.sha256(x).hexdigest()
def elf(x):
 assert x[:5]==b'\x7fELF\x02';endian='<'if x[5]==1 else'>'
 shoff=struct.unpack_from(endian+'Q',x,40)[0];size,n,strings=struct.unpack_from(endian+'HHH',x,58)
 headers=[struct.unpack_from(endian+'IIQQQQIIQQ',x,shoff+i*size)for i in range(n)]
 names=x[headers[strings][4]:headers[strings][4]+headers[strings][5]]
 sections={}
 for h in headers:
  name=names[h[0]:].split(b'\0')[0].decode();sections[name]={'offset':h[4],'bytes':h[5],'sha256':sha(x[h[4]:h[4]+h[5]])}
 used=max([64,shoff+n*size]+[h[4]+h[5]for h in headers if h[1]!=8])
 return {'allocation_bytes':len(x),'elf_used_end':used,'trailing_bytes':len(x)-used,'trailing_all_zero':not any(x[used:]),'sections':sections}
status=obj('repro/status.json');completion=obj('repro/completion.json'); rows=[]; drift=[];measurements={}
paths={'pump':'programs/pump','pump_amm':'programs/pump-amm','pump_fees':'programs/pump-fees','mayhem':'programs/mayhem'}
comp={(x['program'],x['instruction']):x for x in completion['instructions']}
for program,base in paths.items():
 s=text(base+'/src/lib.rs');start=s.index('#[program]');depth=0;seen=False;end=None
 for i,c in enumerate(s[start:]):
  if c=='{':depth+=1;seen=True
  elif c=='}':depth-=1
  if seen and depth==0:end=start+i+1;break
 module=s[start:end];decls={m.group(1):s[:start+m.start()].count('\n')+1 for m in re.finditer(r'pub fn (\w+)',module)}
 idl=[]
 if program!='mayhem':idl=[x['name']for x in obj('evidence/upstream/'+program+'.json')['instructions']]
 else:idl=sorted(x['instruction']for x in completion['instructions']if x['program']==program)
 for name in idl:
  disposition=comp.get((program,name),{});implementation='missing_entrypoint'if name not in decls else 'entrypoint_present'
  rows.append({'program':program,'instruction':name,'entrypoint':implementation,'entrypoint_source':base+'/src/lib.rs','entrypoint_line':decls.get(name),'completion_status':disposition.get('status'),'completion_candidate':disposition.get('candidate_artifact'),'current_candidate':status[program]['candidate_artifact'],'compiler':status[program].get('compiler'),'byte_identical':status[program].get('full_byte_equality'),'disposition_limitation':disposition.get('limitation')})
 current=status[program]['candidate_artifact'];old=completion['current_validation']['programs'][program]['candidate_artifact'];drift.append({'program':program,'status_candidate':current,'completion_candidate':old,'different':current!=old,'source_entrypoints':len(decls),'idl_or_identified_instructions':len(idl),'missing_entrypoints':sorted(set(idl)-set(decls)),'extra_entrypoints':sorted(set(decls)-set(idl))})
 original=blob('evidence/original/'+program+'/deployed.so');a=elf(original)
 try: candidate=blob(current)
 except subprocess.CalledProcessError:
  measurements[program]={'candidate_path':current,'candidate_missing_from_git_tree':True,'original':a};continue
 b=elf(candidate)
 report=obj(status[program]['comparison_report']);measurements[program]={'original':a,'candidate':b,'candidate_path':current,'candidate_sha256':sha(candidate),'build_selected_toolchain':report.get('selected_toolchain'),'full_bytes_equal':original==candidate,'elf_used_bytes_equal':original[:a['elf_used_end']]==candidate[:b['elf_used_end']],'text_byte_delta':b['sections']['.text']['bytes']-a['sections']['.text']['bytes'],'text_sha_equal':a['sections']['.text']['sha256']==b['sections']['.text']['sha256']}
tracked=subprocess.check_output(['git','ls-tree','-r','--name-only',REF],text=True).splitlines()
fences=[]
for p in tracked:
 if any(p.startswith(base+'/src/') for base in paths.values())and p.endswith('.rs'):
  for i,line in enumerate(text(p).splitlines(),1):
   if re.search(r'ReconstructionBranchUnsupported|unimplemented!|todo!|let _ = partial_fill|unparsed_trailing_field|field_\d+|unknown_|static.only|outside this|bounded branch',line,re.I):fences.append({'path':p,'line':i,'text':line.strip()})
result={'ref':REF,'scope':'Read-only audit of current tracked source/IDL/status/completion and ELF bytes; no VM execution.','handler_rows':rows,'candidate_drift':drift,'binary_measurements':measurements,'explicit_source_boundaries':fences}
(OUT/'audit.json').write_text(json.dumps(result,indent=2)+'\n')
with (OUT/'handlers.csv').open('w')as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
print(json.dumps({'ref':REF,'handlers':len(rows),'drift':drift,'measurements':{k:{n:v.get(n) for n in ['candidate_path','candidate_sha256','build_selected_toolchain','text_byte_delta','text_sha_equal','candidate_missing_from_git_tree']}for k,v in measurements.items()},'boundary_rows':len(fences)},indent=2))
