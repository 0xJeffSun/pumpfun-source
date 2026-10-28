import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import prettier from 'prettier';
const root=fileURLToPath(new URL('..',import.meta.url));
const manifest=JSON.parse(await fs.readFile(path.join(root,'evidence/web/manifest.json'),'utf8'));
const output=path.join(root,'recovered/modules');await fs.mkdir(output,{recursive:true});
const modules=new Map(), failures=[], routes=[], dependencies=[];
function walk(node,fn){if(!node||typeof node!=='object')return;fn(node);for(const [key,value] of Object.entries(node)){if(['loc','start','end','extra','comments','tokens'].includes(key))continue;if(Array.isArray(value))value.forEach(n=>walk(n,fn));else if(value&&typeof value==='object')walk(value,fn);}}
for(const record of manifest.records.filter(x=>x.status===200&&x.url.endsWith('.js'))){
 const source=await fs.readFile(path.join(root,record.path),'utf8');
 try {
  const ast=parse(source,{sourceType:'unambiguous',errorRecovery:false});
  walk(ast,node=>{
   if(node.type==='StringLiteral'&&/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) \/\S+$/.test(node.value))routes.push({operation:node.value,source:record.path,start:node.start,end:node.end,authority:'static-literal',service:'unresolved',implemented:false,qualified:false});
   if(node.type!=='CallExpression'||node.callee?.type!=='MemberExpression'||node.callee.property?.name!=='push'||node.arguments[0]?.type!=='ArrayExpression')return;
   if(!source.slice(node.callee.start,node.callee.end).includes('TURBOPACK'))return;
   let ids=[];
   for(const item of node.arguments[0].elements.slice(1)){
    if(item?.type==='NumericLiteral'||item?.type==='StringLiteral')ids.push(item.value);
    else if(item?.type==='ArrowFunctionExpression'||item?.type==='FunctionExpression'){
     const raw=source.slice(item.start,item.end);const hash=createHash('sha256').update(raw).digest('hex');
     const key=hash;const existing=modules.get(key)??{ids:[],sha256:hash,sourceCode:raw,origins:[]};
     existing.ids=[...new Set([...existing.ids,...ids])];existing.origins.push({source:record.path,url:record.url,start:item.start,end:item.end});modules.set(key,existing);ids=[];
    }else ids=[];
   }
  });
 }catch(error){failures.push({source:record.path,error:String(error)});}
 for(const match of source.matchAll(/node_modules\/\.pnpm\/([^/"\s]+)/g))dependencies.push({specifier:match[1],source:record.path,offset:match.index});
}
for(const module of modules.values()){
 module.path=`recovered/modules/${module.ids[0]??'anonymous'}-${module.sha256.slice(0,12)}.js`;
 const text=await prettier.format(`(${module.sourceCode});`,{parser:'babel'});
 await fs.writeFile(path.join(root,module.path),'// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.\n'+text);
 delete module.sourceCode;
}
const report={authority:'Shipped public JavaScript; factory boundaries via AST. Original filenames and TS types unavailable.',rangeEncoding:'UTF-16 code-unit half-open offsets in UTF-8 decoded source',modules:[...modules.values()],failures};
await fs.writeFile(path.join(root,'recovered/modules.json'),JSON.stringify(report,null,2)+'\n');
await fs.writeFile(path.join(root,'contracts/internal-operations.json'),JSON.stringify({notice:'Static candidate operations; includes shared/excluded/admin code. Never probe privileged routes automatically.',operations:[...new Map(routes.map(r=>[r.operation,r])).values()].sort((a,b)=>a.operation.localeCompare(b.operation)),occurrences:routes},null,2)+'\n');
await fs.writeFile(path.join(root,'evidence/web/dependency-paths.json'),JSON.stringify(dependencies,null,2)+'\n');
console.log(JSON.stringify({modules:modules.size,parseFailures:failures.length,uniqueOperations:new Set(routes.map(r=>r.operation)).size}));
