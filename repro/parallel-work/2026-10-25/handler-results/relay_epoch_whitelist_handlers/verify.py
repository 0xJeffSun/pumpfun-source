#!/usr/bin/env python3
import sys
sys.dont_write_bytecode=True
import hashlib,json,re,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda x:hashlib.sha256(x).hexdigest()
def require(ok,msg):
 if not ok:raise SystemExit('FAIL: '+msg)
manifest=json.loads((P/'manifest.json').read_text())
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.name!='manifest.json'}
require(actual==set(manifest['files']),'artifact set')
for name,r in manifest['files'].items():
 b=(P/name).read_bytes();require(len(b)==r['size'] and H(b)==r['sha256'],name)
for r in json.loads((P/'input-manifest.json').read_text())['inputs']:
 b=(P/r['local']).read_bytes()
 require(H(b)==r['sha256'],'input sha '+r['local'])
 require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'input blob '+r['local'])
from derive import derive
from decode import decode
s=derive();require(s==json.loads((P/'static-evidence.json').read_text()),'static derivation')
for r in s['windows']:
 require((P/f"window-{r['ordinal']}.txt").read_text()==decode(r['ordinal']),'readable window')
b=(P/'inputs/deployed.so').read_bytes();idl=json.loads((P/'inputs/idl.json').read_text())
for d in json.loads((P/'inputs/dispatch.json').read_text()):
 if d['name'] not in ('close_donation_epoch_v1','upsert_mint_whitelist_v1'):continue
 pc=d['dispatch_call_pc'];require(pc+8+8*struct.unpack_from('<i',b,pc+4)[0]==d['direct_callee_start'],'dispatch signed call')
 pc=d['constant_pc'];require(b[pc+4:pc+8]+b[pc+12:pc+16]==bytes.fromhex(d['discriminator']),'dispatch discriminator')
 require(next(x for x in idl['instructions'] if x['name']==d['name'])==d['idl'],'IDL binding')
rs=(P/'hypothesis.rs').read_text()
def array(name):
 return bytes(int(x.strip()) for x in re.search(r'pub const '+name+r':[^=]+?=\s*\[([^\]]+)\]',rs).group(1).split(','))
require(array('RELAYER')==b[752896:752928],'Rust relayer')
require(array('WHITELIST_DISC')==b[757549:757557],'Rust whitelist discriminator')
require(array('EVENT_DISCRIMINATOR')==bytes(next(x['discriminator'] for x in idl['events'] if x['name']=='DonationEpochClosedV1Event')),'event discriminator IDL')
def lddw(pc):return b[pc+4:pc+8]+b[pc+12:pc+16]
require(array('EVENT_DISCRIMINATOR')==lddw(580424)==lddw(581008),'event prefix operands')
require(array('EVENT_CPI_TAG')==lddw(581352),'CPI prefix operand')
require('checked_add(1).ok_or(6008u32)' in rs and 'if mints.len() > 32' in rs,'source bounds')
require(struct.unpack_from('<I',b,754592)[0]==4101,'payer code')
print(json.dumps({'status':'pass','kind':'static-only','whole_input_hashes':True,
 'selected_windows':len(s['windows']),'byte_ranges':len(s['ranges']),
 'manifest_sha256':H((P/'manifest.json').read_bytes()),'build_or_target_execution':False},sort_keys=True))
