"""Whole read-only-data equality is separate from normalized instruction equality."""
from pathlib import Path
import gzip,importlib.util,json
P=Path(__file__).resolve().parent;ROOT=P.parents[2]
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 parser=module('settlement_scope_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');meta=json.loads((P/'metadata.json').read_text());desc=meta['variants']['recovered']['artifacts']['symbols'];raw=gzip.decompress((P/desc['path']).read_bytes());elf=parser.Elf(raw);section=elf.by_name['.rodata'];changed=bytearray(raw);changed[section['offset']]^=1;new=parser.Elf(bytes(changed));assert elf.section_bytes(elf.by_name['.text'])==new.section_bytes(new.by_name['.text']);assert elf.section_bytes(section)!=new.section_bytes(new.by_name['.rodata']);assert section['size']==19863
 analysis=module('settlement_scope_analysis',P/'analyze.py').analyze()['recovered'];checker=module('settlement_scope_data',ROOT/'repro/donation-relay/settlement-bodies-source-proposal/compare.py');original=(ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes();result=checker.data_graph(parser,analysis,original,bytes(changed));assert not result['full_rodata_equal']and not result['relocated_data_shape_equal']
 print('PASS: rodata mutation leaves instructions unchanged and is rejected by the data-graph checks')
if __name__=='__main__':main()
