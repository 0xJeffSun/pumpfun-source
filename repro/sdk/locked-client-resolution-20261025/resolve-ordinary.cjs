/* Offline Anchor instruction construction only; no Connection, transaction, wallet signing or network. */
const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');
const root=__dirname;let networkAttempts=[];
for(const name of ['node:http','node:https']){const module=require(name);for(const key of ['request','get'])module[key]=(...args)=>{networkAttempts.push(name+'.'+key);throw Error('Network is disabled for resolver-only verification');};}
for(const name of ['node:net','node:tls']){const module=require(name);for(const key of ['connect','createConnection'])if(module[key])module[key]=()=>{networkAttempts.push(name+'.'+key);throw Error('Socket is disabled');};}
global.fetch=async()=>{networkAttempts.push('fetch');throw Error('fetch disabled');};
const anchor=require('@coral-xyz/anchor');const {PublicKey}=require('@solana/web3.js');const BN=require('bn.js');
const idl=JSON.parse(fs.readFileSync(path.join(root,'node_modules/@pump-fun/pump-swap-sdk/src/idl/pump_amm.json'),'utf8'));
let rpcAttempts=[];const connection=new Proxy({}, {get(_,key){return()=>{rpcAttempts.push(String(key));throw Error('RPC disabled: '+String(key));};}});
const provider={connection,publicKey:PublicKey.default,wallet:{publicKey:PublicKey.default,signTransaction:async()=>{throw Error('Signing disabled');},signAllTransactions:async()=>{throw Error('Signing disabled');}},opts:{}};
const program=new anchor.Program(idl,provider);const shared=JSON.parse(fs.readFileSync(path.join(root,'../ordinary-inputs.json'),'utf8'));
(async()=>{let rows=[];for(const name of ['buy','sell']){
 const ixIdl=idl.instructions.find(x=>x.name===name);const accounts=Object.fromEntries(shared.explicit_account_keys.map((key,i)=>[key,new PublicKey(Uint8Array.from({length:32},()=>i+1))]));
 const builder=name==='buy'?program.methods.buy(new BN(1),new BN(1),{0:true}):program.methods.sell(new BN(1),new BN(1));
 const instruction=await builder.accounts(accounts).remainingAccounts([]).instruction();
 const actual=instruction.keys.map((m,i)=>({index:i,idlName:ixIdl.accounts[i].name,key:m.pubkey.toBase58(),isSigner:m.isSigner,isWritable:m.isWritable}));
 if(actual.length!==ixIdl.accounts.length)throw Error('Named IDL account cardinality mismatch');
 const supplied=new Set(shared.explicit_account_keys);const filled=actual.filter(r=>!supplied.has(r.idlName.replace(/_([a-z])/g,(_,c)=>c.toUpperCase())));
 if(filled.length!==(name==='buy'?4:2))throw Error('Unexpected resolver fill cardinality');
 rows.push({instruction:name,programId:instruction.programId.toBase58(),dataHex:instruction.data.toString('hex'),explicitKeys:shared.explicit_account_keys,filled,actual,remainingAccounts:[],scope:'Synthetic named-account resolver only; SDK state/fee/remaining/wrapper/target validation untested'});
 }
 if(networkAttempts.length||rpcAttempts.length)throw Error('Unexpected network/RPC request');
 fs.writeFileSync(path.join(root,'../resolver-result.json'),JSON.stringify({status:'PASS_OFFLINE_NAMED_ACCOUNT_RESOLVER_ONLY',node:process.version,anchor:require('@coral-xyz/anchor/package.json').version,rootWeb3:JSON.parse(fs.readFileSync(path.join(root,'node_modules/@solana/web3.js/package.json'))).version,networkAttempts,rpcAttempts,transactionsSigned:0,transactionsSubmitted:0,loadedModules:Object.keys(require.cache).filter(x=>x.includes('/node_modules/')).map(file=>({relative:path.relative(root,file),sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')})).sort((a,b)=>a.relative.localeCompare(b.relative)),rows},null,2)+'\n');console.log('PASS: buy4/sell2 named resolver fields; no RPC/network/signing/submission');
})().catch(err=>{console.error(err.stack);process.exitCode=1;});
