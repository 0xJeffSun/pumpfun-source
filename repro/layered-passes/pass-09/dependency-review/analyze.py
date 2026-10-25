"""Read-only next-pass classification of retained exact dependency bytes."""
import hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def sections(b):
 off=struct.unpack_from('<Q',b,40)[0];size,n,ni=struct.unpack_from('<HHH',b,58);rows=[struct.unpack_from('<IIQQQQIIQQ',b,off+i*size)for i in range(n)];s=rows[ni];names=b[s[4]:s[4]+s[5]]
 return {names[s[0]:].split(b'\0')[0].decode():s for s in rows}
def intervals(positions):
 out=[]
 for p in positions:
  if out and out[-1][1]==p:out[-1][1]+=1
  else:out.append([p,p+1])
 return out
def compare(original,candidate):
 a=original.read_bytes();b=candidate.read_bytes();s=sections(a);diff=[i for i,(x,y)in enumerate(zip(a,b))if x!=y]
 regions={n:sum(row[4]<=i<row[4]+row[5] for i in diff)for n,row in s.items()if row[1]!=8};regions={k:v for k,v in regions.items()if v}
 return {'original_sha256':H(a),'candidate_sha256':H(b),'original_bytes':len(a),'candidate_bytes':len(b),'whole_file_equal':a==b,'different_common_positions':len(diff),'excess_bytes':abs(len(a)-len(b)),'regions':regions,'all_ranges':intervals(diff),'differences':[{'offset':i,'original':a[i],'candidate':b[i]}for i in diff]}
def derive():
 ata=P/'retained/ata/inputs';meta=P/'retained/metaplex/inputs'
 a=compare(ata/'evidence/dependencies/associated_token/deployed.so',ata/'repro/pump/ata-candidate-build-2/spl_associated_token_account.so');m=compare(meta/'original.so',meta/'build11/rebuilt.deployed.so')
 assert a['different_common_positions']==307 and a['regions']=={'.text':304,'.rel.dyn':3}
 assert m['different_common_positions']==1509 and m['regions']=={'.text':1477,'.data.rel.ro':30,'.rel.dyn':2}
 assert all(236632<=i['offset']<241736 for i in m['differences']if 288<=i['offset']<628328)
 ledger=json.loads((P/'retained/ata/residual-ledger.json').read_text())
 return {'ata':a,'metaplex':m,'conclusion':{'grounded_source_patch':None,'new_builds':0,'new_runtime_probes':0,'network_requests':0,'binary_edits':0,'reason':'Existing exact residuals show no additional source contract discrepancy. ATA lacks artifact-linked build/source ordering provenance; Metaplex current guard semantics already implement the supported correction, while remaining body/data differences do not uniquely select source.'}}
if __name__=='__main__':
 print(json.dumps(derive(),indent=2,sort_keys=True))
