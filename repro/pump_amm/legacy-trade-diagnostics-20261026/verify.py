#!/usr/bin/env python3
"""Verify all legacy trades; enumerate every remaining full-log difference."""
import argparse
import base64
import difflib
import gzip
import hashlib
import json
from pathlib import Path
import re
from solders.transaction import Transaction

P=Path(__file__).resolve().parent
ROOT=P.parents[2]
BASE=ROOT/'repro/pump_amm/incentive-diagnostics-20261026/results/runtime'
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
PRIOR='739ebefb6a02e40ecbcda0054b5e6cfc8f92f3c6aa9c5788b39233e11f29b833'
FIELDS={'error','logs','events','inner','return_data','before','after','transaction_base64'}
ERROR=re.compile(r'^(Program log: AnchorError thrown in )([^\r\n]+):(\d+)(\. Error Code: ([^.]+)\..*)$')
COMPUTE=re.compile(r'^Program [1-9A-HJ-NP-Za-km-z]+ consumed \d+ of \d+ compute units$')
PANIC=re.compile(r'^(Program log: panicked at )([^\r\n]+):(\d+):(\d+):\n(.*)$',re.S)
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def require(ok,message):
    if not ok:raise ValueError(message)
def read(path):return json.loads(gzip.decompress(path.read_bytes()) if path.suffix=='.gz' else path.read_bytes())
def strip_compute(logs):return [x for x in logs if not COMPUTE.fullmatch(x)]
def labels(logs):return [x for x in logs if x.startswith(('Program log: Left:','Program log: Right:'))]
def macro_body(lines,index):
    text='\n'.join(lines[index:]);start=text.find('(')
    if start<0:return ''
    depth=1;end=start+1
    while end<len(text) and depth:
        if text[end]=='(':depth+=1
        elif text[end]==')':depth-=1
        end+=1
    return text[:end] if depth==0 else ''

def source_lines(original,current,number,error):
    old=original.splitlines();new=current.splitlines()
    for kind,a,b,c,d in difflib.SequenceMatcher(None,old,new,autojunk=False).get_opcodes():
        if a<=number-1<b:
            if kind=='equal':return [c+number-a]
            found=[i+1 for i in range(c,d) if ('require' in new[i] or 'error!' in new[i]) and error in macro_body(new,i)]
            require(bool(found),'unmapped changed source location '+str(number));return found
    raise ValueError('old source line outside file')

def normalize_pair(original,candidate,baseline_candidate,source_root):
    ol=strip_compute(original);cl=strip_compute(candidate)
    if ol==cl:return ol,cl,None
    original_errors=[ERROR.match(line) for line in ol if ERROR.match(line)]
    baseline_errors=[ERROR.match(line) for line in baseline_candidate if ERROR.match(line)]
    candidate_errors=[ERROR.match(line) for line in cl if ERROR.match(line)]
    if not original_errors:
        op=[PANIC.match(line) for line in ol if PANIC.match(line)]
        bp=[PANIC.match(line) for line in baseline_candidate if PANIC.match(line)]
        cp=[PANIC.match(line) for line in cl if PANIC.match(line)]
        if op:
            require(len(op)==len(bp)==len(cp)==1,'panic identity missing')
            o,b,c=op[0],bp[0],cp[0];filename=Path(b.group(2)).name
            require(filename in ('legacy_buy.rs','legacy_sell.rs') and c.group(2)=='src/'+filename,'panic source changed')
            allowed=source_lines((P/('baseline-'+filename)).read_text(),(source_root/'programs/pump-amm/src'/filename).read_text(),int(b.group(3)),'')
            require(int(c.group(3)) in allowed and c.group(4)==b.group(4) and c.group(5)==o.group(5),'panic expression or message changed')
            ol=[line.replace(o.group(2)+':'+o.group(3)+':'+o.group(4),'<panic-origin>') if line==o.group(0) else line for line in ol]
            cl=[line.replace(c.group(2)+':'+c.group(3)+':'+c.group(4),'<panic-origin>') if line==c.group(0) else line for line in cl]
            return ol,cl,None
        if any('AnchorError caused by account:' in line for line in ol) and any('Error Code: AccountOwnedByWrongProgram.' in line for line in baseline_candidate):
            require(len(baseline_errors)==len(candidate_errors)==1,'account-origin error missing')
            before,after=baseline_errors[0],candidate_errors[0];file=Path(before.group(2)).name
            require(file=='legacy_sell.rs' and after.group(2)=='src/'+file,'account-origin source changed')
            allowed=source_lines((P/('baseline-'+file)).read_text(),(source_root/'programs/pump-amm/src'/file).read_text(),int(before.group(3)),before.group(5))
            require(int(after.group(3)) in allowed,'account-origin guard changed')
            previous=[line.replace(before.group(2)+':'+before.group(3),'<candidate-origin>') if line==before.group(0) else line for line in strip_compute(baseline_candidate)]
            current=[line.replace(after.group(2)+':'+after.group(3),'<candidate-origin>') if line==after.group(0) else line for line in cl]
            require(previous==current,'additional account-origin log difference')
            return ol,cl,'baseline-account-origin-mismatch'
        return ol,cl,None
    require(len(original_errors)==1,'unexpected multi-error original')
    om=original_errors[0];op,on,ename=om.group(2),int(om.group(3)),om.group(5)
    marker=f'<original:{op}:{on}>'
    ol=[line.replace(f'{op}:{on}',marker) if line==om.group(0) else line for line in ol]
    if not baseline_errors:
        # Explicitly retained uncertainty: no candidate source coordinate existed
        # in the selected baseline. Do not invent one or mask "occurred".
        require(cl==strip_compute(baseline_candidate),'additional missing-origin log difference')
        return ol,cl,'baseline-missing-origin'
    require(len(baseline_errors)==1 and len(candidate_errors)==1,'candidate lost error origin')
    bm,cm=baseline_errors[0],candidate_errors[0]
    require(cm.group(5)==ename,'candidate error identity changed')
    filename=Path(bm.group(2)).name
    if filename in ('legacy_buy.rs','legacy_sell.rs'):
        old=(P/('baseline-'+filename)).read_text();current=(source_root/'programs/pump-amm/src'/filename).read_text()
        if filename=='legacy_buy.rs' and op.endswith('/buy.rs') and on in (733,776):
            token='require_gt!(curve, 0,' if on==733 else 'require_gte!(out, limit,'
            allowed=[i for i,line in enumerate(current.splitlines(),1) if token in line]
        else:allowed=source_lines(old,current,int(bm.group(3)),ename)
        require(cm.group(2)=='src/'+filename and int(cm.group(3)) in allowed,'candidate changed guard site: '+cm.group(0))
    else:
        require(cm.group(2)==bm.group(2) and cm.group(3)==bm.group(3),'unmapped non-legacy error coordinate changed')
    cl=[line.replace(cm.group(2)+':'+cm.group(3),marker) if line==cm.group(0) else line for line in cl]
    return ol,cl,None

