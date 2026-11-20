import {REGIONS} from './config.js';
export const clamp=(n,min=0,max=255)=>Math.max(min,Math.min(max,n));
export const rgbToHex=rgb=>'#'+rgb.map(v=>Math.round(clamp(v)).toString(16).padStart(2,'0')).join('').toUpperCase();
export const hexToRgb=hex=>/^#[\da-fA-F]{6}$/.test(hex)?[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)):null;
export function project(u,v,corners){
 if(!Array.isArray(corners)||corners.length!==4)return {x:u,y:v};
 const [a,b,c,d]=corners;
 return {x:(1-u)*(1-v)*a.x+u*(1-v)*b.x+u*v*c.x+(1-u)*v*d.x,
 y:(1-u)*(1-v)*a.y+u*(1-v)*b.y+u*v*c.y+(1-u)*v*d.y};
}
export function sampleRegion(pixels,width,height,region,corners,samples=8){
 const [,u0,v0,u1,v1]=region;let r=0,g=0,b=0,n=0;
 for(let j=0;j<samples;j++)for(let i=0;i<samples;i++){
  const p=project(u0+(i+.5)*(u1-u0)/samples,v0+(j+.5)*(v1-v0)/samples,corners);
  const x=Math.round(clamp(p.x,0,1)*(width-1)),y=Math.round(clamp(p.y,0,1)*(height-1));
  const k=(y*width+x)*4;r+=pixels[k];g+=pixels[k+1];b+=pixels[k+2];n++;
 }
 return [r/n,g/n,b/n];
}
export function extractZones(pixels,width,height,corners,previous={},retention=.6){
 const result={};
 for(const region of REGIONS){const raw=sampleRegion(pixels,width,height,region,corners);const old=previous[region[0]]||raw;
  result[region[0]]=raw.map((v,i)=>Math.round(clamp(old[i]*retention+v*(1-retention))));}
 return result;
}
export function applyBrightness(rgb,brightness){return rgb.map(c=>Math.round(clamp(c*clamp(brightness,0,100)/100)));}
