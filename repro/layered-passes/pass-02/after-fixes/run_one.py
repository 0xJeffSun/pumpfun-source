#!/usr/bin/env python3
"""Reuse exact per-program full-ledger algorithms on pinned public package inputs."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,importlib,json,shutil,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def main():
 ap=argparse.ArgumentParser();ap.add_argument('program',choices=['amm','fees']);ap.add_argument('side',choices=['before','after']);ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--check',action='store_true');args=ap.parse_args();repo=args.repo.resolve();cfg=J(P/'input-config.json')['programs'][args.program][args.side];refs=J(P/'external-inputs.json')
 for n,r in refs.items():assert H((repo/n).read_bytes())==r['sha256'],n
 out=P/'ledgers'/args.program/args.side
 if not args.check:out.mkdir(parents=True,exist_ok=False)
 with tempfile.TemporaryDirectory(prefix='layer02-'+args.program+'-')as td:
  td=Path(td)
  def cp(n,d):
   q=td/d;q.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(repo/n,q);return q
  sys.path.insert(0,str(P/'methods'/args.program));an=importlib.import_module('analyze')
  if args.program=='amm':
   base=td/'inputs/repro/pump_amm/update-event-borrow-v144'
   original=cp(cfg['original'],'inputs/evidence/original/pump_amm/deployed.so');candidate=cp(cfg['candidate'],'inputs/repro/pump_amm/update-event-borrow-v144/candidate.so');symbols=cp(cfg['symbols'],'inputs/repro/pump_amm/update-event-borrow-v144/unstripped.so')
   cp(cfg['static'],'inputs/repro/pump_amm/update-event-borrow-v144/static-comparison.json');cp(cfg['historical_inventory'],'inputs/repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json')
   for name,path in cfg['source_files'].items():
    assert H((repo/path).read_bytes())==cfg['source_inputs'][name];cp(path,'inputs/'+name)
   ao=td/'analysis';an.P=td;sys.argv=['analyze','--original',str(original),'--candidate',str(candidate),'--symbols',str(symbols),'--out',str(ao)];an.main()
   enrich=importlib.import_module('enrich');enrich.P=td;enrich.B=base;enrich.A=ao;enrich.main()
   results={f.name:f.read_bytes()for f in ao.iterdir()if f.is_file()}
   summary=J(ao/'summary.json')
  else:
   original=cp(cfg['original'],'inputs/original.so');candidate=cp(cfg['candidate'],'inputs/current/candidate.so');symbols=cp(cfg['symbols'],'inputs/current/symbols.so');cp(cfg['frozen_catalog'],'inputs/current/full-function-inventory.json');cp(cfg['source_archive'],'inputs/current/source-snapshot.tar.gz')
   (td/'input-selection.json').write_text(json.dumps({'candidate_sha256':H(candidate.read_bytes())}));(td/'inputs/current/source-sha256.json').write_text(json.dumps(cfg['source_inputs']));(td/'inputs/bounded-objects-current.json').write_text('[]\n')
   with tarfile.open(repo/cfg['source_archive'])as t:
    contents={m.name.removeprefix('./'):t.extractfile(m).read()for m in t if m.isfile()}
   assert {n:H(b)for n,b in contents.items()}==cfg['source_inputs']
   for n,b in contents.items():
    assert not PurePosixPath(n).is_absolute()and'..'not in PurePosixPath(n).parts
    f=td/'inputs/source'/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
   an.W=td;an.method.W=td;v=an.analyze();sys.path.insert(0,str(P/'methods'));extended=importlib.import_module('extended')
   more=extended.supplements('fees',v['catalog.json'],an.Elf(original),an.Elf(candidate),an.Elf(symbols),v['catalog.json']);more.pop('before-after.json');v.update(more)
   # Add every raw ELF symbol-table row without changing the frozen matcher.
   import struct
   allsyms={}
   for label,path in [('original',original),('candidate',candidate),('symbols',symbols)]:
    e=an.Elf(path);rows=[]
    for section,sec in e.secs.items():
     if sec[1]not in (2,11):continue
     st=e.raw[sec[6]];strings=e.b[st[4]:st[4]+st[5]]
     for index,at in enumerate(range(sec[4],sec[4]+sec[5],sec[9]or 24)):
      name,info,other,idx,value,size=struct.unpack_from('<IBBHQQ',e.b,at);rows.append({'table':section,'index':index,'file_offset':at,'name':strings[name:].split(b'\0',1)[0].decode(),'name_offset':name,'info':info,'other':other,'section_index':idx,'value':value,'size':size,'raw_hex':e.b[at:at+24].hex()})
    allsyms[label]=rows
   v['all-symbols.json']=allsyms
   results={n:(json.dumps(x,sort_keys=True,separators=(',',':'))+'\n').encode()for n,x in v.items()};summary=v['result.json']
  for n,b in results.items():
   if n.endswith('.json'):b=(json.dumps(json.loads(b),sort_keys=True,separators=(',',':'))+'\n').encode()
   f=out/(n+'.gz')
   if args.check:assert gzip.decompress(f.read_bytes())==b,n
   else:f.write_bytes(gzip.compress(b,mtime=0))
  print(json.dumps({'program':args.program,'side':args.side,'ledger_files':len(results),'check':args.check,'candidate_sha256':H(candidate.read_bytes()),'original_sha256':H(original.read_bytes()),'summary':summary},sort_keys=True))
if __name__=='__main__':main()
