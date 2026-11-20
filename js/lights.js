import {LIGHT_COUNT,DEFAULT_MAPPING,ZONES} from './config.js';
import {applyBrightness,rgbToHex} from './colors.js';
export function createLights(){return Array.from({length:LIGHT_COUNT},(_,i)=>({id:`living-${String(i+1).padStart(2,'0')}`,name:`Living Room Light ${i+1}`,zone:DEFAULT_MAPPING[i],enabled:true}));}
export function validateLights(lights){return Array.isArray(lights)&&lights.length===LIGHT_COUNT&&lights.every((l,i)=>l&&l.id===`living-${String(i+1).padStart(2,'0')}`&&typeof l.name==='string'&&l.name.length<=80&&ZONES.includes(l.zone)&&typeof l.enabled==='boolean');}
export function buildCommands(lights,zoneRGB,brightness,timestamp=Date.now()){
 return lights.filter(l=>l.enabled&&Array.isArray(zoneRGB[l.zone])).map(l=>({lightId:l.id,lightName:l.name,zone:l.zone,rgb:applyBrightness(zoneRGB[l.zone],brightness),hex:rgbToHex(applyBrightness(zoneRGB[l.zone],brightness)),timestamp}));
}
export class SimulatorTransport {
 constructor(onUpdate){this.onUpdate=onUpdate;this.lastCommands=[];}
 async send(commands){this.lastCommands=commands;this.onUpdate(commands);return {simulated:true,count:commands.length};}
}
// Transport interface: async send(commands) => result. No network calls in Phase 3.
// Native iOS transport can implement the same contract using local WiZ UDP.
