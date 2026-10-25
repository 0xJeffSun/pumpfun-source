"""Verify static inventory only; no program instructions are executed."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
load=lambda p:json.loads(p.read_text())
manifest=load(W/'manifest-sha256.json')
assert set(manifest)=={str(p.relative_to(W)) for p in W.rglob('*') if p.is_file() and p!=W/'manifest-sha256.json' and '__pycache__' not in p.parts}
for path,digest in manifest.items():assert sha((W/path).read_bytes())==digest,path
for row in load(W/'inputs.json'):assert sha((W/row['copy']).read_bytes())==row['sha256']
sys.path.insert(0,str(W))
from inventory import inventory,near_match_leads,Elf
reports={}
for program in ['fees','mayhem']:
    reports[program]=inventory(program)
    assert reports[program]==load(W/(program+'-functions.json'))
assert near_match_leads(reports)==load(W/'near-match-leads.json')
h=load(W/'social-v2-box-hypothesis.json')
assert sha((W/'inputs/current-social.rs').read_bytes())==h['source_sha256']
assert 'pub quote_mint:InterfaceAccount<' in (W/'inputs/current-social.rs').read_text().splitlines()[h['source_line']-1]
es={side:Elf((W/'inputs'/('fees-'+side+'.so')).resolve()) for side in ['candidate','original']}
for side,e in es.items():
    assert sha(e.b)==h[side+'_sha256']
    b=h[side+'_exit'];assert sha(e.b[b['start']:b['end']])==b['raw_sha256']
    call=h['dispatcher_binding'][side];pc=call['call_pc'];assert e.b[pc:pc+8].hex()==call['raw_hex']
    assert pc+8+struct.unpack_from('<i',e.b,pc+4)[0]*8==call['target']==b['start']
    for pair in h['direct_call_pairs']:
        c=pair[side];pc=c['pc'];assert e.b[pc:pc+8].hex()==c['raw_hex']
        assert pc+8+struct.unpack_from('<i',e.b,pc+4)[0]*8==c['target']
    for ref in h['bounded_literals']:
        r=ref[side];pc=r['pc'];assert e.b[pc:pc+16].hex()==r['raw_instruction_hex']
        ptr=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
        assert ptr==r['address'];n=ref['bytes'];sec=next(s for s in e.raw if s[1]!=8 and s[3]<=ptr and ptr+n<=s[3]+s[5])
        pos=sec[4]+ptr-sec[3];data=e.b[pos:pos+n]
        assert data.hex()==r['data_hex'] and sha(data)==r['sha256']
    decoded=[]
    for line in (W/('social-v2-exit-'+side+'.asm')).read_text().splitlines():
        parts=line.split('\t')
        if len(parts)<3 or not parts[0].strip().endswith(':'):continue
        pc=int(parts[0].strip()[:-1])*8;raw=bytes.fromhex(parts[1]);assert e.b[pc:pc+len(raw)]==raw
        decoded.extend(range(pc,pc+len(raw),8))
    assert decoded==list(range(b['start'],b['end'],8))
print(json.dumps(dict(files=len(manifest),source_edits=0,builds=0,runtime_cases=0,
                      tables={k:v['summary'] for k,v in reports.items()},quote_mint_exit_call_pairs=7),indent=2))
