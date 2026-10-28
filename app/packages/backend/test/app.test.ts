import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';
test('unimplemented domain routes cannot pass as working APIs', async () => {
 const app=buildApp();
 try { const r=await app.inject('/v1/users/test'); assert.equal(r.statusCode,501); assert.equal(r.json().error,'COMPATIBILITY_NOT_IMPLEMENTED'); } finally { await app.close(); }
});
test('fixture replay matches method, path, normalized query, status and headers', async () => {
 const app=buildApp([{method:'GET',path:'/coins',query:{limit:'1',offset:'0'},status:206,headers:{'x-fixture':'recorded'},body:[{mint:'fixture-only'}],source:'synthetic-test'}]);
 try {
  const r=await app.inject('/coins?offset=0&limit=1'); assert.equal(r.statusCode,206); assert.equal(r.headers['x-fixture'],'recorded');assert.deepEqual(r.json(),[{mint:'fixture-only'}]);
  assert.equal((await app.inject('/coins?offset=1&limit=1')).statusCode,501);
  assert.equal((await app.inject({method:'POST',url:'/coins?offset=0&limit=1'})).statusCode,501);
  assert.equal((await app.inject('/coins?limit=1&limit=2')).statusCode,501);
 } finally { await app.close(); }
});
