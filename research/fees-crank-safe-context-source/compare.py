"""Optional local ELF/map checks; no compiler, VM, network or receipt reader."""
if not __debug__:
    raise RuntimeError('Optimized Python disables integrity assertions; refusing to load parsers or ELF inputs')
from pathlib import Path
from collections import Counter
import argparse,bisect,hashlib,importlib.util,json,re,struct
from source_tools import read_under,verify
H=lambda b:hashlib.sha256(b).hexdigest()
PARSER_PINS={'research/fees-crank-relay-rejection/window_map.py': 'eeec82f751ea38827c5149f28590f19a3ff516c7eee57b6aa48949cbaac4a7e5', 'research/fees-crank-relay-rejection/elf_helpers.py': '92d28a886a6e5787c03572e5db380711ab11b64de4491414e9ae9b0d08858cfc', 'scripts/analyze.py': 'dd7fb38d795d4dd72a25aab0d65c2223d9f6f75d8b3ecb0de1d87d6e102910ac'}
ORIGINAL='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
BEFORE=('e6ee64ad435647525e527fabc7412ef7e51462d23d522a7f90ea2bdf71282094','da1917d0c99f17b0f392f3d04670bf1f3a0c05c0c52a9993ee1a83eb96ac1456')
AFTER=('b41ad778ba4686c478fa107e636a606ce3f06afa1a90d10e6683c71fdce3ad63','9e35146f902ef200d38d95599399bbb09f1a840f9203fe6c2595c3766aabe6e7')

def bijection(rows):
 f={};r={}
 for t,u in rows.values():
  assert t not in f or f[t]==u,'data address split'
  assert u not in r or r[u]==t,'data address merge'
  f[t]=u;r[u]=t
 return f

def descriptor(x,image,rels,address):
 assert rels.get(address,0)&0xffffffff==8
 low,p,n,line,col=struct.unpack('<IIQII',x['w'].m.at_address(image,address,24))
 assert low==0 and 0<n<=300 and 0<line<=100000 and 0<col<=300
 text=x['w'].m.at_address(image,p,n)
 assert text.endswith(b'.rs') and all(32<=v<127 for v in text)
 return {'address':address,'path_address':p,'path_bytes':n,'path_sha256':H(text),'path':text.decode(),'line':line,'column':col,'bounded_record_bytes':24}

def pointer(x,image,rels,address):
 assert rels.get(address,0)&0xffffffff==8
 lo,p=struct.unpack('<II',x['w'].m.at_address(image,address,8));assert lo==0;return p

def crank(x,override_image=None):
 image=x['c'] if override_image is None else override_image
 w=x['w']; at=w.m.at_address
 wrapper=x['unique'][656832];assert x['oc'][656832][464]==147944
 body=x['cc'][wrapper][464];a,b=x['oi'][147944],x['ci'][body]
 ar=list(x['od'][147944].items());br=list(x['cd'][body].items());assert len(ar)==len(br)==10
 expected={0:('native_mint',32,None),3:('donation_seed',16,b'donation-fee-pda'),4:('disabled_log',41,b'CrankDonationFeePda is currently disabled'),5:('zero_log',17,b'Nothing to donate'),6:('fees_program_id',32,None),7:('event_authority_seed',17,b'__event_authority'),8:('zero_log',17,b'Nothing to donate'),9:('SyncNative_discriminant',4,(17).to_bytes(4,'little'))}
 rows=[]
 for i,((ao,t),(bo,u))in enumerate(zip(ar,br)):
  row={'ordinal':i,'original_offset':ao,'candidate_offset':bo,'original_target':t,'candidate_target':u,'allocation_extent_proven':False}
  if i in expected:
   name,n,value=expected[i];v=at(x['o'],t,n);assert at(image,u,n)==v
   if value is not None:assert v==value
   row.update(kind=name,bounded_used_bytes=n,value_sha256=H(v))
  elif i==1:
   pieces=[]
   for delta in [0,16]:
    n=struct.unpack('<Q',at(x['o'],t+delta+8,8))[0];assert struct.unpack('<Q',at(image,u+delta+8,8))[0]==n and n<=1
    if n==0:assert at(x['o'],t+delta,8)==at(image,u+delta,8)==(1).to_bytes(8,'little');v=b''
    else:
     op=pointer(x,x['o'],x['orels'],t+delta);cp=pointer(x,image,x['crels'],u+delta)
     v=at(x['o'],op,n);assert at(image,cp,n)==v
    pieces.append(v.decode())
   assert pieces==['',','];row.update(kind='two_piece_format_descriptor',bounded_used_bytes=32,pieces=pieces)
  elif i==2:
   assert x['oi'][t]['bytes']==x['ci'][u]['bytes']==40 and x['oi'][t]['signature']==x['ci'][u]['signature']
   oc,cc=x['oc'][t],x['cc'][u];assert len(oc)==len(cc)==1 and oc.keys()==cc.keys()
   for off,q in oc.items():assert x['oi'][q]['signature']==x['ci'][cc[off]]['signature']
   row.update(kind='format_callback',complete_normalized_body_bytes=40,one_actual_callee_equal=True,recursive_closure=False)
  rows.append(row)
 # Ordered actual calls, NOT same-offset CFG matching for the unequal caller.
 ac=list(x['oc'][147944].items());bc=list(x['cc'][body].items());assert len(ac)==len(bc)==35
 differences=[]
 for i,((ao,t),(bo,u))in enumerate(zip(ac,bc)):
  if x['oi'][t]['signature']!=x['ci'][u]['signature']:
   differences.append({'ordinal':i,'original_offset':ao,'candidate_offset':bo,'original_target':t,'candidate_target':u,'original_bytes':x['oi'][t]['bytes'],'candidate_bytes':x['ci'][u]['bytes']})
 assert len(differences)==1 and differences[0]['original_bytes']==32 and differences[0]['candidate_bytes']==272
 return {'wrapper':wrapper,'call_offset':464,'original_body':147944,'candidate_body':body,'original_bytes':a['bytes'],'candidate_bytes':b['bytes'],'body_equal':a['signature']==b['signature'],'used_data':rows,'ordered_calls':35,'ordered_complete_callee_shapes_equal':34,'ordered_callee_differences':differences,'scope':'Bounded explicit used fields only. Complete 32-byte format descriptor fields and nested strings are checked, not historical allocation extent. Unequal caller offsets/CFG, allocator, callback recursive data semantics remain open.'}

