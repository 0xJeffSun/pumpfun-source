from pathlib import Path
import hashlib,json,shutil,difflib
R=Path.cwd();S=R/'work/pump-curve-preparation-build/handoff';W=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not(W/'promotion.json').exists()
assert J(R/'work/pump-curve-preparation-build/package-verification.json')['status']=='PASS'
base=J(S/'baseline-source-sha256.json');source=J(S/'source-sha256.json');changes=J(S/'source-change-map.json')
assert len(changes)==3 and {n:H(R/n)for n in base}==base
readme=R/'programs/pump/README.md';before=readme.read_text();(W/'README.before.md').write_text(before)
text=before.replace('[final-error-metadata-fortyeight](../../repro/pump/final-error-metadata-fortyeight/README.md)','[curve-preparation-fortyeight](../../repro/pump/curve-preparation-fortyeight/README.md)',1)
text=text.replace('The candidate is 1,582,168 bytes','The candidate is 1,588,480 bytes',1).replace('2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3','b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51',1)
text=text.replace('This checkpoint restores binary-evidenced', 'The preceding metadata checkpoint restored binary-evidenced',1)
marker='The partial `create_v2` path now traverses ordinary Tokenkeg quote ancestry,'
paragraph='''The current three-file correction decodes all nine evidenced historical
BondingCurve layouts and connects V3 trades to the recovered shared account
preparation before quote checks. Preparation protects recorded reserves, funds
only a positive rent gap and grows short accounts to 166 bytes. The route retains
its explicit short-account boundary before the helper. This does not complete
the V3 bodies, broaden the tested routing domain or recover their remaining
mode, settlement and event behavior. Historical short-layout and underfunded
V3 inputs have source evidence but no new runtime fixtures in this pass.

All 9,269 existing differential and 1,024 Surfpool comparisons were freshly
repeated. The complete serializer and four metadata bodies retain their matches.
In the same full-inventory method, original call-consistent matches change from
455 to 454 and raw-equal pairs remain 617. Source recovery and finite behavioral
agreement are not evidence of a closer whole-file byte match.

'''
assert marker in text;text=text.replace(marker,paragraph+marker,1).replace('same metadata-corrected scratch ELF','same decoder/preparation-corrected scratch ELF',1)
for n in changes:shutil.copyfile(S/'source'/n,R/n)
readme.write_text(text);assert {n:H(R/n)for n in source}==source
(W/'README.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),text.splitlines(True),fromfile='before/programs/pump/README.md',tofile='after/programs/pump/README.md')))
(W/'promotion.json').write_text(json.dumps({'source_sha256':source,'changed_source':changes,'documentation_sha256':{'programs/pump/README.md':H(readme)},'scratch_seal':H(S/'manifest.json')},indent=2)+'\n')
print('Promoted exact three reviewed source files and README; clean main build pending.')
