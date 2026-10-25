#!/usr/bin/env python3
"""Standard-library portable verifier. Static bytes/source only; no target execution."""
import sys
sys.dont_write_bytecode=True
import ast,hashlib,json,re
from pathlib import Path
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
def digest(b):return hashlib.sha256(b).hexdigest()
def read(p):return (P/p).read_bytes()
def text(p):return read(p).decode()
def obj(p):return json.loads(read(p))
def checked_file(p,spec):
 b=read(p);assert len(b)==spec['size'],('size',p);assert digest(b)==spec['sha256'],('sha256',p)

def main():
 seal=text('manifest.sha256').split()[0]
 assert digest(read('manifest.json'))==seal,'manifest seal'
 m=obj('manifest.json')
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
 assert actual==set(m['files'])|{'manifest.json','manifest.sha256'},'exact file set'
 assert not any(p.is_symlink() for p in P.rglob('*')),'symlinks disallowed'
 for p,spec in m['files'].items():checked_file(p,spec)
 for spec in obj('input-manifest.json'):checked_file(spec['path'],spec)
 # Verify unchanged retained portions of each original sealed predecessor.
 predecessors=0
 for directory in sorted((P/'inputs').glob('relay_*')):
  old=json.loads((directory/'manifest.json').read_bytes())
  seals=[p for p in [directory/'manifest.sha256',directory/'SEAL.sha256'] if p.exists()]
  assert len(seals)==1,directory
  assert digest((directory/'manifest.json').read_bytes())==seals[0].read_text().split()[0]
  for p in directory.rglob('*'):
   if not p.is_file():continue
   rel=str(p.relative_to(directory))
   if rel in ('manifest.json','manifest.sha256','SEAL.sha256'):continue
   spec=old['files'][rel];b=p.read_bytes()
   assert digest(b)==spec['sha256'] and len(b)==spec['size'],(directory.name,rel)
  predecessors+=1
 assert predecessors==5
 import evidence as e
 assert digest(e.B)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 code=obj('consumed-code.json')
 for w in code:
  assert e.window(w['ordinal'])==w,('instructions',w['ordinal'])
  assert text('disassembly/'+str(w['ordinal'])+'.txt')==e.render(w['ordinal'])
 for a in obj('composition-anchors.json'):
  expected=next(x for x in e.window(a['ordinal'])['instructions'] if x['pc']==a['pc'])
  assert {'ordinal':a['ordinal'],**expected}==a
 for row in obj('consumed-metadata.json'):
  a,z=row['bytes'];b=read('inputs/windows.json')[a:z]
  assert digest(b)==row['sha256'];assert json.loads(b)==e.W[row['ordinal']]
 for row in obj('consumed-idl.json'):
  a,z=row['bytes'];b=read('inputs/idl.json')[a:z]
  assert digest(b)==row['sha256']
  assert json.loads(b).get('name')==row['name']
 for row in obj('consumed-literals.json'):
  b=bytes.fromhex(row['hex'])
  for a,z in row['occurrences']:assert e.B[a:z]==b
 for row in obj('source-ranges.json'):
  b=read(row['path']);assert row['bytes']==[0,len(b)]
  assert row['lines']==[1,len(b.splitlines())] and digest(b)==row['sha256']
 # Native interface/dispatch are not reimplemented or opportunistically edited.
 assert read('source/dispatch.rs')==read('inputs/dispatch/dispatch.rs')
 assert read('source/dispatch_interfaces.rs')==read('inputs/dispatch/interfaces.rs')
 assert read('source/mint_policy.rs')==read('inputs/relay_mint_policy_closure/source/mint_policy.rs')
 a=text('source/admission.rs');f=text('source/frames.rs');x=text('source/generated_exit.rs')
 # Parse Python AST only to recover literal account order; NEVER execute/import it.
 tree=ast.parse(text('inputs/relay_lifecycle_context_closure/source/lifecycle.py'))
 orders=next(ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='ORDERS' for t in n.targets))
 names={142:'close_donation_epoch_v1',146:'distribute_after_just_swapping_v1',148:'distribute_non_swap_output_mint_v1',150:'just_swap_v1',154:'swap_then_distribute_v1',156:'upsert_mint_whitelist_v1'}
 idl={i['name']:i for i in obj('inputs/idl.json')['instructions']}
 for ordinal,order in orders.items():
  segment=a.split('fn consume_'+str(ordinal)+'<',1)[1].split('\nstruct Raw',1)[0]
  taken=[]
  for line in segment.splitlines():
   if 'c.take(' in line or '=signer(c,' in line or '=program(r,c,' in line:
    taken.append(re.findall(r'"([a-z_]+)"',line)[-1])
  expected=[n for n,t in order]
  assert taken==expected==[v['name'] for v in idl[names[ordinal]]['accounts']],('order',ordinal)
 # Concrete phase schedule bindings. These assert textual order, NOT equivalence.
 def method(name):return a.split(' fn '+name+'(',1)[1].split('\n fn ',1)[0]
 def ordered(s,parts):
  pos=0
  for part in parts:
   found=s.find(part,pos);assert found>=0,('missing/order',part);pos=found+len(part)
 ordered(method('donation'),['codec::decode_arguments','Cursor::new','c.take("epoch_tracker")','c.take("debouncer")','c.take("debouncer_token_account")','load_mint(r,','signer(&mut c,"from")','r.rent_get()','let epoch_bump=canonical','let epoch_tracker=init_if_needed','let debouncer_bump=canonical','let debouncer=init_if_needed','let destination=destination_ata','let (source,temp_bump)=if native','native_temp(r,','writable(mint.info','if native {check','existing_ata(r,','stored(r,p,whitelist.info','let event_bump=canonical'])
 ordered(method('epoch'),['raw_args.len()>=48','consume_142','r.rent_get()','let distribution=initialize','r.rent_get()','let distribution_token_account=create_ata','stored(r,p,epoch_tracker.info','stored(r,p,debouncer.info','existing_ata','mint_constraints','fixed_relayer','let event_bump'])
 ordered(method('just_swap'),['consume_150','r.rent_get()','let receipt_bump=canonical','let swap_receipt=initialize','rent_exempt','r.rent_get()','let output_distribution_token_account=create_ata','distribution_seeds','existing_ata','mint_constraints','fixed_relayer','equal(jupiter_program.key','let event_bump'])
 ordered(method('combined'),['consume_154','r.rent_get()','let output_distribution_token_account=create_ata','distribution_seeds','not_close','existing_ata','mint_constraints','fixed_relayer','equal(jupiter_program.key','let event_bump'])
 ordered(method('after'),['consume_146','distribution_seeds','not_close','stored(r,p,swap_receipt.info','writable(swap_receipt.info','6033','not_close(swap_receipt.info','existing_ata','6006','fixed_relayer'])
 ordered(method('non_swap'),['consume_148','distribution_seeds(r,p,&epoch_tracker,&debouncer,&distribution,mint.info.key)','not_close','existing_ata','6006','fixed_relayer'])
 ordered(method('whitelist'),['consume_156','r.rent_get()','canonical','AccountRuntime::owner','initialize','state(r,mint_whitelist,true','==1037','2004','rent_exempt','writable','rent_exempt','fixed_relayer'])
 assert 'AccountRuntime<A=Account>' in text('source/runtime.rs')
 assert 'info:&self.info,value:&self.value' in a
 assert 'cached_owner:self.info.owner' in a
 assert 'AccountRuntime::owner(rt,&c.mint)' in text('source/handlers.rs')
 assert 'Err(Error::Incomplete("106' not in text('source/runtime.rs')
 assert 'assert!(b.len()>=8,"unchecked state discriminator slice")' in text('source/codec.rs')
 assert 'parse_context' not in text('source/lib.rs')
 assert 'return_then_exit' not in x
 for trait in ['DonationFrame','EpochFrame','AfterFrame','NonSwapFrame','JustFrame','CombinedFrame','WhitelistFrame']:
  assert 'impl '+trait+'<Account> for ' in f
 for n in [125,130,141,145,147,149,153,155,158]:
  assert 'pub fn account_exit'+str(n)+'<' in x
  assert 'exit::account_exit'+str(n) in text('source/dispatch.rs')
 print(json.dumps(dict(status='pass',files=len(m['files']),sealed_predecessor_subsets=predecessors,selected_windows=len(code),instruction_records=sum(len(w['instructions']) for w in code),lifecycle_orders=len(orders),business_contexts=11,source_build=False,target_execution=False,claim='integrity and static bindings only'),sort_keys=True))
if __name__=='__main__':main()
