from pathlib import Path
import argparse,json,shutil,subprocess,sys
D=Path(__file__).resolve().parent;W=D.parent
def build(number):
 H=D/('host-'+number);C=D/('controller-'+number);shutil.copytree(D/'controller',C);(C/'historical-macro.json').write_bytes((H/'macro-binding.json').read_bytes());O=D/('target-'+number)
 command=[sys.executable,'-I','-B',str(C/'build.py'),'--sdk',str(W/'mayhem-native-build/sdk'),'--target-sysroot',str(W/'windows-typeid-probe/linux-sysroot/rust'),'--vendor',str(W/'mayhem-native-build/vendor'),'--msvc',r'C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.44.35207','--windows-sdk',r'C:\Program Files (x86)\Windows Kits\10','--historical-macro-directory',str(H/'target/release'),'--output',str(O)]
 with (D/('target-'+number+'-driver.log')).open('wb') as f:r=subprocess.run(command,stdout=f,stderr=subprocess.STDOUT)
 result=json.loads((O/'result.json').read_text());print(number,r.returncode,result['status'],result.get('outputs'),flush=True);assert r.returncode==0
if __name__=='__main__':build(sys.argv[1])
