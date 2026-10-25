"""Analyze authentic saved public snapshots only; no build or variant generation."""
from pathlib import Path
import difflib,hashlib,json,re,tarfile
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if (p/'repro/programs.json').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
def analyze():
 inputs=J(R/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json');history=J(P/'history-snapshots.json');downloads=J(P/'nearby-primary-downloads.json')
 with tarfile.open(R/'repro/pump/metaplex-zero-use-source-recovery/source-snapshot.tar.gz') as t:patched={x.name:t.extractfile(x).read().decode() for x in t.getmembers() if x.isfile()}
 snapshots={n:{} for n in inputs['patched']}
 for group in history:
  for x in group['unique_accessible_sources']:snapshots[group['recovered_path']][x['sha256']]=x
 for x in downloads:
  if 'sha256'in x:snapshots[x['recovered_path']][x['sha256']]=x
 result={'scope':'Bounded public provenance snapshots; historical source and target codegen remain unknown','files':[]}
 for name,rows in snapshots.items():
  for h,x in rows.items():assert H((P/x['saved']).read_bytes())==h
  result['files'].append(dict(path=name,distinct_saved_sources=len(rows),accepted11_full_file_matches=[x for h,x in rows.items() if h==inputs['patched'][name]],accepted11_whitespace_insensitive_matches=[x for h,x in rows.items() if re.sub(r'\s+','',(P/x['saved']).read_text())==re.sub(r'\s+','',patched[name])]))
 key='programs/token-metadata/program/src/processor/uses/utilize.rs';utilize=[]
 for h,x in snapshots[key].items():
  lines=(P/x['saved']).read_text().splitlines();text='\n'.join(lines)
  utilize.append(dict(commit=x['commit'],path=x['path'],sha256=h,primary_url=x.get('primary_url',x.get('url')),zero_use_guard='number_of_uses == 0'in text,guard_lines=[dict(line=i+1,source=l)for i,l in enumerate(lines)if 'if number_of_uses'in l],metadata_unwrap_lines=[i+1 for i,l in enumerate(lines)if 'metadata.uses.unwrap()'in l],checked_sub_count=text.count('.checked_sub(number_of_uses)')))
 result['utilize']=utilize
 coords=J(R/'repro/pump/metaplex-candidate-build-11/raw-difference-classification.json')['different_source_locations'];out=[]
 for rec in coords:
  name='programs/token-metadata/'+rec['file'];line=patched[name].splitlines()[rec['candidate_line']-1].strip();matches=[]
  for h,x in snapshots[name].items():
   lines=(P/x['saved']).read_text().splitlines();actual=lines[rec['original_line']-1].strip() if rec['original_line']<=len(lines) else None
   occurrences=[i+1 for i,l in enumerate(lines)if l.strip()==line]
   matches.append(dict(commit=x['commit'],sha256=h,target_line=rec['original_line'],public_source_at_target_line=actual,accepted_anchor=line,exact_stripped_anchor_at_target_line=actual==line,anchor_occurrence_lines=occurrences))
  out.append(dict(record=rec,public_snapshot_observations=matches))
 result['diagnostic_coordinate_observations']=out
 result['total_distinct_file_snapshots']=sum(len(x)for x in snapshots.values())
 result['full_recovered_file_matches']=sum(bool(x['accepted11_full_file_matches'])for x in result['files'])
 return result
if __name__=='__main__':print(json.dumps(analyze(),indent=2))

def hunks():
 with tarfile.open(R/'repro/pump/metaplex-utilize-unified-guard-source-recovery/baseline-source.tar.gz') as t:baseline={m.name:t.extractfile(m).read().decode()for m in t.getmembers()}
 with tarfile.open(R/'repro/pump/metaplex-zero-use-source-recovery/source-snapshot.tar.gz') as t:patched={m.name:t.extractfile(m).read().decode()for m in t.getmembers()}
 history=J(P/'history-snapshots.json');downloads=J(P/'nearby-primary-downloads.json');norm=lambda s:re.sub(r'\s+','',s);rows=[]
 for name in baseline:
  sources={x['sha256']:x for x in downloads if x['recovered_path']==name and 'sha256'in x};sources.update({x['sha256']:x for group in history if group['recovered_path']==name for x in group['unique_accessible_sources']})
  a=baseline[name].splitlines(True);b=patched[name].splitlines(True);changes=[]
  for op,i,j,k,l in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes():
   if op=='equal':continue
   block=''.join(b[k:l]);target=[norm(s)for s in block.splitlines()];found=[]
   for x in sources.values():
    lines=[norm(s)for s in (P/x['saved']).read_text().splitlines()]
    if target and any(lines[z:z+len(target)]==target for z in range(len(lines)-len(target)+1)):found.append(x['commit'])
   changes.append(dict(operation=op,baseline_lines=[i+1,j],patched_lines=[k+1,l],removed_source=''.join(a[i:j]),added_source=block,normalized_added_block_seen_at_commits=found))
  rows.append(dict(path=name,public_source_snapshots_checked=len(sources),changes=changes))
 return rows
