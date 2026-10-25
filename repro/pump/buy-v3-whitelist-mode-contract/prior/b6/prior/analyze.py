"""Offline byte and saved-evidence checks, not a BPF/Rust execution engine."""
from pathlib import Path
import gzip, hashlib, json, re, struct
from elf_reader import ELF
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
LINE=re.compile(r'^\s*([0-9a-fA-F]{4,16}):\s*((?:[0-9a-fA-F]{2} ){7,15}[0-9a-fA-F]{2}|[0-9a-fA-F]{16,32})\s')

def byte_ledger():
    e=ELF(P/'evidence/original.so');out=[]
    for f in sorted((P/'evidence').glob('*.asm')):
        ins=[]
        for line in f.read_text().splitlines():
            m=LINE.match(line)
            if not m:continue
            pc=int(m[1],16);raw=bytes.fromhex(m[2]);assert e.at(pc,len(raw))==raw
            op,reg,off,imm=struct.unpack('<BBhi',raw[:8])
            row=dict(pc=pc,raw=raw.hex())
            reloc=[r for r in e.reloc if pc<=r['offset']<pc+len(raw)]
            if reloc:row['relocations']=reloc
            if op==0x85:
                row['call']=({'kind':'relocated','symbols':[r['symbol'] for r in reloc]} if reloc else
                    {'kind':'relative','target':pc+8+8*imm} if reg==0x10 else
                    {'kind':'unresolved-immediate','operand':imm})
            elif op==0x8d:row['call']={'kind':'indirect-unresolved','operand':imm}
            elif op&7 in (5,6) and op not in (0x85,0x95):row['branch_target']=pc+8+8*off
            if op==0x18 and len(raw)==16:
                row['lddw']=(imm&0xffffffff)|(struct.unpack('<I',raw[12:])[0]<<32)
            ins.append(row)
        assert ins,f
        out.append(dict(path=str(f.relative_to(P)),instructions=ins))
    return dict(original_sha256=H(e.b),original_size=len(e.b),assembly=out,
        normalization='none: raw instruction bytes only; no proposal binary exists',
        actual_call_targets='relative operands or relocations; indirect calls unresolved')

def preservation():
    receipt=json.loads(gzip.decompress((P/'evidence/v3_configured_fee.json.gz').read_bytes()))
    previous=json.loads((P/'evidence/regressions.json').read_text())
    old={x['index']:x for x in previous};rows=[]
    for i,row in enumerate(receipt['cases']):
        if row['case']['operation']!='buy_v3':continue
        prev=old[i]
        assert row['case']==prev['case'] and row['original']['error']==prev['original_error']
        assert row['match']==prev['match'] is True
        volumes=[(k,v) for k,v in row['original']['accounts'].items()
                 if (v.get('data_hex') or '').startswith('56ff700e66359afa')]
        assert len(volumes)==1
        key,volume=volumes[0];assert volume==row['candidate']['accounts'][key]
        assert len(bytes.fromhex(volume['data_hex']))==137
        rows.append(dict(index=i,case=row['case'],original_error=prev['original_error'],match=True,
            base_mint_owner=prev['base_mint_owner'],base_mint_size=prev['base_mint_size'],
            saved_row_sha256=H(json.dumps(row,sort_keys=True,separators=(',',':')).encode()),
            volume_key=key,volume_owner=volume['owner'],volume_size=137,volume_poststate_equal=True,
            proposed_preservation='UNPROVEN: inherited ordinary fence excludes this base owner'))
    assert len(rows)==len(previous)==117
    assert all(x['base_mint_owner']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' for x in rows)
    success=[r for r in rows if r['original_error'] is None]
    assert len(success)==105
    groups=dict(sol=sum(not r['case'].get('token_quote',False) for r in success),
        tokenkeg_quote=sum(r['case'].get('token_quote',False) and not r['case'].get('quote2022',False) for r in success),
        token2022_quote=sum(r['case'].get('quote2022',False) for r in success))
    return dict(count=117,successes=105,failures=12,success_groups=groups,rows=rows,
        original_sha256=receipt['original_sha256'],candidate_sha256=receipt['candidate_sha256'],
        new_execution=False,preservation_proven_for_proposal=False)

if __name__=='__main__':
    for name,data in [('byte-ledger.json',byte_ledger()),('preservation-ledger.json',preservation())]:
        (P/name).write_text(json.dumps(data,indent=2)+'\n')
