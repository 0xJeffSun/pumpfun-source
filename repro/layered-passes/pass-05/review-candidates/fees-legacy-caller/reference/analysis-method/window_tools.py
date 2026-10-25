#!/usr/bin/env python3
"""Static replay of the sealed Fees create_donation_fee_pda evidence only."""
from pathlib import Path
import bisect, difflib, hashlib, json, struct
from elf_reader import Elf

ROOT = Path(__file__).resolve().parent
SHA = lambda b: hashlib.sha256(b).hexdigest()
WINDOWS = {
    'entrypoint': ((660680, 144), (542376, 144)),
    'dispatch': ((598128, 5016), (331920, 5016)),
    'wrapper': ((655904, 928), (356816, 696)),
    'parser': ((425776, 8984), (135168, 8496)),
    'handler': ((163920, 13800), (425016, 10576)),
    'program_parser': ((74128, 584), (62128, 584)),
    'parser_init_if_needed_closure': ((434760, 8184), (143664, 8184)),
    'pool_checked': ((575408, 728), (328288, 728)),
    'sharing_checked': ((442944, 744), (319192, 744)),
    'bonding_account': ((28120, 1024), (33528, 1024)),
    'bonding_checked': ((537312, 728), (321408, 728)),
    'bonding_unchecked': ((538040, 1448), (322136, 1448)),
}

def instruction(e, pc):
    op, regs, off, imm = struct.unpack_from('<BBhi', e.b, pc)
    n = 16 if op == 0x18 else 8
    q = {'pc': pc, 'opcode': op, 'dst': regs & 15, 'src': regs >> 4,
         'offset_signed': off, 'immediate_signed': imm, 'raw': e.b[pc:pc+n].hex(),
         'normalized': e.normalized[pc:pc+n].hex(), 'size': n}
    if op == 0x18:
        q['imm64_unsigned'] = (imm & 0xffffffff) | (struct.unpack_from('<I', e.b, pc+12)[0] << 32)
    if pc in e.calls:
        q['direct_target'] = e.calls[pc]
    if op == 0x8d:
        q['indirect_register'] = imm
    if (op & 7) in (5, 6) and op not in (0x85, 0x8d, 0x95):
        q['branch_target'] = pc + 8 + off * 8
    if pc in e.relocations:
        q['relocation'] = e.relocations[pc]
    return q

def instructions(e, lo, size):
    result = []; pc = lo
    while pc < lo + size:
        q = instruction(e, pc); result.append(q); pc += q['size']
    assert pc == lo + size
    return result

def extent(e, start):
    ix = bisect.bisect_right(e.entries, start)
    return (e.entries[ix] if ix < len(e.entries) else e.hi) - start

def window(e, start, size, symbols):
    ins = instructions(e, start, size)
    valid = {i['pc'] for i in ins}
    branches = [i for i in ins if 'branch_target' in i]
    return {'start': start, 'end': start+size, 'size': size,
            'raw_sha256': SHA(e.b[start:start+size]),
            'normalized_sha256': SHA(e.normalized[start:start+size]),
            'named_symbols': [f for f in symbols if f['start'] == start],
            'inferred_next_entry': start + extent(e, start),
            'instruction_count': len(ins),
            'direct_calls': [{**x, 'pc': start+x['offset'],
                              'raw_signed_operand': struct.unpack_from('<i', e.b, start+x['offset']+4)[0]}
                             for x in e.callsites(start, size)],
            'external_calls': [x for x in ins if x.get('relocation', {}).get('type') == 10],
            'indirect_calls': [x for x in ins if x['opcode'] == 0x8d],
            'branches': [{'pc': x['pc'], 'target': x['branch_target'],
                          'target_is_instruction_in_window': x['branch_target'] in valid}
                         for x in branches],
            'relocations': e.pattern(start, size)}

def comparison(o, c, a, b, n, m):
    oi = instructions(o, a, n); ci = instructions(c, b, m)
    sm = difflib.SequenceMatcher(None, [x['normalized'] for x in oi], [x['normalized'] for x in ci], autojunk=False)
    out = []
    for tag, i, j, k, l in sm.get_opcodes():
        aa = oi[i]['pc'] if i < len(oi) else a+n
        zz = oi[j]['pc'] if j < len(oi) else a+n
        bb = ci[k]['pc'] if k < len(ci) else b+m
        yy = ci[l]['pc'] if l < len(ci) else b+m
        out.append({'operation': tag, 'original': [aa, zz], 'candidate': [bb, yy],
                    'raw_equal': o.b[aa:zz] == c.b[bb:yy],
                    'normalized_equal': o.normalized[aa:zz] == c.normalized[bb:yy]})
    return {'raw_equal': n == m and o.b[a:a+n] == c.b[b:b+m],
            'normalized_equal': n == m and o.normalized[a:a+n] == c.normalized[b:b+m],
            'relocation_pattern_equal': o.pattern(a,n) == c.pattern(b,m),
            'same_offset_differing_slots': ([i for i in range(0,n,8) if o.normalized[a+i:a+i+8] != c.normalized[b+i:b+i+8]] if n == m else None),
            'mechanical_sequence_partition': out,
            'partition_limit': 'Exhaustive byte-window accounting only. Equal short instruction runs, masked relocations, and call operands do not establish CFG or semantic correspondence.'}

