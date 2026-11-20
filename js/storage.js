import {STORAGE_KEY,CORNERS_KEY,DEFAULT_SETTINGS} from './config.js';
import {createLights,validateLights} from './lights.js';
export function loadState(){
 let lights=createLights(),settings={...DEFAULT_SETTINGS},corners=[];
 try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
  if(saved&&validateLights(saved.lights))lights=saved.lights;
  if(saved?.settings){for(const [key,min,max] of [['interval',100,1000],['smoothing',0,90],['brightness',0,100]]){
   const v=Number(saved.settings[key]);if(Number.isFinite(v)&&v>=min&&v<=max)settings[key]=v;
  }}
 }catch(e){console.warn('Ignoring invalid settings',e);}
 try{const c=JSON.parse(localStorage.getItem(CORNERS_KEY)||'null');if(Array.isArray(c)&&c.length===4&&c.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.x<=1&&p.y>=0&&p.y<=1))corners=c;}catch(e){}
 return {lights,settings,corners};
}
export function saveState(lights,settings){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,lights,settings}));}catch(e){console.warn('Cannot save settings',e);}}
export function saveCorners(corners){try{if(corners.length===4)localStorage.setItem(CORNERS_KEY,JSON.stringify(corners));else localStorage.removeItem(CORNERS_KEY);}catch(e){console.warn('Cannot save corners',e);}}
