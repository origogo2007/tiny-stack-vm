import{readFileSync as a,readdirSync as b,mkdirSync as c,writeFileSync as d}from'node:fs';
const A='014000009999999900000000000000090009999999999999222209999999999900999999999999990000',B='000112239999999922222221222122292229999999999999011009999999999912999999999999991101',C='011022339999999911111111111111191119999999999999000009999999999910999999999999990010',F=[(x,y)=>(x+y)|0,(x,y)=>(x-y)|0,Math.imul,(x,y)=>y?(x/y)|0:NaN,(x,y)=>y?x%y|0:NaN,(x,y)=>y?((x>>>0)/(y>>>0))|0:NaN,(x,y)=>y?(x>>>0)%(y>>>0)|0:NaN,(x,y)=>x&y,(x,y)=>x|y,(x,y)=>x^y,(x,y)=>x<<y,(x,y)=>x>>y,(x,y)=>(x>>>y)|0,(x,y)=>x==y?1:0,(x,y)=>x<y?1:0,(x,y)=>(x>>>0)<(y>>>0)?1:0];
function V(P,I){
const D=new Int32Array(256),E=new Int32Array(64),M=new Int32Array(256),O=[];
let s=0,p=0,q=0,t=1e6,u=0,n=P.length;
for(;;){
if(!t--)return[O,10];
if(q<0||q>=n)return[O,9];
const o=P[q];
if(!A[o]||A[o]=='9')return[O,5];
const m=+A[o],r=+B[o],w=+C[o];
if(q+m>=n)return[O,9];
const x=q+1+m;
if(s<r)return[O,2];
if(s-r+w>256)return[O,3];
q=x;
switch(o){
case 0:return[O,0];
case 1:D[s++]=P[x-1]<<24>>24;break;
case 2:D[s++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:q=x+((P[x-2]|P[x-1]<<8)<<16>>16);break;
case 49:case 50:{const v=D[--s];if((o==49)===(v==0))q=x+((P[x-2]|P[x-1]<<8)<<16>>16);break;}
case 51:if(p==64)return[O,7];E[p++]=x;q=P[x-2]|P[x-1]<<8;break;
case 52:if(!p)return[O,8];q=E[--p];break;
case 64:{const v=D[s-1];if(v<0||v>255)return[O,6];D[s-1]=M[v];break;}
case 65:{const v=D[s-1],g=D[s-2];if(v<0||v>255)return[O,6];s-=2;M[v]=g;break;}
case 80:{const v=''+D[s-1];if(O.length+v.length>65536)return[O,11];s--;O.push(...Buffer.from(v));break;}
case 81:if(O.length>65535)return[O,11];O.push(D[--s]&255);break;
case 82:D[s++]=u<I.length?I[u++]:-1;break;
case 83:return[O,D[--s]&255];
default:{const y=D[s-1],g=D[s-2],v=F[o<24?o-16:o<28?o-17:o<32?o-18:o-19](g,y);if(v!==v)return[O,4];s-=2;D[s++]=v;}
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const k of b(I).sort()){const[o,e]=V(a(I+'/'+k+'/program.bin'),a(I+'/'+k+'/input.bin'));c(O+'/'+k,{recursive:true});d(O+'/'+k+'/stdout.bin',Buffer.from(o));d(O+'/'+k+'/exit.txt',e+'\n');}
