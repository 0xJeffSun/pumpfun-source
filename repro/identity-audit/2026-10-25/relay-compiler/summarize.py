"""Describe complete named helpers, retaining negatives and failed callees."""
from match_helpers import ROOT
import json
KEYS={'fmt_write':lambda n:'fmt5write'in n,'unicode_consumer':lambda n:'unicode9printable12is_printable'in n,'unicode_check':lambda n:'unicode9printable5check'in n,'panic_fmt':lambda n:'panicking9panic_fmt'in n,'panic_bounds':lambda n:'panicking18panic_bounds_check'in n,'multiply_wrapper':lambda n:n=='__multi3','multiply_internal':lambda n:'compiler_builtins3int3mul3Mul3mul'in n,'hex_formatters':lambda n:'fmt3num'in n and ('LowerHex'in n or 'UpperHex'in n)}
def analyze(results):
 out={}
 for version,b in results['builds'].items():
  rows={}
  for name,predicate in KEYS.items():
   rows[name]=[]
   for f in b['functions']:
    if not any(predicate(n)for n in f['names']):continue
    rows[name].append(dict(names=f['names'],bytes=f['bytes'],candidate_start=f['candidate_start'],raw_sha256=f['raw_sha256'],complete_instruction_pattern_matches=len(f['matches']),entry_bounded_call_consistent_matches=[dict(target=m['original_start'],raw_exact=m['raw_byte_equality'],mapped_calls=m['mapped_helper_call_checks'],unresolved_calls=m['unresolved_internal_calls'])for m in f['matches']if m['inferred_function_entry']and m['next_entry_equals_window_end']and m['mapped_helper_calls_consistent']],rejected_callee_windows=[m['original_start']for m in f['matches']if not m['mapped_helper_calls_consistent']],no_match_means='No full candidate body instruction/relocation-pattern match anywhere in captured text; not proof of source absence or exclusion of untested recipes'if not f['matches']else None))
  out[version]=dict(graph='Frozen Fees16'if version in ['v143','v144','v145','v146','v1461']else'Frozen Mayhem24',summary=b['summary'],selected_functions_with_no_pattern_match=sum(not f['matches']for f in b['functions']),named=rows)
 return out
if __name__=='__main__':
 r=json.loads((ROOT/'helper-results.json').read_text());(ROOT/'named-discriminators.json').write_text(json.dumps(analyze(r),indent=2)+'\n')
