from pathlib import Path
import hashlib,json,struct
R=Path(__file__).resolve().parent;repo=next(p for p in R.parents if (p/'evidence/original/mayhem/deployed.so').is_file());b=(repo/'evidence/original/mayhem/deployed.so').read_bytes()
wins=[('trade_account_consumption',0xa030,0xa0b0),('signer_validation',0x976d8,0x97730),('burn_deadline_check',0xd898,0xd8e8),('burn_deadline_error',0xda00,0xda38),('burn_status_check',0xda38,0xda48),('burn_status_error',0xdb60,0xdb90),('burn_amount_load',0xdbc0,0xdbd0),('burn_cpi_call_and_amount_store',0xe110,0xe140),('burn_final_status_store',0xed70,0xed90),('burn_instruction_discriminator',0x93630,0x93670),('trade_has_one_example',0x54550,0x54608)]
claims=[]
for label,s,e in wins: claims.append({'label':label,'file_offset_start':s,'file_offset_end':e,'hex':b[s:e].hex(),'sha256':hashlib.sha256(b[s:e]).hexdigest()})
sources=json.loads((R/'inputs/source-references.json').read_text())
for item in sources:
 p=R/item['bundled_file']
 assert hashlib.sha256(p.read_bytes()).hexdigest()==item['sha256'], ('Source snapshot hash mismatch',str(p))
report={'scope':'Static inventory only; no transactions, output patches, main-source edits, or initializer analysis beyond preexisting router metadata.','binary_sha256':hashlib.sha256(b).hexdigest(),'implemented_handler_count_at_inventory':17,'remaining_handler_count':8,'recommended_next_handler':'burn_tokens','instruction_windows':claims,'literal_evidence':[{'offset':0xad4a9,'length':9,'text':b[0xad4a9:0xad4a9+9].decode()},{'offset':0xad4c4,'length':48,'text':b[0xad4c4:0xad4c4+48].decode()}],'sources':sources,'qualification':'Burn direct account parser has no 0x28 byte load or direct call to either observed Signer helper. This is a bounded static negative, not proof of complete transitive absence or validated runtime reachability.'}
(R/'static-evidence.json').write_text(json.dumps(report,indent=2)+'\n')