def data_refs(e, start, size):
    result = []
    for x in instructions(e, start, size):
        if x.get('relocation', {}).get('type') != 8: continue
        assert x['opcode'] == 0x18
        p = x['imm64_unsigned']; section = None
        for name, s in e.secs.items():
            if s[4] <= p < s[4]+s[5]: section = name; break
        data = e.b[p:p+128]
        children = []
        for off in range(0, min(128, len(e.b)-p), 8):
            at = p+off
            if at not in e.relocations or e.relocations[at]['type'] != 8: continue
            target = struct.unpack_from('<Q', e.b, at)[0] >> 32
            length = struct.unpack_from('<Q', e.b, at+8)[0] if at+16 <= len(e.b) else None
            # This is the ELF's pre-relocation word encoding, not a fabricated pointer.
            z = {'descriptor_offset': off, 'target': target, 'next_word': length,
                 'target_preview_hex': e.b[target:target+96].hex()}
            if length is not None and 0 < length <= 512 and target+length <= len(e.b):
                z['possible_slice_bytes_hex'] = e.b[target:target+length].hex()
                z['possible_slice_sha256'] = SHA(e.b[target:target+length])
            children.append(z)
        result.append({'pc': x['pc'], 'relative_offset': x['pc']-start,
                       'target': p, 'section': section, 'preview_length': len(data),
                       'preview_hex': data.hex(), 'preview_sha256': SHA(data),
                       'preview_ascii': ''.join(chr(y) if 32 <= y < 127 else '.' for y in data),
                       'relocated_words_in_preview': children,
                       'extent_status': '128-byte bounded preview, NOT a proven consumed extent; complete target ELF retained.'})
    return result

