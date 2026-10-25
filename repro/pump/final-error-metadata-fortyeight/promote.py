from pathlib import Path
import hashlib,json,shutil,difflib
R=Path.cwd();S=R/'work/pump-final-error-metadata-build/handoff';W=R/'work/pump-final-error-metadata-main';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not(W/'promotion.json').exists();base=J(S/'baseline-source-sha256.json');source=J(S/'source-sha256.json');assert {n:H(R/n)for n in base}==base
changes=J(S/'source-change-map.json');readme=R/'programs/pump/README.md';before=readme.read_text();(W/'README.before.md').write_text(before)
text=before.replace('[nested-general-route-fortyeight](../../repro/pump/nested-general-route-fortyeight/README.md)','[final-error-metadata-fortyeight](../../repro/pump/final-error-metadata-fortyeight/README.md)',1).replace('The candidate is 1,579,424 bytes','The candidate is 1,582,168 bytes',1).replace('731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93','2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3',1)
marker='The partial `create_v2` path now traverses ordinary Tokenkeg quote ancestry,'
paragraph='''This checkpoint restores binary-evidenced `PumpError::QuoteMintNotWritable`
(ordinal 110, code 6110) while keeping all eleven existing reconstruction fences
in a separate local error enum with their unchanged names, messages and codes.
The captured official IDL still ends at 6109. Complete Debug, Display, name and
From-error bodies now match after relocation normalization, as do all 62 actual
direct-call targets. Final error literals match; transitive data remains partial,
including the different compiler source-path prefix in a panic record. The same
9,269 differential and 1,024 Surfpool comparisons were freshly repeated; this adds
no handlers or unique cases, and full original ELF equality remains false.

'''
assert marker in text;text=text.replace(marker,paragraph+marker,1).replace('All 38 existing differential suites (9,237 cases), the sixteen accepted nested','All 38 existing differential suites (9,237 cases), the sixteen accepted nested',1).replace('were freshly executed on the same combined scratch ELF. Its 37 actual compiler','were freshly executed on the same metadata-corrected scratch ELF. Its 37 actual compiler',1)
text=text.replace('The full nested walker and its 85 immediate callees\nremain normalized-identical to the accepted nested checkpoint. The route hop\nparser has all 33 immediate callees matched; four consumed account labels now\nmatch the original. Three parser instructions still exchange memcmp arguments.\nThe 560-byte hop exit matches, but the full route context/handler/helper/data\nclosure remains incomplete.', 'At the earlier nested-general-route checkpoint, the full nested walker and its\n85 immediate callees were normalized-identical to the accepted nested checkpoint.\nIts route hop parser had all 33 immediate callees matched and four consumed account\nlabels matched the original; three parser instructions still exchanged memcmp\narguments. Its 560-byte hop exit matched. Those historical checks and the current\npassing corpus do not close the full route context/handler/helper/data obligations.')
for n in changes:shutil.copyfile(S/'source'/n,R/n)
readme.write_text(text);assert {n:H(R/n)for n in source}==source
(W/'README.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),text.splitlines(True),fromfile='before/programs/pump/README.md',tofile='after/programs/pump/README.md')))
(W/'promotion.json').write_text(json.dumps({'source_sha256':source,'changed_source':changes,'documentation_sha256':{'programs/pump/README.md':H(readme)},'scratch_seal':H(S/'manifest.json')},indent=2)+'\n');print('Promoted exact four source files and final README; no build yet.')
