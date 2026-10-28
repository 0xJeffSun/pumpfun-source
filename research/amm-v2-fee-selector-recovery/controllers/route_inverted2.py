from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
src=J/'source-route-inverted2';shutil.copytree(J/'source-route-inverted',src);p=src/'programs/pump-amm/src/curve/fees.rs';s=p.read_text();assert s.count('    }\n    };\n    Ok(selected.clone())')==1;p.write_text(s.replace('    }\n    };\n    Ok(selected.clone())','    };\n    Ok(selected.clone())'))
build('route-inverted2','Correct only generator duplicate closingbrace from rejected parse-error route-inverted. Hypothesis unchanged: source nonnormalfirst and flatfallback condition to produce qualified originalblockordering; successful artifact must be newly measured.')
