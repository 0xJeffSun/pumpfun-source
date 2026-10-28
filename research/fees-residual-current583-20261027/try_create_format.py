from pathlib import Path
import subprocess
W=Path(__file__).resolve().parent;p=W/'source-create/programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs';lib=W/'source-create/programs/pump-fees/src/lib.rs';base=(W/'create583.baseline.rs').read_text();libbase=lib.read_text()
forms={
'create583-display-value':'{ struct PoolMessage(FeeError); impl core::fmt::Display for PoolMessage { #[inline(always)] fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result { core::fmt::Display::fmt(&self.0, f) } } PoolMessage(FeeError::InvalidPool).to_string() }',
'create583-display-reference':"{ struct PoolMessage<'a>(&'a FeeError); impl core::fmt::Display for PoolMessage<'_> { #[inline(always)] fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result { core::fmt::Display::fmt(self.0, f) } } PoolMessage(&FeeError::InvalidPool).to_string() }",
'create583-formatter-constructor':'{ let mut text = String::new(); let mut formatter = core::fmt::Formatter::new(&mut text); core::fmt::Display::fmt(&FeeError::InvalidPool, &mut formatter).expect("a Display implementation returned an error unexpectedly"); text }'}
try:
 for name,value in forms.items():
  source=base.replace('FeeError::InvalidPool.to_string()',value);p.write_text(source);lib.write_text(libbase.replace('feature(core_intrinsics, try_blocks)','feature(core_intrinsics, try_blocks, fmt_internals)')if name.endswith('constructor')else libbase)
  r=subprocess.run(['python3',str(W/'build_create.py'),name],stdout=subprocess.PIPE,stderr=subprocess.STDOUT);print(name,r.returncode,r.stdout.decode(),flush=True);(W/name/'create.rs').write_text(source)
  if r.returncode==0:subprocess.run(['python3',str(W/'measure_create.py'),str(W/name/'symbols.so'),str(W/name/'measure.json')],check=True)
finally:p.write_text(base);lib.write_text(libbase)
