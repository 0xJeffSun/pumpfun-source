from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json
P=Path(__file__).resolve().parent;R=P.parents[1];D=P/'run-40604554341'
sha=lambda b:hashlib.sha256(b).hexdigest()
for base in [P,D]:
 m=json.loads((base/'MANIFEST.json').read_text())
 assert all(sha((base/k).read_bytes())==v for k,v in m.items())
assert (D/'revision.txt').read_text().strip()=='bb408bf595c3d01b677591c44ab64227d1653385'
assert json.loads((D/'host.json').read_text())['system']=='Darwin'
spec=json.loads((D/'inputs.json').read_text())
a=importlib.util.spec_from_file_location('windows',R/spec['window_reader']);w=importlib.util.module_from_spec(a);a.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(R/'evidence/original/pump/deployed.so').read_bytes();ow=w.windows(original);oc=Counter(x['signature']for x in ow);raw=Counter(x['raw_sha256']for x in ow)
assert len(ow)==1035 and sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
measurement=json.loads((D/'measurement.json').read_text());images={};counters={}
for label,count,raw_count in [('baseline',744,121),('candidate',778,121),('repeat',778,121),('round37-identity',744,121),('round37-canonical',744,175)]:
 b=D/label;images[label]={n:gzip.decompress((b/(n+'.gz')).read_bytes())for n in ['candidate.so','unstripped.so']}
 record=json.loads(gzip.decompress((b/'build-comparison.json.gz').read_bytes()));assert record['returncode']==0 and record['source_unchanged']
 rows=w.windows(images[label]['unstripped.so']);cc=Counter(x['signature']for x in rows);counters[label]=cc
 assert sum((oc&cc).values())==count and sum((raw&Counter(x['raw_sha256']for x in rows)).values())==raw_count
 assert sha(images[label]['candidate.so'])==measurement['builds'][label]['candidate_sha256']
 assert sha(images[label]['unstripped.so'])==measurement['builds'][label]['unstripped_sha256']
assert images['candidate']==images['repeat']
assert sum(((oc&counters['baseline'])&counters['candidate']).values())==744
assert sha(images['round37-canonical']['candidate.so'])==spec['round37_candidate_sha256']
assert sha(images['round37-canonical']['unstripped.so'])==spec['round37_unstripped_sha256']
assert not measurement['whole_elf_equal']
print('Verified 52 artifact hashes, exact canonical Round37 hashes, repeated native 778 builds, all 744 retained; whole original ELF equality remains false.')
