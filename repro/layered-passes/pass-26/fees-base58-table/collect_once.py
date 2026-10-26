from pathlib import Path
import hashlib,json,struct
R=Path.cwd();P=R/'work/fees2387-base58-table-admitted'
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
known=[('work/fees2387-base58-dependency-plan','acc8f159907a21182cfc1402d979e00d1193c7303364e958c51c23a6ee4fe8c8'),('work/fees2387-base58-dependency-admitted','c7889913d53f3bf5c0ffcae24dc0ee54d21a5f55ad546d3efdb9ff4138fac8a1')]
for rel,seal in known:
 q=R/rel;b=(q/'manifest.json').read_bytes();assert H(b)==seal
 for n,x in json.loads(b)['files'].items():
  v=(q/n).read_bytes();assert H(v)==x['sha256'] and len(v)==x['bytes']
inputs=json.loads((R/known[0][0]/'inputs.json').read_text())
indexpath=R/'repro/layered-passes/pass-25/current-analysis-index.json';indexbytes=indexpath.read_bytes();index=json.loads(indexbytes)['programs']['pump_fees']
oldindex=next(x for x in inputs['metadata'] if x['path']=='repro/layered-passes/pass-25/current-analysis-index.json')
assert H(indexbytes)==oldindex['sha256'] and len(indexbytes)==oldindex['bytes']
for x in index['full_ledger_files']:
 b=(R/x['path']).read_bytes();assert H(b)==x['sha256'] and len(b)==x['bytes']
images={}
for side in ['original','candidate']:
 b=(R/inputs[side]['path']).read_bytes();assert H(b)==inputs[side]['sha256']==index[side+'_sha256'];images[side]=b
J(P/'preflight.json',{'result':'PASS','known_seals':[{'path':r,'seal':s} for r,s in known],'full_ELF_before':{side:{**inputs[side],'bytes':len(images[side])} for side in images},'current_index_sha256':H(indexbytes),'full_ledger_files_verified':index['full_ledger_files'],'before_any_bounded_data_extraction':True})
rows=[]
for side,start,end in [('original',815975,816033),('candidate',804697,804755)]:
 b=images[side];assert b[:6]==b'\x7fELF\x02\x01'
 shoff=struct.unpack_from('<Q',b,40)[0];entsize,count=struct.unpack_from('<HH',b,58);assert entsize==64 and shoff+entsize*count<=len(b)
 matches=[]
 for i in range(count):
  name,kind,flags,addr,offset,size,link,info,align,entry=struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*entsize)
  if kind!=8 and flags&2 and addr<=start and end<=addr+size:
   assert offset+size<=len(b)
   matches.append({'section_index':i,'type':kind,'flags':flags,'virtual_address':addr,'file_offset':offset,'file_size':size})
 assert len(matches)==1
 section=matches[0];file_start=section['file_offset']+start-section['virtual_address'];file_end=file_start+(end-start)
 assert len(b)>=file_end and end-start==58
 raw=b[file_start:file_end]
 out=P/(side+'-58bytes.bin');assert not out.exists();out.write_bytes(raw)
 rows.append({'side':side,'source_path':inputs[side]['path'],'source_sha256':H(b),'VA_start':start,'VA_end':end,'bytes':58,'containing_section_mapping':section,'file_start':file_start,'file_end':file_end,'slice_sha256':H(raw),'file':out.name,'surrounding_data_copied':False,'section_name_or_object_header_or_descriptor_read':False})
J(P/'capture.json',{'scope':'Exactly root-admitted58B table consumer slices; containing ELF section fields only for VA/file translation','rows':rows,'section_mapping_verified_before_slice':True,'no_other_payload_slice':True,'lower_body_decode':False,'runtime_compiler_fixture':False})
after={}
for side in images:
 src=R/inputs[side]['path'];digest=H(src.read_bytes());assert digest==inputs[side]['sha256'];after[side]={'path':inputs[side]['path'],'sha256':digest,'unchanged':True}
assert H(indexpath.read_bytes())==H(indexbytes)
J(P/'source-hashes-after.json',{'full_ELF_after':after,'current_index_after_sha256':H(indexpath.read_bytes()),'current_index_unchanged':True,'old_plan_and_proof_unmodified':all(H((R/r/'manifest.json').read_bytes())==s for r,s in known)})
print(json.dumps({'result':'PASS','collections':2,'bytes_each':58,'rows':rows,'full_ELF_source_hashes_after':'exact','data_around_slices_read':False},indent=2))