def rodata_rows(text, expected_size):
    rows = []
    base = size = None
    for line in text.splitlines():
        m = re.fullmatch(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+) (.*)', line)
        if not m:
            continue
        v, l, z, a, name = m.groups()
        v, l, z, a = int(v, 16), int(l, 16), int(z, 16), int(a)
        name = name.strip()
        if name == '.rodata':
            assert base is None
            base, size = v, z
            continue
        if name == '.data.rel.ro':
            break
        if base is not None and ':(' in name:
            assert v == l and a > 0 and not a & (a - 1)
            owner, section = name.rsplit(':(', 1)
            assert section.endswith(')')
            rows.append({'vma': v, 'offset': v-base, 'size': z, 'alignment': a,
                         'owner': owner, 'section': section[:-1]})
    assert base is not None and rows and size == expected_size
    previous = base
    gaps = []
    for row in rows:
        expected = (previous + row['alignment'] - 1) // row['alignment'] * row['alignment']
        assert row['vma'] == expected, (row, previous, expected)
        if expected > previous:
            gaps.append({'start': previous-base, 'end': expected-base,
                         'bytes': expected-previous, 'next_alignment': row['alignment'],
                         'next_section': row['section']})
        previous = row['vma'] + row['size']
    assert previous == base + size
    return base, size, rows, gaps

def elf_rodata(b):
    assert b[:6] == b"\x7fELF\x02\x01"
    off=struct.unpack_from("<Q",b,40)[0]; es,n,idx=struct.unpack_from("<HHH",b,58)
    assert es==64
    ss=[struct.unpack_from("<IIQQQQIIQQ",b,off+i*es) for i in range(n)]
    names=b[ss[idx][4]:ss[idx][4]+ss[idx][5]]
    found=[s for s in ss if names[s[0]:].split(b"\0",1)[0]==b".rodata"]
    assert len(found)==1
    s=found[0];return s[3],b[s[4]:s[4]+s[5]]

def load_parser(root):
    for name,digest in PARSER_PINS.items():assert H(read_under(root,name))==digest,name
    spec=importlib.util.spec_from_file_location('safe_crank_pinned_windows',Path(root)/'research/fees-crank-relay-rejection/window_map.py')
    w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w);return w

