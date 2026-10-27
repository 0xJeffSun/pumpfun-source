"""Run an unchanged baseline comparator while recording and checking its signatures."""
from pathlib import Path
import base64,gzip,hashlib,json,runpy,sys
from solders.litesvm import LiteSVM
out=Path(sys.argv[1]);script=Path(sys.argv[2]);args=sys.argv[3:]
send=LiteSVM.send_transaction;load=LiteSVM.add_program_from_file;programs={};rows=[]
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
def loading(vm,key,path):
    if str(key)==MAY:programs[id(vm)]=hashlib.sha256(Path(path).read_bytes()).hexdigest()
    return load(vm,key,path)
def sending(vm,tx):
    checks=tx.verify_with_results();assert checks and all(checks)
    raw=bytes(tx);result=send(vm,tx);assert bytes(tx)==raw
    rows.append({'program_sha256':programs.get(id(vm)),'transaction_base64':base64.b64encode(raw).decode(),'signature_verification':checks})
    return result
LiteSVM.add_program_from_file=loading;LiteSVM.send_transaction=sending
sys.path.insert(0,str(script.parent));sys.argv=[str(script),*args]
status=0
try:runpy.run_path(str(script),run_name='__main__')
except SystemExit as exc:status=exc.code or 0
finally:out.write_bytes(gzip.compress(json.dumps({'script':str(script),'script_sha256':hashlib.sha256(script.read_bytes()).hexdigest(),'transactions':rows}).encode(),mtime=0))
raise SystemExit(status)
