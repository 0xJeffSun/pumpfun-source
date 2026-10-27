"""Apply the same direct-call relation to the separately verified fresh Linux builds."""
from collections import defaultdict
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,shutil,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
BASE='research/mayhem-quotes-current-recovery-20261027/'
FRESH='research/mayhem-clean-linux-build-20261027/'

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def require(ok,message):
    if not ok:raise ValueError(message)
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def derive():
    inputs=json.loads((HERE/'portable-inputs.json').read_text())
    for name,digest in inputs.items():require(sha(ROOT/name)==digest,'input hash mismatch: '+name)
    reader=module('portable_reader',ROOT/BASE/'reader.py');audit=module('portable_audit',HERE/'verify.py')
    original=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
    inventory=json.loads((ROOT/BASE/'inventory.json').read_text())
    key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
    result={}
    with tempfile.TemporaryDirectory(prefix='mayhem-portable-closure-')as temporary:
        temp=Path(temporary)
        for label in ['build','control']:
            root=temp/label;packet=root/BASE;(packet/'builds/current').mkdir(parents=True);(root/'evidence/original/mayhem').mkdir(parents=True)
            for name in ['evidence/original/mayhem/deployed.so',BASE+'reader.py']:
                shutil.copyfile(ROOT/name,root/name)
            source=ROOT/FRESH/label/'symbols.so.gz';shutil.copyfile(source,packet/'builds/current/symbols.so.gz')
            symbols=temp/(label+'.so');symbols.write_bytes(gzip.decompress(source.read_bytes()));candidate=reader.Elf(symbols)
            windows={s['value']:candidate.window(s['value'],s['value']+s['size'])for s in candidate.symbols if s['info']&15==2 and s['size']>=8 and candidate.lo<=s['value']<candidate.hi}
            groups=defaultdict(list)
            for address,window in windows.items():groups[key(window)].append(address)
            revised=json.loads(json.dumps(inventory));revised['candidate_symbols_sha256']=hashlib.sha256(candidate.b).hexdigest()
            for row in revised['rows']:
                window=original.window(row['start'],row['start']+row['bytes']);hits=groups[key(window)]
                raw=[address for address in hits if windows[address]['raw_sha256']==window['raw_sha256']]
                row.update(classification='raw-equal'if raw else'normalized-only'if hits else'unmatched',counterpart_count=len(hits),counterparts=[],raw_counterparts=raw)
            (packet/'inventory.json').write_text(json.dumps(revised,indent=2)+'\n')
            # Same audited relation; bind this generated inventory and fresh artifact.
            # No normalized instruction masks or pruning rules are changed.
            audit.INPUTS={name:sha(root/name)for name in audit.INPUTS}
            report=audit.derive(root)
            require(report['normalized_windows']==432 and report['direct_closed_windows']==414,'fresh-build closure frontier changed')
            result[label]={'symbols_sha256':revised['candidate_symbols_sha256'],'report':report}
    return {'scope':'Static follow-up on fresh Linux artifacts; no compiler/VM execution or new body match','inputs':inputs,'artifacts':result}

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--write',action='store_true');args=parser.parse_args();report=derive();path=HERE/'portable-followup.json'
    if args.write:path.write_text(json.dumps(report,indent=2)+'\n')
    else:require(json.loads(path.read_text())==report,'saved portable follow-up differs')
    print(json.dumps({label:{k:entry['report'][k]for k in ['normalized_windows','normalized_pairs','direct_closed_windows','direct_closed_pairs','normalized_windows_without_direct_closed_counterpart']}for label,entry in report['artifacts'].items()},indent=2))
if __name__=='__main__':main()
