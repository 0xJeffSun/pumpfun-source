"""Additional portable static checks; never compiles or runs a target/harness."""
from pathlib import Path
import hashlib,json,re,struct
from analyze import ELF
H=lambda b:hashlib.sha256(b).hexdigest()
def load(p):return json.loads(p.read_bytes())
def crosswalk(p):
 a=load(p/'authoritative/residual-ledger.json');b=load(p/'residual-ledger.json')
 for role in ['original','candidate']:
  assert a[role]['sha256']==b[role]['sha256']
 assert a['symbol_artifact']['sha256']==b['symbols']['sha256']
 e=ELF(p/'review/composition/prior/pump_buy_fee_selection_closure/evidence/original.so')
 assert e.text['addr']==e.text['offset']
 origins={}
 def add(t,kind,site):origins.setdefault(t,[]).append({'kind':kind,'site':site})
 add(e.h['entry'],'ELF entry',None)
 for sym in e.syms:
  if sym['info']&15==2 and sym['size']:add(sym['value'],'nonzero ELF function symbol',sym['file_offset'])
 for r in a['original']['relocations']:
  t=r.get('pointer')
  if r['type']==8 and t is not None and e.text['addr']<=t<e.text['addr']+e.text['size'] and t%8==0:add(t,'type8 relocated function pointer',r['site'])
 for w in b['original_windows']:
  for c in w['calls']:
   if c.get('target') is not None:add(c['target'],'unrelocated signed direct call',c['pc'])
 rows=[]
 for i,r in enumerate(a['original_windows']):
  alt=[w['id'] for w in b['original_windows'] if w['start']<r['end'] and w['end']>r['start']]
  rows.append({'authoritative_row':i,'start':r['start'],'end':r['end'],'authoritative_raw_sha256':r['raw_sha256'],'alternate_overlaps':alt,'start_evidence':origins.get(r['start'],[]),'alternate_start':any(w['start']==r['start'] for w in b['original_windows'])})
 extra=[r for r in rows if not r['alternate_start']]
 assert len(rows)==1035 and len(b['original_windows'])==905 and len(extra)==130
 assert all(r['start_evidence'] for r in extra)
 assert all(r['alternate_overlaps'] for r in rows)
 candidates=[]
 for i,r in enumerate(a['candidate_symbol_windows']):
  ids=[w['id'] for w in b['candidate_windows'] if w['start']==r['start'] and w['end']==r['end']]
  assert ids
  candidates.append({'authoritative_row':i,'start':r['start'],'end':r['end'],'names':r['names'],'alternate_raw_symbol_rows':ids})
 assert len(candidates)==777 and sorted(i for r in candidates for i in r['alternate_raw_symbol_rows'])==list(range(794))
 return {'authority':'authoritative/residual-ledger.json','alternate':'residual-ledger.json','same_input_hashes':True,'original_rows':rows,'candidate_rows':candidates,'authoritative_only_starts':extra,'original_count':1035,'alternate_original_count':905,'candidate_unique_extents':777,'candidate_raw_symbol_rows':794,'cross_method_recovery_percentage':None,'limits':'Interval overlap is not semantic correspondence. Normalization methods differ. All authoritative rows and alternatives remain unchanged.'}
def review(p):
 assert crosswalk(p)==load(p/'boundary-crosswalk.json')
 prior=load(p/'prior-failure/publication-snapshot.json')
 # Every retained input and source is unchanged; only these public reports/checks changed.
 mutable={'REPORT.md','verify.py','result.json','residual-ledger.json'}
 for r in prior:
  target=p/('prior-failure/'+r['path'] if r['path'] in mutable else r['path'])
  assert H(target.read_bytes())==r['sha256'] and target.stat().st_size==r['size'],r['path']
 assert (p/'prior-failure/residual-ledger.json').stat().st_size==0
 assert load(p/'prior-failure/exit.json')['exit_code']==1
 old=(p/'inputs/current/trade.rs').read_bytes();new=(p/'proposed/programs/pump/src/trade.rs').read_bytes();contained=(p/'review/source/trade.rs').read_bytes()
 marker=b'// Dedicated BuyV3 context;'
 assert new.startswith(old)
 assert contained[contained.index(marker):]+b'\ninclude!("buy_v3_dispatch.rs");\n'==new[new.index(marker):]
 # Selected branch keeps the selected bump collector and the same mutated value.
 comp=(p/'composite.rs').read_text()
 for s in ['&mut bumps.ordinary, reallocs).map(Self::Ordinary)','&mut bumps.accepted, reallocs).map(Self::Accepted)','ctx.program_id, a, ctx.remaining_accounts, ctx.bumps.accepted)','ctx.program_id, a, ctx.remaining_accounts, ctx.bumps.ordinary)','Self::Accepted(a) => a.exit(program_id)','Self::Ordinary(a) => a.exit(program_id)']:
  assert s in comp
 assert comp.count('::try_accounts(')==2 and comp.count('a.exit(program_id)')==2
 handlers=(p/'framework/anchor-syn-0.31.2/src/codegen/program/handlers.rs').read_text()
 h=handlers[handlers.index('// Deserialize data.'):]
 assert h.index('::deserialize(')<h.index('#anchor::try_accounts(')<h.index('let result = #program_name::#ix_method_name(')<h.index('__accounts.exit(__program_id)')
 assert ')?;' in h[h.index('let result = #program_name::#ix_method_name('):h.index('__accounts.exit(__program_id)')]
 lib=(p/'inputs/current/lib.rs').read_text();assert 'pub use trade::*;' in lib
 for module in ['__client_accounts','__cpi_client_accounts']:
  text=(p/f'framework/anchor-syn-0.31.2/src/codegen/accounts/{module}.rs').read_text()
  assert 'pub(crate) mod' in text and 'pub struct #name' in text
 bumps=(p/'framework/anchor-syn-0.31.2/src/codegen/accounts/bumps.rs').read_text()
 assert '#[derive(Debug)]' in bumps and 'impl Default for #bumps_name' in bumps
 fields=load(p/'account-abi.json');assert len(fields)==17
 assert [r['index'] for r in fields if r['signer']]==[8]
 assert [r['index'] for r in fields if r['writable']]==[5,6,7,8,9,10,11,13]
 rows=load(p/'preservation-ledger.json');assert len(rows)==117 and len({r['index'] for r in rows})==117
 assert all(r['match'] and r['new_runtime_comparison'] is False for r in rows)
 assert sum(r['original_error'] is None for r in rows)==105
 assert H((p/'authoritative/manifest.json').read_bytes())==load(p/'authority-binding.json')['envelope_manifest_sha256']
 return {'authority_original_rows':1035,'alternate_original_rows':905,'candidate_unique_extents':777,'candidate_raw_symbol_rows':794,'accepted_source_and_ordinary_context_exact':True,'all_117_saved_rows_preserved':True,'default_build':'unverified','cpi_feature':'unverified','idl_build':'feature absent; whole-crate implementation review required'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent
 print(json.dumps(review(p),indent=2))
