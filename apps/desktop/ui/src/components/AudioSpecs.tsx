import type { MasteringFile } from '../types/mastering';

interface Props {
    file: MasteringFile | null;
}

export const AudioSpecs = ({ file }: Props) => {
    // Убираем 'if (!file) return null', чтобы компонент всегда что-то рисовал
    const displayFormat = file?.format || 'WAV';
    const displayRes = file?.bitDepth ? `${file.bitDepth} BIT` : '24 BIT';
    const displayRate = file?.sampleRate ? `${file.sampleRate / 1000} kHz` : '44.1 kHz';

    return (
        <div className="flex items-center gap-6 px-6 py-3 bg-slate-900/60 rounded-2xl border border-slate-800/50 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Format</span>
                <span className="text-sm text-blue-400 font-mono font-medium">{displayFormat}</span>
            </div>

            <div className="w-[1px] h-8 bg-slate-800" />

            <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Resolution</span>
                <span className="text-sm text-slate-200 font-mono font-medium">{displayRes}</span>
            </div>

            <div className="w-[1px] h-8 bg-slate-800" />

            <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Sample Rate</span>
                <span className="text-sm text-slate-200 font-mono font-medium">{displayRate}</span>
            </div>
        </div>
    );
};