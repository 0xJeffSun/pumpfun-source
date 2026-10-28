import os, runpy
g = runpy.run_path(os.path.dirname(os.path.abspath(__file__)) + '/h_v3.py')
C, OLD, R, SIG, TC, CALL = g['C'], g['OLD'], g['R'], g['SIG'], g['TC'], g['CALL']
T = TC % 'mint.decimals'
H = {
 'o': SIG + " if amount>0{\n  " + T + "?;\n }\n Ok(())\n}\n",
 'p': SIG + " if amount!=0{\n  " + T + "\n } else {\n  Ok(())\n }\n}\n",
 'q': SIG + " if amount==0{\n  Ok(())\n } else {\n  " + T + "\n }\n}\n",
 'r': SIG + " if amount==0{return Ok(());}\n " + T + "?;\n Ok(())\n}\n",
}
VARIANTS = {k: h + R(C, OLD, CALL) for k, h in H.items()}
