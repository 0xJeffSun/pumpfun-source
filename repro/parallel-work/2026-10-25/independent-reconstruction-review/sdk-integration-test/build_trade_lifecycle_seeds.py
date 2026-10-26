#!/usr/bin/env python3
"""Build the two admin-singleton accounts a bonding-curve trade needs, to seed localnet.

The minimal localnet (three global configs) does not include the pump global_volume_accumulator
or the pump_fees fee_config, so buy_v2/sell_v2 fail with AccountNotInitialized (6/0xbc4). These
two accounts exist once on mainnet; this reconstructs them for a local fixture:

  * global_volume_accumulator (Hq2wp8…): a fresh GlobalVolumeAccumulator owned by pump, with the
    day-window timestamps aligned to the running validator's clock so the volume math indexes the
    30-slot ring in range.
  * fee_config (8Wf5Ti…): the captured mainnet account from curve-fee-config-snapshot.json.

Run against a running validator (reads its clock): python3 build_trade_lifecycle_seeds.py <out_dir>
Then add to the validator command:
  --account Hq2wp8uJ9jCPsYgNHex8RtqdvMPfVGoYwjvF1ATiwn2Y <out>/seed_gva.json
  --account 8Wf5TiAheLUqBrKXeYg2JtAFFMWtKdG2BSFgqUcPVwTt  <out>/seed_feeconfig.json
"""
import base64, json, struct, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[5]
RPC = 'http://127.0.0.1:8899'
GVA = 'Hq2wp8uJ9jCPsYgNHex8RtqdvMPfVGoYwjvF1ATiwn2Y'
FEE_CONFIG = '8Wf5TiAheLUqBrKXeYg2JtAFFMWtKdG2BSFgqUcPVwTt'
PUMP = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
GVA_DISC = bytes([202, 42, 246, 43, 142, 190, 30, 255])


def rpc(method, params):
    req = json.dumps({'jsonrpc': '2.0', 'id': 1, 'method': method, 'params': params}).encode()
    return json.load(urllib.request.urlopen(urllib.request.Request(RPC, req, {'Content-Type': 'application/json'})))['result']


def main():
    out = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve(); out.mkdir(parents=True, exist_ok=True)
    now = rpc('getBlockTime', [rpc('getSlot', [{'commitment': 'confirmed'}])])
    # GlobalVolumeAccumulator: disc + start_time,end_time,seconds_in_a_day (i64) + mint(32) + [u64;30]*2
    data = GVA_DISC + struct.pack('<qqq', now - 86400, now + 30 * 86400, 86400) + bytes(32) + bytes(30 * 8) + bytes(30 * 8)
    assert len(data) == 544, len(data)
    (out / 'seed_gva.json').write_text(json.dumps({'pubkey': GVA, 'account': {
        'lamports': 100_000_000, 'data': [base64.b64encode(data).decode(), 'base64'],
        'owner': PUMP, 'executable': False, 'rentEpoch': 0, 'space': len(data)}}))
    cap = json.loads((ROOT / 'research/imported-lab/analysis/pump_fun/curve-fee-config-snapshot.json').read_text())['fee_config']
    raw = base64.b64decode(cap['data_base64'])
    (out / 'seed_feeconfig.json').write_text(json.dumps({'pubkey': cap['address'], 'account': {
        'lamports': cap['lamports'], 'data': [cap['data_base64'], 'base64'],
        'owner': cap['owner'], 'executable': False, 'rentEpoch': 0, 'space': len(raw)}}))
    print(f'wrote seed_gva.json (GlobalVolumeAccumulator, window {now-86400}..{now+30*86400}) and seed_feeconfig.json')


if __name__ == '__main__':
    main()
