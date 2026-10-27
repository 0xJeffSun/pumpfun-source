"""Concrete boundary mutations against the saved composition; never runs a target."""
from pathlib import Path
import base64,gzip,hashlib,importlib.util,json,shutil,struct,tempfile
spec=importlib.util.spec_from_file_location('composition_verifier',Path(__file__).resolve().parent/'verify.py')
verify=importlib.util.module_from_spec(spec)
spec.loader.exec_module(verify)

def run():
    verify.manifest_check()
    wm=verify.module('mutation_windows',verify.P/'window_map.py')
    init=verify.module('mutation_initializer',verify.P/'initializer_reference.py')
    original=(verify.ROOT/'evidence/original/mayhem/deployed.so').read_bytes();ow=wm.windows(original)
    image=verify.unzip(verify.P/'builds/composed/symbols.so.gz');cw=wm.windows(image)
    quote=next(x for x in cw if x['name']and'state9buy_quote'in x['name'])
    initializer=next(x for x in cw if x['name']and'5state10initialize17'in x['name'])
    tests=[]
    def file_offset(address):
        s=next(s for s in wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']and s['type']!=8)
        return s['offset']+address-s['address']
    def reject(fn):
        try:fn()
        except (AssertionError,ValueError,EOFError,gzip.BadGzipFile):return
        raise AssertionError('mutation accepted')
    def window(data,address):return next(x for x in wm.windows(data)if x['address']==address)
    instructions=wm.m.instructions(image,quote['address'],quote['bytes'])
    for kind in ['register','scalar','branch']:
        changed=bytearray(image)
        if kind=='register':changed[file_offset(quote['address'])+1]^=1
        elif kind=='scalar':
            op=next(x for x in instructions if x['opcode']not in [0x18,0x85]and x['immediate']!=0)
            changed[file_offset(quote['address']+op['offset'])+4]^=1
        else:
            op=next(x for x in instructions if x['opcode']in [0x15,0x1d,0x25,0x2d,0x35,0x3d,0x45,0x4d,0x55,0x5d,0x65,0x6d,0x75,0x7d])
            changed[file_offset(quote['address']+op['offset'])+2]^=1
        assert window(changed,quote['address'])['signature']!=quote['signature']
        tests.append(kind+' operand changes complete normalized body')
    rel=dict(wm.m.relocations(image));rows=wm.m.instructions(image,initializer['address'],initializer['bytes'])
    for kind,offset in [('Source',736),('vtable',920),('call',None)]:
        changed=bytearray(image)
        if kind=='call':
            op=next(x for x in rows if 'call_target'in x and rel.get(initializer['address']+x['offset'],0)&0xffffffff!=10)
            target=next(x['address']for x in cw if x['address']!=op['call_target']and x['signature']!=next(y['signature']for y in cw if y['address']==op['call_target']))
            struct.pack_into('<i',changed,file_offset(initializer['address']+op['offset'])+4,(target-initializer['address']-op['offset']-8)//8)
        else:
            op=next(x for x in rows if x['offset']==offset)
            address=op['lddw_value']
            if kind=='Source':
                pointer=struct.unpack('<Q',wm.m.at_address(image,address,8))[0]>>32
                changed[file_offset(pointer)]^=1
            else:changed[file_offset(address)+8]^=1
        assert window(changed,initializer['address'])['signature']==initializer['signature']
        reject(lambda:init.initializer_references(wm,original,ow,bytes(changed),wm.windows(changed)))
        tests.append(kind+' mutation survives body masks but fails bounded initializer checks')
    with tempfile.TemporaryDirectory()as directory:
        root=Path(directory)/'packet';shutil.copytree(verify.P,root)
        target=root/'controllers/replay_qualified_current432_historical.py';old=target.read_bytes();target.write_bytes(old+b'\n')
        reject(lambda:verify.manifest_check(root));tests.append('changed producer source rejected');target.write_bytes(old)
        extra=root/'unexpected';extra.write_bytes(b'x');reject(lambda:verify.manifest_check(root));extra.unlink();tests.append('extra unsealed input rejected')
        target=root/'builds/composed/overrides/curve-accounts/src/interface_definition.rs.gz';old=target.read_bytes();target.write_bytes(gzip.compress(gzip.decompress(old)+b'\n',mtime=0))
        saved=verify.P;verify.P=root
        try:reject(lambda:verify.source_files('composed'))
        finally:verify.P=saved
        tests.append('actual extra source line rejected by physical-line/input-map guards')
    from solders.transaction import Transaction
    runtime=verify.module('test_runtime',verify.P/'runtime_check.py')
    reports=runtime.archive(verify.P/'runtime/records.tar.xz',verify.P/'runtime/records-files.json')
    report=json.loads(reports['buy.json'])
    signed=base64.b64decode(report['cases'][0]['original']['transaction_base64'],validate=True)
    assert all(Transaction.from_bytes(signed).verify_with_results())
    changed=bytearray(signed);changed[1]^=1
    assert not all(Transaction.from_bytes(bytes(changed)).verify_with_results())
    tests.append('real signature-byte mutation fails Ed25519 verification')
    tests.extend(additional(verify,wm,image,cw,original,ow,runtime,report))
    assert len(tests)==13
    return tests

def additional(v,wm,image,cw,original,ow,runtime,report):
    import collections,copy
    counts=collections.Counter(r['signature']for r in ow)
    candidate_counts=collections.Counter(r['signature']for r in cw)
    target=next(r for r in cw if r['bytes']==328 and counts[r['signature']]==candidate_counts[r['signature']]==2)
    changed=bytearray(image)
    def offset(address):
        s=next(s for s in wm.m.elf_layout(image)['sections']if s['type']!=8 and s['address']<=address<s['address']+s['size'])
        return s['offset']+address-s['address']
    at=offset(target['address'])+1;changed[at]=(changed[at]&0xf0)|((changed[at]%16+1)%10)
    altered=collections.Counter(r['signature']for r in wm.windows(changed))
    assert sum(r['signature']in altered for r in ow)==432
    assert sum(min(n,altered[k])for k,n in counts.items())==431
    tests=['real duplicate-body mutation retains432 presence matches but loses the432nd distinct assignment']
    reader=v.module('mutation_legacy_reader',v.ROOT/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
    legacy=v.module('mutation_legacy_profile',v.ROOT/'research/mayhem-legacy-buy-cpi-ownership/verify.py')
    with tempfile.TemporaryDirectory()as directory:
        path=Path(directory)/'symbols.so';path.write_bytes(image);e=reader.Elf(path)
        f=next(s for s in e.symbols if s['info']&15==2 and 'legacy_buy_handler'in s['name']);w=e.window(f['value'],f['value']+f['size'])
        pointer=None
        for ref in w['data_references']:
            p=ref['target']
            if p not in e.rel or e.rel[p]['type']!=8:continue
            zero,text=struct.unpack_from('<II',e.b,p);length,line,column=struct.unpack_from('<QII',e.b,p+8)
            if zero==0 and 0<length<300 and 0<line<100000 and 0<column<10000 and e.b[text:text+length].endswith(b'.rs\0'):
                pointer=text;break
        assert pointer is not None
        altered_image=bytearray(image);altered_image[offset(pointer)]^=1;path.write_bytes(altered_image);after=reader.Elf(path)
        fw=after.window(f['value'],f['value']+f['size'])
        assert legacy.key(w)==legacy.key(fw)
        assert legacy.source_profile(e,w)!=legacy.source_profile(after,fw)
        tests.append('real Legacy Buy Source mutation survives body normalization but changes the seven-record profile')
    row=copy.deepcopy(report['cases'][0]);row['candidate']['before'][runtime.MAY]['data_sha256']='0'*64
    try:runtime.check_programs(row,report['original_sha256'],report['candidate_sha256'])
    except AssertionError:pass
    else:raise AssertionError('wrong executed-program hash accepted')
    tests.append('wrong executable program-account hash rejected independently of signed transaction bytes')
    return tests

if __name__=='__main__':
    print(json.dumps(dict(passed=run(),scope=__doc__),indent=2))
