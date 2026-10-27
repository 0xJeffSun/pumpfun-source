"""Falsify signature, artifact, state and compiler-copy evidence in memory."""
import base64,copy,gzip,json,re,struct
import verify as v

def reject(label,fn,reason):
    try:fn()
    except AssertionError as error:
        assert reason is None or reason in str(error),(label,str(error))
        print('PASS negative:',label)
    else:raise AssertionError('accepted '+label)

def main():
    v.bindings()
    d=v.HERE/'runtime/after';header=v.load(d/'donation_crank-observed.json')
    known={x['sha256']for x in header['loaded_files'].values()}
    with gzip.open(d/'donation_crank-observed.jsonl.gz','rt')as stream:o=json.loads(next(stream));c=json.loads(next(stream))
    check=lambda a,b:v.validate_pair(a,b,v.ORIGINAL,v.HASHES['after'][0],known)
    check(o,c)
    changed=copy.deepcopy(c);raw=bytearray(base64.b64decode(changed['transaction_base64']));raw[1]^=1
    changed['transaction_base64']=base64.b64encode(raw).decode()
    reject('actual signature corruption',lambda:check(o,changed),'cryptographic signature')
    changed=copy.deepcopy(c);changed['fees_sha256']=v.HASHES['before'][0]
    reject('wrong loaded candidate attribution',lambda:check(o,changed),'loaded Fees artifact')
    changed=copy.deepcopy(c);key=next(k for k,a in changed['after'].items()if a is not None);changed['after'][key]['lamports']+=1
    reject('changed final account balance despite passing canonical receipt',lambda:check(o,changed),'execution field')

    w=v.module('negative_windows',v.ROOT/'research/fees-composed-frontier188/window_map.py')
    image=v.unpack(v.HERE/'builds/after/symbols.so.gz');rows=w.m.instructions(image,631920,15736)
    v.copy24(rows,14584)
    layout=w.m.elf_layout(image);section=next(s for s in layout['sections']if s['name']=='.text')
    offset=section['offset']+631920+14512-section['address']+2
    changed=bytearray(image);value=struct.unpack_from('<h',changed,offset)[0];struct.pack_into('<h',changed,offset,value+1)
    reject('actual six-instruction error-copy destination corruption',lambda:v.copy24(w.m.instructions(bytes(changed),631920,15736),14584),None)
    ir=v.unpack(v.HERE/'ir/after/root.ll.gz').decode()
    name=next(r['name']for r in w.windows(image)if r['address']==631920)
    start=re.search(r'^define .*@'+re.escape(name)+r'\(',ir,re.M).start();body=ir[start:ir.index('\n}',start)+2]
    v.crank_ir(body,True)
    changed=body.replace('dereferenceable(24) %_272) #25','dereferenceable(24) %_73) #25')
    assert changed!=body
    reject('IR conversion bypasses copied error',lambda:v.crank_ir(changed,True),'conversion must use copied error')
    print('PASS: five controls; preserved inputs unchanged')

if __name__=='__main__':main()
