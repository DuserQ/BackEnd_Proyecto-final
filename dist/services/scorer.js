"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rulesScore = rulesScore;
const STRATUM_INDICATORS = ["stratum", "xmr", "minexmr", "pool", "monero"];
const JA3_SUS = new Set([
// hashes JA3 asociados comúnmente (debes mantener tu lista/IOC)
]);
function rulesScore(f) {
    const hits = [];
    if (f.sni) {
        const sni = f.sni.toLowerCase();
        if (STRATUM_INDICATORS.some(k => sni.includes(k)))
            hits.push("sni_stratum_like");
    }
    if (f.ja3 && JA3_SUS.has(f.ja3))
        hits.push("ja3_suspicious");
    const score = Math.min(1, hits.length * 0.6); // simple
    return { score, hits };
}
