exec(open('ed/common.py').read())
rep(C+'\n','')           # move C after D
rep(D, D+'\n'+C)