def image_context(w,original,candidate,symbols,pins):
    assert H(original)==ORIGINAL and (H(candidate),H(symbols))==pins
    ol,cl,sl=[w.m.elf_layout(b)for b in [original,candidate,symbols]]
    for s in cl['sections']:
        if s['flags']&2 and s['type']!=8:
            t,=[z for z in sl['sections']if z['name']==s['name']]
            assert s['address']==t['address'] and w.m.section_data(candidate,s['name'])==w.m.section_data(symbols,s['name'])
    ow,cw=w.windows(original),w.windows(symbols);oi,ci=({f['address']:f for f in rows}for rows in [ow,cw])
    def obligations(image,windows):
        rel=dict(w.m.relocations(image));sec=next(s for s in w.m.elf_layout(image)['sections']if s['name']=='.text');starts=sorted(f['address']for f in windows)
        calls={a:{}for a in starts};data={a:{}for a in starts}
        for row in w.m.instructions(image,sec['address'],sec['size']):
            pos=sec['address']+row['offset'];start=starts[bisect.bisect_right(starts,pos)-1];off=pos-start
            if 'call_target'in row and rel.get(pos,0)&0xffffffff!=10:calls[start][off]=row['call_target']
            if rel.get(pos,0)&0xffffffff==8:data[start][off]=row['lddw_value']
        return calls,data,rel
    oc,od,orels=obligations(original,ow);cc,cd,crels=obligations(symbols,cw)
    unique={p['original']['address']:p['candidate']['address']for p in w.compare(ow,cw)['unique_pairs']}
    return dict(w=w,o=original,c=symbols,raw=candidate,ol=ol,cl=cl,sl=sl,ow=ow,cw=cw,oi=oi,ci=ci,oc=oc,cc=cc,od=od,cd=cd,orels=orels,crels=crels,unique=unique)

def cohort(x):
    oi,ci,oc,cc,od,cd=(x[k]for k in ['oi','ci','oc','cc','od','cd']);mapping=dict(x['unique']);reverse={v:k for k,v in mapping.items()}
    while True:
        n=len(mapping)
        for a,b in list(mapping.items()):
            assert oc[a].keys()==cc[b].keys() and od[a].keys()==cd[b].keys()
            pairs=[(t,cc[b][off])for off,t in oc[a].items()]+[(t,cd[b][off])for off,t in od[a].items()if t in oi and cd[b][off]in ci]
            for t,u in pairs:
                if oi[t]['signature']!=ci[u]['signature']:continue
                if t in mapping:assert mapping[t]==u
                elif u in reverse:raise AssertionError('Forced function identity collision')
                else:mapping[t]=u;reverse[u]=t
        if len(mapping)==n:break
    bound=0
    for a,b in mapping.items():
        for off,t in oc[a].items():
            if t in mapping:assert mapping[t]==cc[b][off];bound+=1
    data={(a,off):(t,cd[b][off])for a,b in mapping.items()for off,t in od[a].items()if t not in oi and cd[b][off]not in ci}
    aliases=bijection(data);locations={};positives=set();open_edges=[]
    for a,b in x['unique'].items():
        for off,t in oc[a].items():
            if oi[t]['signature']==ci[cc[b][off]]['signature']:positives.add((a,off,t))
            else:open_edges.append((a,off,t))
        for off,t in od[a].items():
            try:l=descriptor(x,x['o'],x['orels'],t)
            except (AssertionError,ValueError,StopIteration,struct.error):continue
            rr=descriptor(x,x['c'],x['crels'],cd[b][off]);fields=['path_bytes','path_sha256','path','line','column','bounded_record_bytes']
            assert all(l[k]==rr[k]for k in fields);locations[a,off]=(l['path'],l['line'],l['column'])
    assert len(mapping)==511 and bound==4226 and len(data)==1970 and len(aliases)==772
    assert len(positives)==3961 and len(locations)==183 and len(open_edges)==5
    return mapping,data,aliases,positives,locations

