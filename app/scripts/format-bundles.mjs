import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import prettier from 'prettier';
export async function formatBundles(root=fileURLToPath(new URL('..',import.meta.url))){
const manifest=JSON.parse(await fs.readFile(path.join(root,'evidence/web/manifest.json'),'utf8'));
const output=path.join(root,'recovered/pretty');await fs.mkdir(output,{recursive:true});
const records=[];
for(const record of manifest.records.filter(x=>x.status===200&&x.url.endsWith('.js'))){
 const file=createHash('sha256').update(record.url).digest('hex')+'-'+path.basename(new URL(record.url).pathname);
 try { const source=await fs.readFile(path.join(root,record.path),'utf8');const formatted=await prettier.format(source,{parser:'babel'}); await fs.writeFile(path.join(output,file),formatted);records.push({url:record.url,source:record.path,output:`recovered/pretty/${file}`,sha256:record.sha256,status:'formatted'}); }
 catch(error){records.push({url:record.url,status:'failed',error:String(error)});}
}
await fs.writeFile(path.join(output,'manifest.json'),JSON.stringify({notice:'Formatting only; not original sources and not runtime-equivalence proof.',records},null,2)+'\n');
console.log(`Formatted ${records.filter(r=>r.status==='formatted').length}/${records.length} scripts`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await formatBundles();