def verify(runtime,candidate,source,record_path):
    record=read(record_path);require(record['returncode']==0 and record['source_unchanged'] is True and record['source_sha256']==record['source_after_sha256'],'build not successful')
    require(record['comparison']['candidate_sha256']==sha(candidate),'build/candidate mismatch')
    require(len(record['source_sha256'])==30,'incomplete compiled source')
    for name,value in record['source_sha256'].items():
        require(name.count('programs/pump-amm/')==1,'unexpected compiled source path')
        rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        require('..' not in Path(rel).parts and sha(source/rel)==value,'compiled source changed')
    for file in ('legacy_buy.rs','legacy_sell.rs'):
        require((source/'programs/pump-amm/src'/file).read_bytes()==(P/('proposed-'+file)).read_bytes(),'legacy source differs from reviewed proposal')
    results=[];remaining=[];total_signatures=0;corrected=0
    for suite,count in [('legacy_buy',1011),('legacy_sell',575)]:
        base=read(BASE/(suite+'.json.gz'))
        report_path=runtime/(suite+'.json')
        if not report_path.exists():report_path=report_path.with_suffix('.json.gz')
        report=read(report_path)
        require(base['original_sha256']==ORIGINAL and base['candidate_sha256']==PRIOR,'wrong baseline program')
        require(report['original_sha256']==ORIGINAL and report['candidate_sha256']==sha(candidate),'wrong execution program')
        require(len(report['cases'])==report['case_count']==len(base['cases'])==count and report['mismatches']==[],'incomplete/failed suite')
        good=0;targets=0
        for index,(row,old) in enumerate(zip(report['cases'],base['cases'])):
            require(row['case']==old['case'] and row.get('instruction')==old.get('instruction'),'case identity changed')
            original,rebuilt=row['original'],row['candidate']
            require(set(original)==set(rebuilt)==FIELDS,'incomplete effect fields')
            for key in FIELDS-{'logs'}:
                require(original[key]==rebuilt[key]==old['original'][key],'signed input or effect mismatch')
            for result in (original,rebuilt):
                raw=base64.b64decode(result['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw)
                require(bytes(tx)==raw and len(tx.signatures)==1 and all(tx.verify_with_results()),'invalid signature');total_signatures+=1
            require(strip_compute(original['logs'])==strip_compute(old['original']['logs']),'original logs changed')
            target=labels(old['original']['logs'])!=labels(old['candidate']['logs']);targets+=int(target)
            a,b,kind=normalize_pair(original['logs'],rebuilt['logs'],old['candidate']['logs'],source)
            if a==b:good+=1;corrected+=int(target)
            else:
                remaining.append({'suite':suite,'row':index,'case':row['case'],'kind':kind or 'remaining-full-log-difference','was_compared_value_target':target,'diff':list(difflib.unified_diff(a,b))})
        results.append({'suite':suite,'cases':count,'full_log_matches':good,'original_compared_value_targets':targets,'receipt_sha256':sha(report_path)})
    require(corrected==169,'not all169 original compared-value witnesses corrected')
    require(all(row['kind'] in ('baseline-missing-origin','baseline-account-origin-mismatch') and not row['was_compared_value_target'] for row in remaining),'unexpected remaining full-log discrepancy')
    return {'status':'bounded-correction-passed','candidate_sha256':sha(candidate),'suites':results,'verified_signature_fields':total_signatures,'compared_value_targets_corrected':corrected,'remaining_full_log_discrepancies':remaining,'perfect':not remaining}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('runtime','candidate','source','build-record','output'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();require(not a.output.exists(),'refusing to overwrite report');result=verify(a.runtime,a.candidate,a.source,a.build_record);a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k not in ('remaining_full_log_discrepancies',)}))
if __name__=='__main__':main()
