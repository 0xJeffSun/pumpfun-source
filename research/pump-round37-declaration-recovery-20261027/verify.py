"""Verify eleven Pump declaration and source-coordinate recoveries."""
from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
assert json.loads((HERE/'MANIFEST.json').read_text())=={p.relative_to(HERE).as_posix():sha(p.read_bytes())for p in sorted(HERE.rglob('*'))if p.is_file()and p.name!='MANIFEST.json'and '__pycache__'not in p.parts}
spec=importlib.util.spec_from_file_location('name_windows',HERE/'support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(ROOT/'evidence/original/pump/deployed.so').read_bytes();assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d';ow=w.windows(original);oc=Counter(x['signature']for x in ow);assert len(ow)==1035
images={};rows={};records={}
for label,count in [('parent',766),('migration',769),('legacy',770),('fee',771),('fee-repeat',771),('global',772),('paths',776),('candidate',777),('repeat',777)]:
    build=HERE/'builds'/label;record=json.loads((build/'build-comparison.json').read_text());records[label]=record
    assert record['returncode']==0 and record['source_unchanged']
    assert record['comparison']['original_sha256']==sha(original)and not record['comparison']['full_byte_equality']
    if label!='linux-baseline':assert record['dependency_cache']['main_freshly_compiled']
    with tarfile.open(build/'primary.tar.gz')as a:source={m.name:sha(a.extractfile(m).read())for m in a.getmembers()if m.isfile()}
    parts=Path(record['primary_source_directory']).parts;bound=record['primary_source_sha256'];prefix=None
    for n in range(1,len(parts)):
        trial='/'.join(parts[-n:])+'/'
        if all(k.startswith(trial)for k in bound):prefix=trial;break
    assert prefix
    assert all(source[k[len(prefix):]]==v for k,v in bound.items())
    blobs={name:gzip.decompress((build/(name+'.gz')).read_bytes())for name in['unstripped.so','candidate.so']};images[label]=blobs
    assert sha(blobs['unstripped.so'])==record['unstripped_sha256']and sha(blobs['candidate.so'])==record['comparison']['candidate_sha256']
    rows[label]=w.windows(blobs['unstripped.so']);cc=Counter(x['signature']for x in rows[label]);assert sum((oc&cc).values())==count
    assert blobs['candidate.so']!=original
assert images['candidate']==images['repeat']

assert images['fee']==images['fee-repeat']
steps=[('parent',766),('migration',769),('legacy',770),('fee',771),('global',772),('paths',776),('candidate',777)]
for (left,count),(right,_) in zip(steps,steps[1:]):
    lc=Counter(x['signature']for x in rows[left]);rc=Counter(x['signature']for x in rows[right]);assert sum(((oc&lc)&rc).values())==count
checks=[(0x410b0, 'programs/pump/src/migrate.rs'),(0x4bb40,'programs/pump/src/migrate_v2.rs'),(0x4bd48,'programs/pump/src/migrate_v2.rs'),(0x172110,'programs/pump/src/lib.rs'),(0x88908,'programs/pump/src/util/fee.rs'),(0x98210,'programs/pump/src/lib.rs'),(0x164e40,'programs/pump/src/lib.rs'),(0x16a3e0,'programs/pump/src/lib.rs'),(0x16bdf0,'programs/pump/src/lib.rs'),(0xfdf20,'programs/pump/src/token_incentives/init_user_volume_accumulator.rs'),(0xa2188,'programs/pump/src/lib.rs')]
om={x['address']:x for x in ow}
def has_label(blob,row,label):
    for ins in w.m.instructions(blob,row['address'],row['bytes']):
        if 'lddw_value'not in ins:continue
        try:
            if w.m.at_address(blob,ins['lddw_value'],len(label))==label:return True
        except (StopIteration,OverflowError):pass
    return False
for address,label in checks:
    label=label.encode();assert has_label(original,om[address],label)
    hits=[x for x in rows['candidate']if x['signature']==om[address]['signature']]
    assert any(has_label(images['candidate']['unstripped.so'],x,label)for x in hits)
print('Verified 766 -> 769 -> 770 -> 771 -> 772 -> 776 -> 777 / 1035, retaining every earlier match.')
print('Verified native repeat equality at 771 and 777; eleven recovered source filename references; whole ELF unequal.')
