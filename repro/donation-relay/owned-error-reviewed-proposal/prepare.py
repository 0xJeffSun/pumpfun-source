#!/usr/bin/env python3
"""Prepare an uncompiled, isolated source proposal from frozen public inputs."""
import difflib,hashlib,json,shutil
from pathlib import Path
P=Path(__file__).resolve().parent
R=P.parents[1]
B=R/'repro/donation-relay/source-build-06-bpf-writer'
D=R/'work/relay-build06-error-serializer-closure'
H=lambda b:hashlib.sha256(b).hexdigest()
def write(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b if isinstance(b,bytes)else b.encode())
def put(n,v):write(n,json.dumps(v,indent=2,sort_keys=True)+'\n')
base=json.loads((B/'launcher/resolved-source-sha256.json').read_text())
for n,h in base.items():
 b=(B/'source'/n).read_bytes();assert H(b)==h;write('base-source/'+n,b);write('source/'+n,b)
upstream=(D/'upstream/anchor-src-error.rs').read_text()
# Copy the owned Error representation and implementations from the already
# authenticated reference, not its derive macros or the unrelated error enum.
start=upstream.index('#[derive(Debug, PartialEq, Eq)]\npub enum Error {')
owned=upstream[start:]
def remove_item(text,prefix):
 start=text.index(prefix);a=text.index('{',start);level=1;i=a+1
 while level:
  if text[i]=='{':level+=1
  if text[i]=='}':level-=1
  i+=1
 return text[:start]+text[i:]
owned=remove_item(owned,'impl From<TryFromIntError> for Error {')
owned=remove_item(owned,'impl From<BorshIoError> for Error {')
owned=owned.replace('anchor_lang::solana_program::','solana_program::')
header='''//! Owned error representation for generated account exits.
//! Adapted from the authenticated Anchor 0.31.1 error model (Apache-2.0).
//! No historical filename/line is inserted; source origins remain unset here.
use solana_program::{program_error::ProgramError, pubkey::Pubkey};
use std::fmt::{Display, Formatter};

'''
factory='''
// Only this framework code is constructed by the account serializers below.
// Keep the owned name and Display-to-String construction of the framework
// conversion; do not replace the message with a borrowed catalog reference.
enum SerializationErrorCode { AccountDidNotSerialize }
impl SerializationErrorCode {
    fn name(&self) -> String {
        match self { Self::AccountDidNotSerialize => "AccountDidNotSerialize".to_owned() }
    }
}
impl Display for SerializationErrorCode {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self { Self::AccountDidNotSerialize => f.write_str("Failed to serialize the account") }
    }
}
pub fn account_did_not_serialize() -> Error {
    let code = SerializationErrorCode::AccountDidNotSerialize;
    AnchorError {
        error_name: code.name(),
        error_code_number: 3004,
        error_msg: code.to_string(),
        error_origin: None,
        compared_values: None,
    }.into()
}
'''
write('source/src/exit_error.rs',header+owned+factory)
n='src/generated_exit.rs';s=(P/'source'/n).read_text()
old='''#[derive(Debug)]
pub enum Cause { AccountDidNotSerialize, Program(solana_program::program_error::ProgramError) }
#[derive(Debug)]
pub struct ExitError { pub cause: Cause, pub account: Option<&'static str> }
pub type X<T> = Result<T, ExitError>;
fn write_error() -> ExitError { ExitError {cause:Cause::AccountDidNotSerialize,account:None} }
fn named<T>(r:X<T>, name:&'static str)->X<T> {
    r.map_err(|mut e| {e.account=Some(name);e})
}'''
new='''#[path="exit_error.rs"] mod exit_error;
pub use exit_error::Error as ExitError;
pub type X<T> = Result<T, ExitError>;
fn write_error() -> ExitError { exit_error::account_did_not_serialize() }
fn named<T>(r:X<T>, name:&'static str)->X<T> {
    r.map_err(|e| e.with_account_name(name))
}'''
assert s.count(old)==1;s=s.replace(old,new)
s=s.replace('//   explicit premises; panic text, allocator, error heap representation are not modeled.','//   explicit premises; panic text and full runtime ABI equivalence are not established.')
write('source/'+n,s)
n='src/solana_runtime.rs';s=(P/'source'/n).read_text();s=s.replace('AccountRuntime,ExitError,Cause,X','AccountRuntime,ExitError,X');old='fn exit_error(error:ProgramError)->ExitError {ExitError{cause:Cause::Program(error),account:None}}';assert s.count(old)==1;s=s.replace(old,'fn exit_error(error:ProgramError)->ExitError {error.into()}');write('source/'+n,s)
n='src/error_report.rs';s=(P/'source'/n).read_text();s=s.replace('generated_exit::Cause as ExitCause,','')
old='''        Failure::Exit(e)=>match &e.cause {
            ExitCause::AccountDidNotSerialize=>framework(3004,e.account,None,None),
            ExitCause::Program(error)=>program(error,e.account),
        },'''
assert s.count(old)==1;s=s.replace(old,'        Failure::Exit(e)=>e.log(),')
old='''        Failure::Exit(e)=>match e.cause {
            ExitCause::AccountDidNotSerialize=>ProgramError::Custom(3004),
            ExitCause::Program(error)=>error,
        },'''
assert s.count(old)==1;s=s.replace(old,'        Failure::Exit(e)=>e.into(),');write('source/'+n,s)
after={str(p.relative_to(P/'source')):H(p.read_bytes())for p in sorted((P/'source').rglob('*'))if p.is_file()}
changed=[n for n,h in after.items()if base.get(n)!=h];assert changed==['src/error_report.rs','src/exit_error.rs','src/generated_exit.rs','src/solana_runtime.rs'],changed
patch=''
for n in changed:
 old=(P/'base-source'/n).read_text()if n in base else ''
 new=(P/'source'/n).read_text()
 patch+=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+n if n in base else '/dev/null',tofile='b/'+n))
write('source.patch',patch);put('base-source-sha256.json',base);put('source-sha256.json',after)
write('upstream/anchor-error.rs',upstream);write('upstream/anchor-lang-0.31.1.crate',(B/'proposal/upstream/anchor-lang-0.31.1.crate').read_bytes())
write('prior-diagnostic-manifest.json',(D/'manifest.json').read_bytes());write('prior-diagnostic-manifest.sha256',(D/'manifest.sha256').read_bytes())
for n in ['original.so','candidate.so','unstripped.so','original-function-ledger.json','candidate-function-ledger.json','original-windows.json','manifest.json','serializer-fields.json']:
 write('inputs/build06/'+n,(B/n).read_bytes())
for n in ['analyze.py','disasm.py']:write(n,(B/n).read_bytes())
for n in ['manifest.json','README.md','run/ordinary.json']:write('inputs/ordinary12/'+n,(R/'repro/donation-relay/build06-ordinary12'/n).read_bytes())
put('proposal.json',{'status':'uncompiled source hypothesis; not accepted','base_candidate_sha256':H((B/'candidate.so').read_bytes()),'base_source_count':len(base),'proposed_source_count':len(after),'changed_paths':changed,'preserved_inputs':len(base)-3,'new_builds':0,'new_runtime_cases':0,'broader_shared_boundary':['whitelist code3004 construction','interface/close ProgramError conversion','account-name decoration for generated exits'],'unchanged':['writer bytes','allocator source','all account writes/field order','owner/closed checks','borrow scope','close operations','Cargo manifest/lock','other Framework/Body/IDL error adapters']})
print(json.dumps({'changed':changed,'source_count':len(after),'source_patch_sha256':H(patch.encode())}))
