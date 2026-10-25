"""Independent read-only source and ELF checks of the two frozen public packages."""
from pathlib import Path, PurePosixPath
import hashlib, json, struct, tarfile, tempfile

H = lambda b: hashlib.sha256(b).hexdigest()
J = lambda p: json.loads(p.read_text())
PACKAGES = {
    'amm': ('repro/pump_amm/create-config-shared-methods-v144', 'manifest.json',
            'af3d4992a4a9f4b01375d1fec610fb902bab321b5dce418f315e6a8bd6716dd8'),
    'fees': ('repro/pump_fees/donation-event-account-v144', 'manifest-sha256.json',
             'a544615738c62279f1ebfd9dae4107b1db5640ac55f05d25f65e939933f91340'),
}

def seal(p, name, digest):
    assert H((p/name).read_bytes()) == digest
    rows = J(p/name)
    if 'files' in rows: rows = rows['files']
    found = {}
    for f in p.rglob('*'):
        assert not f.is_symlink(), f
        if f.is_file() and f != p/name:
            assert not f.name.endswith('-keypair.json')
            found[str(f.relative_to(p))] = H(f.read_bytes())
    assert found == {n: r['sha256'] if isinstance(r, dict) else r for n, r in rows.items()}
    return len(rows)

def archive(p):
    result = {}
    with tarfile.open(p) as t:
        for m in t:
            n = PurePosixPath(m.name)
            assert m.isfile() and not n.is_absolute() and '..' not in n.parts
            assert m.name not in result and not n.name.endswith('-keypair.json')
            result[m.name] = t.extractfile(m).read()
    return result

class Image:
    """Small ELF64 reader; normalization is exclusively in memory."""
    def __init__(self, p):
        self.b = p.read_bytes(); b = self.b
        assert b[:6] == b'\x7fELF\x02\x01'
        start = struct.unpack_from('<Q', b, 40)[0]
        step, count, names = struct.unpack_from('<HHH', b, 58)
        rows = [struct.unpack_from('<IIQQQQIIQQ', b, start+i*step) for i in range(count)]
        names = rows[names]; names = b[names[4]:names[4]+names[5]]
        sections = {names[r[0]:].split(b'\0')[0].decode(): r for r in rows}
        t = sections['.text']; self.lo, self.hi = t[4], t[4]+t[5]
        # These recorded SBF ELFs use the same virtual/file text offsets.
        assert t[3] == t[4]
        symbols = {}; self.functions = {}
        for section in ['.dynsym', '.symtab']:
            if section not in sections: continue
            s = sections[section]; sr = rows[s[6]]; strings = b[sr[4]:sr[4]+sr[5]]
            for i, off in enumerate(range(s[4], s[4]+s[5], 24)):
                n, info, other, idx, value, length = struct.unpack_from('<IBBHQQ', b, off)
                name = strings[n:].split(b'\0')[0].decode()
                if section == '.dynsym': symbols[i] = name
                if info & 15 == 2 and length and self.lo <= value < self.hi:
                    self.functions.setdefault(value, set()).add(length)
        self.relocs = {}; self.calls = {}; self.entries = set(self.functions)
        entry = struct.unpack_from('<Q', b, 24)[0]
        if self.lo <= entry < self.hi: self.entries.add(entry)
        r = sections.get('.rel.dyn')
        if r:
            for off in range(r[4], r[4]+r[5], 16):
                at, info = struct.unpack_from('<QQ', b, off); kind = info & 0xffffffff
                self.relocs[at] = (kind, symbols.get(info >> 32, ''))
                if kind == 8:
                    ptr = self.ptr(at) if self.lo <= at < self.hi and b[at] == 0x18 else struct.unpack_from('<Q', b, at)[0] >> 32
                    if self.lo <= ptr < self.hi and ptr % 8 == 0: self.entries.add(ptr)
        normal = bytearray(b)
        for at in range(self.lo, self.hi, 8):
            kind = self.relocs.get(at, (None,))[0]
            if b[at:at+2] == b'\x85\x10' and kind != 10:
                target = at+8+8*struct.unpack_from('<i', b, at+4)[0]
                self.calls[at] = target
                normal[at+4:at+8] = bytes(4)
                if self.lo <= target < self.hi and target % 8 == 0: self.entries.add(target)
            if kind == 8 and b[at] == 0x18:
                normal[at+4:at+8] = bytes(4); normal[at+12:at+16] = bytes(4)
            elif kind == 10 and b[at] == 0x85: normal[at+4:at+8] = bytes(4)
        self.normal = bytes(normal)
        entries = sorted(self.entries); self.ends = dict(zip(entries, entries[1:]+[self.hi]))
    def ptr(self, at):
        return struct.unpack_from('<I', self.b, at+4)[0] | struct.unpack_from('<I', self.b, at+12)[0] << 32
    def pattern(self, at, size):
        return [(p-at, *v) for p, v in sorted(self.relocs.items()) if at <= p < at+size]
    def body(self, row, symbols=None, inferred=False):
        at = row.get('address', row.get('start')); size = row.get('bytes', row.get('size'))
        assert self.lo <= at < at+size <= self.hi
        assert H(self.b[at:at+size]) == row['raw_sha256']
        assert H(self.normal[at:at+size]) == row['normalized_sha256']
        if inferred: assert self.ends[at] == at+size
        if symbols: assert symbols.functions[at] == {size}
        return at, size

