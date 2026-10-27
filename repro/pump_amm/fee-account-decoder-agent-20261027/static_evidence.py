"""Recompute the original FeeConfig decoder's captured identity and key facts."""
from pathlib import Path
import hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def evidence():
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');front=0xd9dc0;unchecked=0xda0a8;end=0xda540
 assert front in o.entries and unchecked in o.entries and end in o.entries
 disc=bytes(o.b[front+44:front+48]+o.b[front+52:front+56]);assert disc==bytes([143,52,146,187,219,123,76,155])
 assert o.b[0x11e5c6:0x11e5cf]==b'FeeConfig'
 assert o.calls[0xda098]==unchecked
 vectors=[{'at':at,'target':target}for at,target in o.calls.items()if unchecked<=at<end and target==0xecc8];assert len(vectors)==2
 immediates=[];pc=unchecked
 while pc<end:
  opcode=o.b[pc];immediate=struct.unpack_from('<i',o.b,pc+4)[0]
  immediates.append(immediate);pc+=16 if opcode==0x18 else 8
 assert 4073 not in immediates and 4097 not in immediates
 prior=json.loads((ROOT/'repro/pump_amm/typed-account-decoder-20261026/evidence.json').read_text())
 return {'original_sha256':hashlib.sha256(o.b).hexdigest(),'front_end':{'start':front,'bytes':unchecked-front,'sha256':hashlib.sha256(o.b[front:unchecked]).hexdigest()},'unchecked':{'start':unchecked,'bytes':end-unchecked,'sha256':hashlib.sha256(o.b[unchecked:end]).hexdigest()},'discriminator_hex':disc.hex(),'name_location':0x11e5c6,'name':'FeeConfig','name_length':9,'vector_decoder_calls':vectors,'allocation_thresholds_4073_or_4097_present_as_immediate':False,'generator':prior['generator'],'scope':'Static original byte and call evidence. Absence of these immediate thresholds is bounded evidence, supplemented by the complete1176-byte disassembly; not a whole-program equivalence claim.'}
if __name__=='__main__':print(json.dumps(evidence(),indent=2))
