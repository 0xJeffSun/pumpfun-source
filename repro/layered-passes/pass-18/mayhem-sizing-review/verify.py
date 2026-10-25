from pathlib import Path
import hashlib,json,importlib.util,struct
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 assert {str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}==set(m)
 for n,h in m.items():assert H((P/n).read_bytes())==h,n
 s=importlib.util.spec_from_file_location('d',P/'method/disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);o=d.a.Elf((P/'original.so').read_bytes());c=d.a.Elf((P/'candidate.so').read_bytes());rows=json.loads((P/'full-selected-closure.json').read_text())
 for label,e in [('original',o),('candidate',c)]:
  for r in rows[label]:assert d.render(e,r['start'],r['end'])==(P/f'{label}-{r["start"]}.asm').read_text()
 ins=lambda e,pc:struct.unpack('<BBhi',e.at(pc,8))
 assert ins(o,186576)==(0x35,6,133,10001)
 assert ins(c,142088)==(0x25,1,1293,10000)
 for e,pc,target in [(o,187664,690936),(c,152456,590720),(o,187264,674280),(c,152352,574056),(o,97792,186552)]:
  op,r,off,imm=ins(e,pc);assert op==0x85 and pc+8+imm*8==target
 assert ins(o,187184)==(0x62,10,-8,11);assert ins(c,152272)==(0x62,10,-2688,11)
 a=next(x for x in rows['original']if x['start']==690936);b=next(x for x in rows['candidate']if x['start']==590720);assert a['normalized_sha256']==b['normalized_sha256']
 return {'status':'PASS','source_patch':False,'original_full_bodies':len(rows['original']),'candidate_full_bodies':len(rows['candidate']),'builds':0,'target_executions':0,'strict_guard_full_equivalence':False}
if __name__=='__main__':print(json.dumps(run(),indent=2))
