"""Authenticate published literal builder inventories; never execute JavaScript."""
import collections,hashlib,json,re
from analyze_sdk import archives,P
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze(matrix):
 data=archives();out=[]
 for package in ['pump','amm']:
  metadata=json.loads(data[package]['package/package.json']);source=collections.Counter(r['literal_anchor_method']for r in matrix['routes']if r['package']==package)
  bundles=[]
  for path,b in sorted(data[package].items()):
   if not(path.startswith('package/dist/')and path.endswith('.js')):continue
   s=b.decode();counts=collections.Counter(re.findall(r'\.methods\s*\.\s*(\w+)\s*\(',s));assert not re.search(r'\.methods\s*\[',s);assert not(set(counts)-set(source))
   bundles.append(dict(path=path,sha256=H(b),bytes=len(b),literal_builder_histogram=dict(sorted(counts.items()))))
  for root in ['package/dist/index.js','package/dist/esm/index.js']:
   assert next(b['literal_builder_histogram']for b in bundles if b['path']==root)==dict(sorted(source.items()))
  out.append(dict(package=package,package_json_sha256=H(data[package]['package/package.json']),main=metadata.get('main'),module=metadata.get('module'),exports=metadata.get('exports'),production_source_histogram=dict(sorted(source.items())),bundles=bundles,limit='Literal builder-name histogram agreement only, not bundled/source semantic equivalence'))
 s=data['pump']['package/src/sdk.ts'].decode();start=s.index('const builder = this.offlinePumpProgram.methods');end=s.index('\n  }',start);fragment=s[start:end];assert'.createV2('in fragment and'if (quoteMint && !isLegacyQuoteMint(quoteMint))'in fragment and'createV2QuoteRemainingAccounts({'in fragment and'return await builder.instruction();'in fragment
 return dict(published_entrypoints=out,create_v2_continuation=dict(package='pump',path='package/src/sdk.ts',line=s.count('\n',0,start)+1,source=fragment,sha256=H(fragment.encode()),condition='quoteMint && !isLegacyQuoteMint(quoteMint)',true_branch='builder.remainingAccounts(createV2QuoteRemainingAccounts({...})).instruction()',fallthrough='builder.instruction()',limit='Source routing only; Mayhem initialization and runtime account resolution excluded'))
if __name__=='__main__':
 result=analyze(json.loads((P/'sdk-matrix.json').read_text()));(P/'compiled-entrypoints.json').write_text(json.dumps(result,indent=2)+'\n')
