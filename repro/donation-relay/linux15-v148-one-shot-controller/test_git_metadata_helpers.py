#!/usr/bin/env python3
"""Static Git closure helpers only. Tiny config fixtures; no Git process/repository initialization."""
from pathlib import Path
import ast,importlib.util,json,os,tempfile
P=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('controller_git_helpers',P/'controller.py');c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
passed=[]
def rejects(name,fn,secret=None):
 try:fn()
 except (ValueError,OSError) as e:
  if secret is not None:assert secret not in str(e),'rejected raw value leaked'
  passed.append(name);return
 raise AssertionError('negative case accepted: '+name)
with tempfile.TemporaryDirectory(prefix='relay15-git-config-static-') as td:
 root=Path(td).resolve();repo=root/'checkout';repo.mkdir();git=repo/'.git';git.mkdir();(git/'info').mkdir();(git/'objects/info').mkdir(parents=True)
 config=git/'config';safe=b'[core]\nrepositoryformatversion = 0\nfilemode = true\nbare = false\nlogallrefupdates = true\n[remote "origin"]\nurl = https://github.com/example/repo\nfetch = +refs/heads/*:refs/remotes/origin/*\n[gc]\nauto = 0\n[http "https://github.com/"]\n'
 config.write_bytes(safe);(git/'shallow').write_text('576889cbfb2e28d5b1c2f47f1488c0caa80b88b7\n');(git/'info/exclude').write_text('# default comments only\n\n')
 base=c.inherited_home_environment({'PATH':'/usr/bin:/bin','LANG':'C.UTF-8','LC_ALL':'C.UTF-8','GIT_OPTIONAL_LOCKS':'0'})
 home=os.environ.get('HOME')
 for op in ['head','status']:
  argv,env,proof=c.git_metadata_command(repo,op,base)
  assert env['HOME']==home and env['GIT_CONFIG_NOSYSTEM']=='1' and env['GIT_CONFIG_GLOBAL']==env['GIT_CONFIG_SYSTEM']=='/dev/null'
  assert env['GIT_ATTR_NOSYSTEM']=='1' and env['GIT_NO_REPLACE_OBJECTS']=='1' and env['GIT_TERMINAL_PROMPT']=='0'
  assert 'GIT_CONFIG_COUNT' not in env and 'GIT_CONFIG_PARAMETERS' not in env and 'GIT_SSH_COMMAND' not in env
  for setting in ['core.fsmonitor=false','core.hooksPath=/dev/null','core.attributesFile=/dev/null','core.excludesFile=/dev/null','submodule.recurse=false','gc.auto=0','maintenance.auto=false']:
   i=argv.index(setting);assert argv[i-1]=='-c'
  assert argv[:3]==['/usr/bin/git','--no-pager','--no-optional-locks']
  assert ('--ignore-submodules=all' in argv)==(op=='status')
  assert proof['raw_config_values_published'] is False
  passed.append(op+' fixed config/env/argv positive')
 secret='DO_NOT_LEAK_STATIC_SECRET_VALUE'
 settings=[('[core]','fsmonitor'),('[core]','sshCommand'),('[filter "driver"]','clean'),('[filter "driver"]','smudge'),('[filter "driver"]','process'),('[diff]','external'),('[diff "driver"]','textconv'),('[credential]','helper'),('[http "https://github.com/"]','extraHeader'),('[include]','path'),('[includeIf "gitdir:*"]','path'),('[extensions]','worktreeConfig'),('[remote "origin"]','promisor')]
 for header,key in settings:
  config.write_bytes(safe+(header+'\n'+key+' = '+secret+'\n').encode())
  rejects('reject '+header+' '+key,lambda:c.git_metadata_command(repo,'status',base),secret)
 config.write_bytes(safe)
 for field in ['GIT_CONFIG_COUNT','GIT_CONFIG_PARAMETERS','GIT_CONFIG_GLOBAL','GIT_CONFIG_SYSTEM','GIT_SSH_COMMAND']:
  rejects('reject injected '+field,lambda field=field:c.git_metadata_command(repo,'head',dict(base,**{field:secret})),secret)
 outside=root/'outside-config';outside.write_text('[core]\nfsmonitor = '+secret+'\n[filter "x"]\nclean = '+secret+'\n')
 config.unlink();config.symlink_to(outside)
 rejects('reject local config link before payload read',lambda:c.git_metadata_command(repo,'status',base),secret);config.unlink();config.write_bytes(safe)
 for rel in ['commondir','config.worktree','info/attributes','objects/info/alternates']:
  p=git/rel;p.write_text(secret)
  rejects('reject local '+rel,lambda:c.git_metadata_command(repo,'status',base),secret);p.unlink();p.symlink_to(outside)
  rejects('reject linked '+rel,lambda:c.git_metadata_command(repo,'status',base),secret);p.unlink()
 (git/'info/exclude').write_text(secret+'\n')
 rejects('reject hidden local exclusion',lambda:c.git_metadata_command(repo,'status',base),secret);(git/'info/exclude').write_text('# safe\n')
 moved=repo/'gitdir-saved';git.rename(moved);git.symlink_to(moved,target_is_directory=True)
 rejects('reject symlink Gitdir',lambda:c.git_metadata_command(repo,'head',base),secret);git.unlink();moved.rename(git)
 git.rename(moved);git.write_text('gitdir: '+str(outside)+'\n')
 rejects('reject gitfile indirection without opening target',lambda:c.git_metadata_command(repo,'head',base),secret);git.unlink();moved.rename(git)
 # Model hostile global/system config files as inaccessible payloads. The helper never opens them;
 # emitted Git environments bind both standard configuration sources to /dev/null instead.
 global_cfg=root/'global.gitconfig';system_cfg=root/'system.gitconfig';global_cfg.write_bytes(outside.read_bytes());system_cfg.write_bytes(outside.read_bytes())
 original=Path.read_bytes
 def watched(path):
  if path in [global_cfg,system_cfg,outside]:raise AssertionError('external config payload opened')
  return original(path)
 Path.read_bytes=watched
 try:
  for op in ['head','status']:
   argv,env,proof=c.git_metadata_command(repo,op,base)
   assert env['GIT_CONFIG_GLOBAL']==env['GIT_CONFIG_SYSTEM']=='/dev/null'
 finally:Path.read_bytes=original
 passed.append('global/system helper config payloads never read; exact null config environment')
 passed.append('empty checkout HTTP section and shallow metadata allowed')
 assert os.environ.get('HOME')==home;passed.append('HOME unchanged throughout')
 tree=ast.parse((P/'controller.py').read_text())
 git_argv=[n for n in ast.walk(tree) if isinstance(n,ast.List) and n.elts and isinstance(n.elts[0],ast.Constant) and n.elts[0].value=='/usr/bin/git']
 assert len(git_argv)==1;passed.append('one fixed Git argv constructor AST')
print(json.dumps(dict(status='PASS_STATIC_GIT_HELPER_CASES',case_count=len(passed),cases=passed,Git_processes=0,GitHub_dispatches=0,controller_main_invocations=0,acquisition_function_invocations=0,network_requests=0,new_builds=0,new_target_executions=0,shared_Git_writes=0,source_writes=0,raw_rejected_config_values_published=False),sort_keys=True))
