from pathlib import Path
import hashlib,json,struct,sys,difflib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import disasm
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 assert H(P/'checkpoint-manifest.json')=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
 src=json.loads((P/'source-map.json').read_text());assert len(src)==23
 for n,h in src.items():assert H(P/'baseline-source'/n)==h
 es={k:disasm.a.Elf((P/('original.so'if k=='original'else'unstripped.so')).read_bytes())for k in['original','candidate']};counts={}
 for k,e in es.items():
  rows=json.loads((P/f'{k}-function-ledger.json').read_text());counts[k]=len(rows)
  for f in rows:assert hashlib.sha256(e.at(f['start'],f['bytes'])).hexdigest()==f['raw_sha256']
  for f in json.loads((P/'selected-rows.json').read_text())[k]:assert disasm.render(e,f['start'],f['end'])==(P/k/f"{f['start']}.asm").read_text()
 o=es['original'];c=es['candidate'];ins=lambda e,p:struct.unpack('<BBhi',e.at(p,8))
 for pc,target in[(599944,62920),(63088,20392),(20920,690000),(21048,609848),(21184,652528),(652736,653288)]:
  op,r,off,imm=ins(o,pc);assert op==133 and pc+8+imm*8==target
 assert ins(o,652544)==(0xb7,1,0,128);assert ins(o,652648)==(0x7a,6,0,1)
 assert ins(o,601032)==(0x72,1,2,108)and ins(o,601040)==(0x6a,1,0,25705)
 assert ins(o,601088)==(0x7a,9,0,1)
 assert ins(c,327584)[0]==5 and 327584+8+ins(c,327584)[2]*8==327936
 b=(P/'baseline-source/src/idl.rs').read_text();a=(P/'proposal/idl.rs').read_text();needle='fn named<T>(r: I<T>, name:';at=b.index(needle);helper='''// Typed Account::try_from boxes a borrow failure before outer account naming.
fn own_typed_borrow_failure(mut error: IdlError) -> IdlError {
    error.cause = match error.cause {
        Cause::Program(program) => Cause::Owned(program.into()),
        cause => cause,
    };
    error
}
''';expected=b[:at]+helper+b[at:];expected=expected.replace('    let bytes = rt.idl_data(info)?;','''    let bytes = if checked {
        rt.idl_data(info).map_err(own_typed_borrow_failure)?
    } else {
        rt.idl_data(info)?
    };''');assert a==expected
 assert ''.join(difflib.unified_diff(b.splitlines(True),a.splitlines(True),fromfile='a/src/idl.rs',tofile='b/src/idl.rs'))==(P/'source.patch').read_text()
 return{'status':'PASS','source_files_changed':1,'checked_borrow_error_only':True,'unchecked_path_unchanged':True,'full_raw_functions':counts,'builds':0,'target_executions':0,'whole_original_identity':False}
if __name__=='__main__':print(json.dumps(run(),indent=2))