def pair(o, c, a, n, b, k):
    return n == k and o.normal[a:a+n] == c.normal[b:b+k] and o.pattern(a,n) == c.pattern(b,k)

def inspect_amm(p):
    s = p/'scratch'
    seal(s, 'manifest.json', 'e8c4409a74d83e3e33c8a0bc44d7430b6bd92fbe2b230c4de425400410e78d0b')
    base = J(s/'baseline-source-sha256.json'); proposed = J(s/'proposed-source-sha256.json')
    added = sorted(set(proposed)-set(base)); changed = sorted(n for n in base if base[n] != proposed[n])
    assert len(base) == 18 and len(proposed) == 22
    assert changed == ['programs/pump-amm/src/lib.rs','programs/pump-amm/src/state.rs']
    assert added == ['programs/pump-amm/src/instructions/admin/create_config.rs','programs/pump-amm/src/instructions/admin/mod.rs','programs/pump-amm/src/instructions/mod.rs','programs/pump-amm/src/state/global_config.rs']
    assert J(p/'build-comparison.json')['source_sha256'] == proposed
    for n,h in proposed.items(): assert H((p/'source'/n).read_bytes()) == h == H((s/'source'/n).read_bytes())
    assert (p/'candidate.so').read_bytes() == (s/'candidate.so').read_bytes()
    o = Image(s/'prebuild/prerequisites/inputs/evidence/original/pump_amm/deployed.so')
    c, symbols = Image(p/'candidate.so'), Image(p/'unstripped.so')
    report = J(p/'static-comparison.json'); roots = report['roots']; rows = []
    for name,r in roots.items():
        a,n = o.body(r['original'], inferred=True); b,k = c.body(r['candidate'], symbols)
        equal = pair(o,c,a,n,b,k); assert equal == r['complete_normalized_equal']
        diffs = [off for off in range(0,min(n,k),8) if o.normal[a+off:a+off+8] != c.normal[b+off:b+off+8]]
        assert diffs == [v['offset'] for v in r['normalized_instruction_differences_in_shared_extent']]
        for t in r['direct_targets']:
            oa,on = o.body(t['original_target'], inferred=True)
            assert o.calls[t['original_call']] == oa
            if t['aligned_candidate_target'] is not None:
                ca,cn = c.body(t['aligned_candidate_target'], symbols)
                assert c.calls[t['aligned_candidate_call']] == ca
                assert pair(o,c,oa,on,ca,cn) == t['complete_normalized_equal']
        rows.append({'name':name,'original_address':a,'candidate_address':b,'original_bytes':n,'candidate_bytes':k,'normalized_match':equal,'different_instruction_slots':diffs})
    first = ['create_wrapper','create_handler','create_context','init_helper','recipient_setter','create_event']
    direct = [r for n in first for r in roots[n]['direct_targets']]
    assert len(direct) == 112 and sum(r['complete_normalized_equal'] for r in direct) == 107
    bounded = []
    for r in report['bounded_data']:
        assert r['reference_instruction_shape_preserved']
        op,cp = o.ptr(r['original_reference']), c.ptr(r['candidate_reference'])
        assert cp == r['candidate_pointer']
        if r['kind'] == 'bounded_direct_bytes':
            n = r['original_bytes']; eq = o.b[op:op+n] == c.b[cp:cp+n]
            assert eq == r['equal_same_extent']; bounded.append(eq)
            assert H(o.b[op:op+n]) == r['original_sha256'] and H(c.b[cp:cp+n]) == r['candidate_same_extent_sha256']
        elif r['kind'] == 'single_seed_fat_pointer':
            on = struct.unpack_from('<Q',o.b,op+8)[0]; cn = struct.unpack_from('<Q',c.b,cp+8)[0]
            oa = struct.unpack_from('<Q',o.b,op)[0] >> 32; ca = struct.unpack_from('<Q',c.b,cp)[0] >> 32
            assert on == cn and o.b[oa:oa+on] == c.b[ca:ca+cn]; bounded.append(True)
    assert len(bounded) == 33 and sum(bounded) == 30
    assert len(report['bounded_data'])-len(bounded) == 11
    summary = J(s/'runtime-summary.json'); assert summary['case_count'] == 17462 and summary['signature_count'] == 35418
    assert summary['comparison_transactions'] == 34924 and summary['existing_setup_transactions'] == 150
    status = J(p/'status-pump_amm.json'); assert len(status['implemented_handlers']) == 37 and status['static_only_handlers'] == ['create_config'] and status['create_config_runtime_successes'] == 0
    return {'changed_existing_source':changed,'added_source':added,'compiler_inputs':22,'roots':rows,'initializer_direct_calls':112,'initializer_matching_direct_targets':107,'bounded_data_spans':33,'matching_bounded_data_spans':30,'unclosed_compiler_metadata_references':11,'runtime':summary,'source_only_context_added':True,'authentic_initializer_successes':0}

