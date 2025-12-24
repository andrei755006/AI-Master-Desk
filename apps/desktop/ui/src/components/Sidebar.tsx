import { Activity, Settings2 } from 'lucide-react';

const presets = [
    { id: 'pro', name: 'Mastering Pro', desc: 'Balanced & Crystal Clear' },
    { id: 'tape', name: 'Warm Tape', desc: 'Analog saturation' },
    { id: 'radio', name: 'Radio Ready', desc: 'Maximum loudness' },
    { id: 'vinyl', name: 'Vinyl Vibe', desc: 'Lo-fi & Character' },
];

export const Sidebar = () => {
    return (
        <aside className="w-72 bg-[#0f172a]/50 border-r border-slate-800/50 p-6 flex flex-col shrink-0">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
                    <Activity size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white italic">AI MASTER</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
                    Mastering Presets
                </p>
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-800/50 transition-all group border border-transparent hover:border-slate-700"
                    >
                        <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                            {preset.name}
                        </div>
                        <div className="text-xs text-slate-500">{preset.desc}</div>
                    </button>
                ))}
            </nav>

            <div className="mt-auto p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Settings2 size={16} />
                    <span>Output: 24-bit WAV</span>
                </div>
            </div>
        </aside>
    );
};