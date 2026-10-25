from pathlib import Path
import hashlib,json,shutil
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'work/relay-source-build-02-handoff';N=R/'work/relay-dispatch-source-proposal'
def J(n,v):(P/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
for name in ['original.so','candidate.so','unstripped.so','analyze.py','stack-diagnostics.json']:
 shutil.copyfile(B/name,P/'build02'/name)
(P/'n09').mkdir(exist_ok=True)
for src,dest in [('manifest.json','manifest.json'),('inputs/integrated/inputs/dispatch.json','dispatch.json')]:shutil.copyfile(N/src,P/'n09'/dest)
shutil.copyfile(R/'work/relay-runtime-source-integration/diagnostic-gaps.json',P/'inherited-diagnostic-gaps.json')
source=(P/'source/src/frames.rs').read_text();base=(P/'base-source/src/admission.rs').read_text()
import re
counts=[]
for text,prefix in [(source,'frame'),(base,'admission raw')]:
 for m in re.finditer(r'(?:pub )?struct (\w+) \{([^}]+)\}',text,re.S):
  name,body=m.groups()
  if prefix=='admission raw' and not name.startswith('Raw'):continue
  fields=re.findall(r'(?:pub\(crate\) )?(\w+):([^,\n]+)',body)
  counts.append(dict(role=prefix,name=name,Loaded_fields=sum('Loaded<' in t for n,t in fields),direct_Account_fields=sum(t.strip()=='Account' for n,t in fields),meaning='source field count only, not an inferred Rust layout or guarantee of stack size'))
J('structural-ownership.json',counts)
J('review.json',[
 dict(id='R01',scope='dispatch',finding='Original169 calls eleven independent wrappers178..188. Proposal extracts each existing branch body verbatim, with instruction-specific log and decode before admission.',limits='Rust optimizer may still inline; no inline attributes or flags added. Clean backend stack diagnostics must be checked after any future separately authorized build.'),
 dict(id='R02',scope='Loaded representation',finding='Each successful token, mint or state decoder now constructs Box<LoadedValue<T>> only after the existing borrow/decoder returns. All three constructors are replaced. No raw pointer, unsafe block, custom Deref or success stub is introduced.',limits='Adds one allocation per successfully loaded object, including repeated initialization decodes. Exact historical allocations, heap exhaustion and timing are not proved.'),
 dict(id='R03',scope='state identity',finding='Frames and Raw* structs move Box ownership. The same allocation provides .value to body mutation and .state() to exit. No cloning/redecoding/snapshot replacement of state is added.',limits='Duplicate account handles retain the pre-existing separate decoded values if decoded separately; actual AccountInfo cells remain aliased through unchanged arena.'),
 dict(id='R04',scope='borrows',finding='State/interface methods are defined on LoadedValue<T> and reached by Box autoderef. Existing split .info/.value fields stay in one native Box allocation; no custom Deref broadens field borrows. TokenView/MintView remain Copy. Just::body mutably borrows receipt.value while copying its disjoint info field.',limits='This is source-level review, not a Rust typecheck. An actual future compiler rejection must be preserved and reviewed before repair.'),
 dict(id='R05',scope='errors/effects',finding='No admission statement, order, check, key pair, signer seed, CPI payload, decoder, body arithmetic, event serialization or exit code changes. Donation branch is textually copied into each of five wrappers.',limits='OOM/panic/drop timing changes with Box. Existing source-coordinate and richer error ABI gaps remain unresolved.'),
 dict(id='R06',scope='dispatch errors',finding='Program ID, short data, IDL and event-recursion routing are unchanged before business selection. Unknown selectors still produce101 without instruction logging. Each business wrapper logs exactly once before decoding. The new let-else unreachable branch contradicts the unchanged fixed-name decoder enum mapping.',limits='Unreachable is only a source invariant for the sealed decoder, never a fallback success path.'),
 dict(id='R07',scope='drop/lifetime',finding='Boxes own all decoded values until the frame drops; body views borrow the frame, and event/return/exit sequence is unchanged. The Account arena remains owned by the unchanged entrypoint runtime.',limits='Allocator free behavior and peak heap usage differ; historical drop/compute/stack resource equivalence is not asserted.'),
 dict(id='R08',scope='scope',finding='Exactly admission.rs and dispatch.rs change. Cargo.toml, lock, nineteen other build inputs, runtime APIs, source-origin handling and compile/strip recipe are unchanged.',limits='This proposal is uncompiled and unexecuted; previous emitted ELF is unsuitable for execution. No new handler or receipt is accepted.'),
])
J('acceptance-boundary.json',dict(proposal_compiled=False,typechecked=False,runtime_cases=0,accepted_handlers=0,source_origin_spoofing=False,new_dependencies=0,compiler_flag_changes=0,inline_attributes_added=0,next_build_authorized=False,required_next_review='Review this exact two-file source delta and allocation/borrow limitations before authorizing one new isolated build; require zero backend stack/overwritten-frame errors, not just exit0.'))
