from pathlib import Path
import json,hashlib,shutil
R=Path.cwd();S=R/'repro/pump/buy-fee-basis-fortyeight';HIST=R/'work/pump-buy-fee-basis-independent-review';P=R/'work/pump-independent-publication';P.mkdir(exist_ok=False)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((S/'manifest.json').read_text());bindings=[]
def cp(src,dest,provenance):
 dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dest);bindings.append({'packaged':str(dest.relative_to(P)),'source':provenance,'sha256':H(src)})
def from_pub(n,d):
 assert H(S/n)==manifest[n]['sha256'],n
 cp(S/n,P/d,'repro/pump/buy-fee-basis-fortyeight/'+n)
for n in ['manifest.json','manifest.sha256']:cp(S/n,P/'provenance'/('scratch-'+n),'repro/pump/buy-fee-basis-fortyeight/'+n)
# Preserve every original review file under its existing frozen manifest.
hm=json.loads((HIST/'manifest.json').read_text())
for n,h in hm.items():assert H(HIST/n)==h,n;cp(HIST/n,P/'history'/n,'original independent review '+n)
cp(HIST/'manifest.json',P/'history/manifest.json','original independent review manifest.json')
for n in ['before/trade.rs','proposal/trade.rs','proposal.patch','evidence/analyze_elf.py','evidence/original.so']:
 from_pub('approved-proposal/'+n,'inputs/proposal/'+n)
for n in ['candidate.so','unstripped.so','actual-source-sha256.json','baseline-source-sha256.json','full-original-call-data-ledger.json.gz','full-candidate-call-data-ledger.json.gz']:
 from_pub(n,'inputs/build/'+n)
source=json.loads((S/'source-sha256.json').read_text());assert len(source)==37
for n,h in source.items():assert H(S/'source'/n)==h;from_pub('source/'+n,'inputs/build/source/'+n)
for name in ['exact_quote','v3_configured_fee']:from_pub('coverage-fixtures/'+name+'.json','inputs/build/surfpool/'+name+'/fixtures.json')
fixture='research/imported-lab/analysis/pump_fun/curve-fresh-trades-v3-signed-surfpool.json';expected='54d69dd4f11a61cc6cea3076e3e89fd4aa31ea6ff835f8ea316646a7b1642920';assert H(R/fixture)==expected
cp(R/fixture,P/'inputs/baseline-fixture.json',fixture)
(P/'input-origins.json').write_text(json.dumps(bindings,indent=2)+'\n')
