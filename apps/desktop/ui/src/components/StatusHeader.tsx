interface Props {
    fileName: string | undefined;
    isProcessing: boolean;
}

export const StatusHeader = ({ fileName, isProcessing }: Props) => {
    return (
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#020617]/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-4">
                <div className={`h-2 w-2 rounded-full ${isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-sm font-medium text-slate-400">
          {fileName ? `Processing: ${fileName}` : 'System Ready'}
        </span>
            </div>

            <div className="flex gap-6">
                <button className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition">History</button>
                <button className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition">Settings</button>
            </div>
        </header>
    );
};