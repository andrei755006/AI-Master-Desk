import React from 'react';
import { motion } from 'framer-motion';
// Added 'type' keyword to fix TS1484
import type { MasteringSettingsProps } from '../types/mastering';

export const MasteringSettings: React.FC<MasteringSettingsProps> = ({ settings, onStart }) => {
    const formats = ['WAV', 'AIFF'];
    const rates = ['44100', '48000', '96000'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md"
        >
            <h3 className="text-sm font-mono text-blue-400 mb-6 tracking-widest uppercase italic">
                Output Configuration
            </h3>

            <div className="space-y-6">
                {/* Format Selection Section */}
                <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 block">Format</label>
                    <div className="flex gap-2">
                        {formats.map(f => (
                            <button
                                key={f}
                                onClick={() => settings.setTargetFormat(f)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                                    settings.targetFormat === f
                                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sample Rate Selection Section */}
                <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 block">Sample Rate</label>
                    <div className="flex gap-2">
                        {rates.map(r => (
                            <button
                                key={r}
                                onClick={() => settings.setTargetSampleRate(r)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                                    settings.targetSampleRate === r
                                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                            >
                                {r === '44100' ? '44.1k' : r === '48000' ? '48k' : '96k'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Button to trigger the Rust backend process */}
                <button
                    onClick={onStart}
                    className="w-full bg-white text-black py-4 rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-blue-400 transition-colors mt-4 active:scale-95"
                >
                    Start Mastering Process
                </button>
            </div>
        </motion.div>
    );
};