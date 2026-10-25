from pathlib import Path
import json,hashlib,shutil,sys,difflib
P=Path(__file__).resolve().parent;R=P.parents[1];S=R/'repro/donation-relay/source-build-12-idl-discriminator-owned';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n in['analyze.py','disasm.py','original.so','unstripped.so','original-function-ledger.json','candidate-function-ledger.json','match-ledger.json','whole-file-residuals.json.gz']:shutil.copyfile(S/n,P/n)
shutil.copytree(S/'source',P/'baseline-source');shutil.copyfile(S/'manifest.json',P/'checkpoint-manifest.json');shutil.copyfile(S/'launcher/resolved-source-sha256.json',P/'source-map.json');(P/'proposal').mkdir()
b=(P/'baseline-source/src/idl.rs').read_text();needle='fn named<T>(r: I<T>, name:';at=b.index(needle);helper='''// Typed Account::try_from boxes a borrow failure before outer account naming.
fn own_typed_borrow_failure(mut error: IdlError) -> IdlError {
    error.cause = match error.cause {
        Cause::Program(program) => Cause::Owned(program.into()),
        cause => cause,
    };
    error
}
'''
a=b[:at]+helper+b[at:];old='    let bytes = rt.idl_data(info)?;';assert a.count(old)==1;a=a.replace(old,'''    let bytes = if checked {
        rt.idl_data(info).map_err(own_typed_borrow_failure)?
    } else {
        rt.idl_data(info)?
    };''');(P/'proposal/idl.rs').write_text(a);(P/'source.patch').write_text(''.join(difflib.unified_diff(b.splitlines(True),a.splitlines(True),fromfile='a/src/idl.rs',tofile='b/src/idl.rs')))
sys.path.insert(0,str(P));import disasm
selected={}
for kind,roots in [('original',[20392,62920,599904,690000,652528,652688,653288]),('candidate',[326880,67336,67992,349288,351616])]:
 e=disasm.a.Elf((P/('original.so'if kind=='original'else'unstripped.so')).read_bytes());rows=json.loads((P/f'{kind}-function-ledger.json').read_text());by={r['start']:r for r in rows};ss=set(roots)
 for a in roots:ss.update(c['target']for c in by[a]['direct_calls']if c['target']in by)
 selected[kind]=[by[a]for a in sorted(ss)];(P/kind).mkdir()
 for f in selected[kind]:(P/kind/f"{f['start']}.asm").write_text(disasm.render(e,f['start'],f['end']))
(P/'selected-rows.json').write_text(json.dumps(selected,indent=2)+'\n')