def inspect_fees(p):
    data = archive(p/'scratch-handoff.tar.gz'); ms = data['manifest-sha256.json']
    assert H(ms) == '5c9bcb6673f89c5f7b0ab33610f11f91ffeae57c69d4320fee958f8afa2ce856'
    assert {n:H(b) for n,b in data.items() if n!='manifest-sha256.json'} == json.loads(ms)
    with tempfile.TemporaryDirectory(prefix='acceptance-saved-') as temp:
        t = Path(temp)
        for name in ['proposal/inputs/original.so','pump_fees_candidate.so','symbols.so']:
            dest=t/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data[name])
        o=Image(t/'proposal/inputs/original.so');c=Image(p/'pump_fees_candidate.so');symbols=Image(p/'symbols.so')
        assert c.b == data['pump_fees_candidate.so']
        report=J(p/'caller-static-proof.json'); rows=[]
        for name,r in report['windows'].items():
            a,n=o.body(r['original'],inferred=True);b,k=c.body(r['candidate'],symbols)
            eq=pair(o,c,a,n,b,k)
            assert eq == (r['comparison']['normalized_equal'] and r['comparison']['relocation_pattern_equal'])
            rows.append({'name':name,'original_address':a,'candidate_address':b,'original_bytes':n,'candidate_bytes':k,'normalized_match':eq})
        for r in report['direct_target_inventory'].values():
            (o if r['image']=='original' else c).body(r['window'],symbols if r['image']=='candidate' else None,inferred=r['image']=='original')
        targets=[r for values in report['matched_root_direct_targets'].values() for r in values]
        matches=0
        for r in targets:
            oa,ca=r['original_target'],r['candidate_target'];on,cn=r['original_bytes_inferred'],r['candidate_symbol_bytes']
            assert o.calls[r['original_call_pc']]==oa and c.calls[r['candidate_call_pc']]==ca
            assert struct.unpack_from('<i',o.b,r['original_call_pc']+4)[0]==r['original_signed_operand']
            assert struct.unpack_from('<i',c.b,r['candidate_call_pc']+4)[0]==r['candidate_signed_operand']
            eq=pair(o,c,oa,on,ca,cn);assert eq==(r['comparison']['normalized_equal'] and r['comparison']['relocation_pattern_equal']);matches+=eq
        assert len(targets)==76 and matches==74
        for r in report['exact_consumed_literal_pairs']:
            n=r['length'];ob=o.b[r['original_target']:r['original_target']+n];cb=c.b[r['candidate_target']:r['candidate_target']+n]
            assert ob==cb and H(ob)==r['sha256'] and ob.hex()==r['original_hex']==r['candidate_hex']
        assert len(report['exact_consumed_literal_pairs'])==21
    baseline=json.loads(data['baseline-source-sha256.json']);scratch=json.loads(data['source-sha256.json']);main=J(p/'source-sha256.json')
    assert len(baseline)==len(scratch)==len(main)==26
    assert [n for n in scratch if scratch[n]!=baseline[n]]==['programs/pump-fees/src/donation.rs']
    main_source=archive(p/'source-snapshot.tar.gz')
    before=data['proposal/inputs/source/programs/pump-fees/src/donation.rs']
    after=main_source['programs/pump-fees/src/donation.rs']
    expected=before.replace(b'pub event_authority: UncheckedAccount<\'info>,',b'pub event_authority: AccountInfo<\'info>,',1)
    assert before!=after and expected==after
    assert [n for n in main if main[n]!=scratch[n]]==['programs/pump-fees/README.md']
    runtime=J(p/'runtime-verification-result.json');assert runtime['verified_signatures_in_encoded_fields']==17204 and runtime['comparison_receipts']==17441
    assert runtime['unchanged_genuine_historical_transactions']==2 and runtime['donation_steps']==10
    return {'changed_source':['programs/pump-fees/src/donation.rs'],'main_scratch_documentation_difference':['programs/pump-fees/README.md'],'compiler_inputs':26,'roots':rows,'direct_target_windows':len(report['direct_target_inventory']),'matching_root_direct_targets':matches,'root_direct_calls':len(targets),'matching_exact_literal_spans':21,'runtime':runtime,'handler_incomplete':True}

def check(repo):
    result={}
    for name,(path,manifest,digest) in PACKAGES.items():
        p=repo/path;count=seal(p,manifest,digest)
        result[name]={'package':path,'manifest_sha256':digest,'payload_files':count,'review':inspect_amm(p) if name=='amm' else inspect_fees(p)}
    result['limits']=['No build or runtime replay by this review.','Original extents are inferred entry boundaries; candidate extents are recorded symbols.','Normalization masks only direct call operands and relocation addresses; call/data closures remain separate obligations.','No audit completion, original vulnerability confirmation, unique historical source, or whole-program equality claim.','Main central status/docs/CI are not frozen by this package.']
    return result