def generate():
    o = Elf(ROOT/'inputs/original.so'); c = Elf(ROOT/'inputs/candidate.so'); sy = Elf(ROOT/'inputs/symbols.so')
    assert SHA(o.b) == '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
    assert SHA(c.b) == '8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87'
    assert o.text[3] == o.text[4] and c.text[3] == c.text[4]
    assert c.b[c.lo:c.hi] == sy.b[sy.lo:sy.hi]
    idl = json.loads((ROOT/'inputs/pump_fees.json').read_text())
    ix = next(x for x in idl['instructions'] if x['name'] == 'create_donation_fee_pda')
    disc = bytes(ix['discriminator']); assert disc == hashlib.sha256(b'global:create_donation_fee_pda').digest()[:8]
    identities = []
    for name,e,ep,dp,ld,wrap,parser,handler in [
        ('original',o,660680,598128,599184,655904,425776,163920),
        ('candidate',c,542376,331920,332208,356816,135168,425016)]:
        assert e.calls[ep+128] == dp
        assert instruction(e,ld)['imm64_unsigned'] == int.from_bytes(disc,'little')
        branch=instruction(e,ld+16); assert branch['opcode'] == 0x1d
        selected=branch['branch_target']
        calls=[q for q in e.callsites(selected,112) if q['target']==wrap]
        assert len(calls)==1
        assert e.calls[wrap+160] == parser and e.calls[wrap+424] == handler
        logp=instruction(e,wrap+32)['imm64_unsigned']
        assert e.b[logp:logp+33] == b'Instruction: CreateDonationFeePda'
        assert e.relocations[wrap+56]['symbol'] == 'sol_log_'
        identities.append({'image':name,'entrypoint':ep,'entrypoint_dispatch_call':ep+128,'dispatch':dp,
                           'discriminator_instruction':ld,'discriminator_hex':disc.hex(),
                           'conditional_compare':branch,'selected_block':selected,
                           'selected_wrapper_call':selected+calls[0]['offset'],'wrapper':wrap,
                           'log_pointer':logp,'log_length':33,'log':'Instruction: CreateDonationFeePda',
                           'parser_call':wrap+160,'parser':parser,'handler_call':wrap+424,'handler':handler})
    windows={}; rows={}; refs={}
    for name,((a,n),(b,m)) in WINDOWS.items():
        windows[name]={'original':window(o,a,n,[]),'candidate':window(c,b,m,sy.funcs),'comparison':comparison(o,c,a,b,n,m)}
        rows[name]={'original':instructions(o,a,n),'candidate':instructions(c,b,m)}
        refs[name]={'original':data_refs(o,a,n),'candidate':data_refs(c,b,m)}
    # Complete direct-body mapping for the three relevant windows; this does not recursively certify all targets/data.
    original_targets=sorted({q['target'] for name in ('wrapper','parser','handler') for q in windows[name]['original']['direct_calls']})
    current_targets=sorted({q['target'] for name in ('wrapper','parser','handler') for q in windows[name]['candidate']['direct_calls']})
    mapping=[]
    for a in original_targets:
        n=extent(o,a); matches=[]
        for f in sy.funcs:
            b=f['start']
            if n==f['size'] and o.normalized[a:a+n]==c.normalized[b:b+n] and o.pattern(a,n)==c.pattern(b,n):
                matches.append({'start':b,'size':n,'symbol':f['name'],'raw_equal':o.b[a:a+n]==c.b[b:b+n],
                                'normalized_equal':True,'called_directly_by_current_windows':b in current_targets})
        mapping.append({'original_start':a,'original_end_inferred':a+n,'size_inferred':n,
                        'original_raw_sha256':SHA(o.b[a:a+n]),'original_normalized_sha256':SHA(o.normalized[a:a+n]),
                        'matches':matches,'status':'normalized complete window match; target/data closure not implied' if matches else 'unmatched complete window'})
    logs=[]
    for pc,p,length,msg in [(163976,803512,31,'donation_fee_pda already exists'),(164024,803543,42,'CreateDonationFeePda is currently disabled')]:
        assert instruction(o,pc)['imm64_unsigned']==p and o.b[p:p+length].decode()==msg
        assert msg.encode() not in c.b
        assert instruction(o,pc+16)['immediate_signed']==length
        assert o.relocations[pc+24]['symbol']=='sol_log_'
        logs.append({'instruction':pc,'target':p,'length':length,'text':msg,'sha256':SHA(o.b[p:p+length]),'absent_from_current_elf':True})
    # The same Program<T> parser and its exact 32-byte program ID are retained.
    op=instruction(o,74128+144)['imm64_unsigned'];cp=instruction(c,62128+144)['imm64_unsigned']
    assert o.b[op:op+32]==c.b[cp:cp+32]
    program={'original_id_pointer':op,'candidate_id_pointer':cp,'id_bytes_hex':o.b[op:op+32].hex(),'id_bytes_sha256':SHA(o.b[op:op+32]),'direct_targets':[]}
    oc=o.callsites(74128,584);cc=c.callsites(62128,584);assert len(oc)==len(cc)==5
    for a,b in zip(oc,cc):
        assert a['offset']==b['offset'];n=extent(o,a['target']);m=extent(c,b['target'])
        assert n==m and o.normalized[a['target']:a['target']+n]==c.normalized[b['target']:b['target']+m]
        assert o.pattern(a['target'],n)==c.pattern(b['target'],m)
        program['direct_targets'].append({'offset':a['offset'],'original':a['target'],'candidate':b['target'],'size':n,'normalized_equal':True,'relocation_pattern_equal':True})
    result={'schema':1,'scope':'read-only Fees create_donation_fee_pda; no build or runtime',
            'original_sha256':SHA(o.b),'candidate_sha256':SHA(c.b),'candidate_bytes':len(c.b),
            'symbols_sha256':SHA(sy.b),'instruction_identities':identities,'idl_instruction':ix,
            'windows':windows,'direct_body_mapping':mapping,'candidate_direct_targets':[{'target':x,'symbols':[f for f in sy.funcs if f['start']==x]} for x in current_targets],
            'original_early_logs':logs,'retained_program_parser_proof':program,'limitations':['Original extents use the next direct-call/relocation/entrypoint-derived entry; names exist only in the current symbol ELF.','Normalization masks signed direct-call operands and relocated immediates only; it does not establish callee or literal equivalence.','Every direct relocation in the recorded windows is inventoried. Bounded data previews preserve exact bytes but are not complete consumed-extent proofs for all descriptors.','No full handler equivalence, complete transitive closure, dynamic coverage, or original source text is claimed.']}
    return {'analysis.json':result,'instruction-ledger.json':rows,'data-reference-ledger.json':refs}

if __name__ == '__main__':
    for p,data in generate().items(): (ROOT/p).write_text(json.dumps(data,indent=2)+'\n')
