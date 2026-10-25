from pathlib import Path
import argparse,json,hashlib,difflib,struct
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
q=a.repo/'repro/donation-relay/source-build-11-idl-discriminator';b=(q/'original.so').read_bytes();closure=json.loads((w/'retained-closure.json').read_text());assert closure==json.loads((q/'proposal/closures.json').read_text())['original']
assert len(closure['windows'])==49
for r in closure['windows']:assert hashlib.sha256(b[r['start']:r['end']]).hexdigest()==r['raw_sha256']
for r in json.loads((w/'owned-lower-log-rows.json').read_text()):assert hashlib.sha256(b[r['start']:r['end']]).hexdigest()==r['raw_sha256']
assert any(r['start']==652392 and r['bytes']==136 for r in closure['windows'])
for pc,target in [(652424,566472),(652472,743376),(610296,652392),(21048,609848)]:assert pc+8+struct.unpack_from('<i',b,pc+4)[0]*8==target
old={n:(w/'before'/n).read_text()for n in ['idl.rs','exit_error.rs']};new={n:(w/'after'/n).read_text()for n in old}
for n in old:assert old[n]==(q/'source/src'/n).read_text()
a1='''        let mut e = code(3002); e.account = Some("IdlAccount");
        return Err(e); // enclosing generated parser replaces account name.'''
b1='''        let owned = crate::generated_exit::exit_error::account_discriminator_mismatch(
            crate::generated_exit::exit_error::Source { filename: file!(), line: line!() },
        ).with_account_name("IdlAccount");
        return Err(IdlError {
            cause: Cause::Owned(owned), account: None, keys: None, values: None, origin: None,
        }); // enclosing generated parser replaces the owned account name.'''
assert new['idl.rs']==old['idl.rs'].replace(a1,b1)
s=new['exit_error.rs'];suffix='''
pub fn account_discriminator_mismatch(source: Source) -> Error {
    let code = AccountErrorCode::AccountDiscriminatorMismatch;
    AnchorError {
        error_name: code.name(),
        error_code_number: 3002,
        error_msg: code.to_string(),
        error_origin: Some(ErrorOrigin::Source(source)),
        compared_values: None,
    }.into()
}
''';assert s.endswith(suffix);s=s[:-len(suffix)];s=s.replace('enum AccountErrorCode { AccountDiscriminatorMismatch,','enum AccountErrorCode {',1)
for line in ['            Self::AccountDiscriminatorMismatch => "AccountDiscriminatorMismatch".to_owned(),\n','            Self::AccountDiscriminatorMismatch => f.write_str("Account discriminator did not match what was expected"),\n','            AccountErrorCode::AccountDiscriminatorMismatch => 3002,\n']:assert s.count(line)==1;s=s.replace(line,'',1)
assert s==old['exit_error.rs']
assert 'programs/contracts/src/lib.rs'not in b1+suffix
patch=''.join(''.join(difflib.unified_diff(old[n].splitlines(True),new[n].splitlines(True),fromfile='a/src/'+n,tofile='b/src/'+n))for n in old);assert patch==(w/'proposal.patch').read_text()
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: retained49-body closure+owned log/lower roots; exact3002-only two-file proposal; truthful source macros; no compiler/runtime evidence.')