def map_audit(image,text):
    base,data=elf_rodata(image);mb,size,rows,gaps=rodata_rows(text,len(data));assert mb==base
    for g in gaps:assert data[g['start']:g['end']]==bytes(g['bytes'])
    payloads=Counter((r['size'],r['alignment'],H(data[r['offset']:r['offset']+r['size']]))for r in rows)
    payload_bytes=sum(r['size']for r in rows);gap_bytes=sum(g['bytes']for g in gaps);assert payload_bytes+gap_bytes==size
    return {'section_bytes':size,'input_rows':len(rows),'payload_bytes':payload_bytes,'gap_bytes':gap_bytes,'gaps':gaps},payloads

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for key in ['parser-root','original','before-candidate','before-symbols','candidate','symbols']:p.add_argument('--'+key,type=Path,required=True)
    p.add_argument('--before-map',type=Path);p.add_argument('--after-map',type=Path);p.add_argument('--mutations',action='store_true');a=p.parse_args()
    if bool(a.before_map)!=bool(a.after_map):p.error('Both maps are required together')
    verify(Path(__file__).resolve().parent);w=load_parser(a.parser_root);o=a.original.read_bytes()
    before=image_context(w,o,a.before_candidate.read_bytes(),a.before_symbols.read_bytes(),BEFORE)
    after=image_context(w,o,a.candidate.read_bytes(),a.symbols.read_bytes(),AFTER)
    bc,ac=cohort(before),cohort(after)
    assert set(bc[0])==set(ac[0]) and bc[1].keys()==ac[1].keys() and bc[2].keys()==ac[2].keys() and bc[3:]==ac[3:]
    original_ids={f['address']for f in after['ow']};normalized=[];raw=[]
    for x in [before,after]:
        sigs={f['signature']for f in x['cw']};raws={f['raw_sha256']for f in x['cw']}
        normalized.append({f['address']for f in x['ow']if f['signature']in sigs});raw.append(sum(f['raw_sha256']in raws for f in x['ow']))
    assert normalized[0]==normalized[1] and len(normalized[1])==579 and raw==[143,143]
    cr=crank(after);extended=dict(ac[1])
    for r in cr['used_data']:
        if r['kind']!='format_callback':extended[147944,r['original_offset']]=(r['original_target'],r['candidate_target'])
    assert len(extended)==1979 and len(bijection(extended))==776
    def groups(x):
        g={}
        for f in x['cw']:g.setdefault(f['name'],[]).append(f)
        return g
    pg,cg=groups(before),groups(after);assert not cg.keys()-pg.keys()
    removed=[f for n in pg.keys()-cg.keys()for f in pg[n]];assert sorted(f['bytes']for f in removed)==[392,664,688]
    changed=[n for n in pg.keys()&cg.keys()if [f['signature']for f in pg[n]]!=[f['signature']for f in cg[n]]]
    assert len(changed)==1 and cg[changed[0]][0]['address']==cr['candidate_body']
    old=pg[changed[0]][0];assert old['bytes']==12696
    for f in removed:
        callers=[a for a,calls in before['cc'].items()if f['address']in calls.values()];assert callers and set(callers)=={old['address']}
    unmatched_original=sum(after['oi'][a]['bytes']for a in original_ids-normalized[1])
    os={f['signature']for f in after['ow']};unmatched_candidate=sum(f['bytes']for f in after['cw']if f['signature']not in os)
    assert (unmatched_original,unmatched_candidate)==(59792,59760)
    mutations=[]
    if a.mutations:
        for r in cr['used_data']:
            if r['kind']=='format_callback':continue
            address=r['candidate_target']+(8 if r['kind']=='two_piece_format_descriptor'else 0)
            s=next(s for s in after['sl']['sections']if s['address']<=address<s['address']+s['size']);off=s['offset']+address-s['address'];bad=bytearray(after['c']);bad[off]^=1
            try:crank(after,bytes(bad))
            except AssertionError:mutations.append(r['ordinal'])
            else:raise AssertionError('Bounded data mutation accepted')
        assert len(mutations)==9
    maps=None
    if a.before_map:
        bt,at=a.before_map.read_text(),a.after_map.read_text()
        assert H(bt.encode())=='2b63da13d10e172e7db34e95c132c77a31fd2bf6e2e7a2473efdad2f23aedf4f' and H(at.encode())=='870979de83a701b906fc947be91a353e2fef2f2a8e11bcb2933d42c449c4b4cd'
        bm,bv=map_audit(before['raw'],bt);am,av=map_audit(after['raw'],at)
        assert bv==av and bm['input_rows']==am['input_rows']==623 and bm['payload_bytes']==am['payload_bytes']==21064
        assert bm['gap_bytes']==7 and am['gap_bytes']==19;maps={'before':bm,'after':am,'unchanged_payload_multiset':True}
    print(json.dumps({'normalized_windows':579,'raw_windows':143,'no_complete_body_gain':True,'strict_forced_identities':511,'bound_direct_calls':4226,'prior_positive_callees':3961,'Location_values':183,'data_occurrences':1970,'bijective_addresses':772,'Crank':cr,'removed_outline_bytes':[f['bytes']for f in removed],'text_residual_bytes':{'original':unmatched_original,'candidate':unmatched_candidate},'raw_common_position_differences':sum(u!=v for u,v in zip(o,after['raw'])),'meaningful_original_bytes':after['ol']['elf_extent'],'candidate_bytes':len(after['raw']),'map_comparison':maps,'used_data_mutations_rejected':mutations,'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False,'scope':'Hash-pinned local images only. Direct normalized shapes, used descriptor fields and address aliases are bounded checks, not whole allocations, arbitrary indirect/recursive semantics or historical source identity. No receipts are loaded.'},indent=2))
if __name__=='__main__':main()
