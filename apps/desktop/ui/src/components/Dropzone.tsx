import { useState, useEffect } from 'react';
import { Upload, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import { open } from '@tauri-apps/plugin-dialog';
import { listen } from '@tauri-apps/api/event';
import type { MasteringFile } from '../types/mastering';

interface Props {
    onFileSelect: (file: MasteringFile) => void;
}

export const Dropzone = ({ onFileSelect }: Props) => {
    const [isDragging, setIsDragging] = useState(false);

    /**
     * Effect to handle native OS drag-and-drop events.
     * In Tauri, native file paths are provided via 'tauri://drag-drop' event.
     */
    useEffect(() => {
        let unlisten: any;

        const setupTauriListener = async () => {
            unlisten = await listen('tauri://drag-drop', (event: any) => {
                // event.payload.paths contains full system paths
                const paths = event.payload.paths as string[];

                if (paths && paths.length > 0) {
                    const filePath = paths[0];
                    const fileName = filePath.split(/[\\/]/).pop() || 'Unknown Track';

                    console.log('File detected via Tauri listener:', filePath);

                    onFileSelect({
                        name: fileName,
                        path: filePath,
                    });
                }
            });
        };

        setupTauriListener();

        // Clean up the listener when component unmounts
        return () => {
            if (unlisten) unlisten();
        };
    }, [onFileSelect]);

    const handlePickFile = async () => {
        try {
            const selected = await open({
                multiple: false,
                filters: [{ name: 'Audio', extensions: ['wav', 'aiff', 'flac'] }]
            });

            if (selected) {
                const path = selected as string;
                const fileName = path.split(/[\\/]/).pop() || 'Unknown';

                onFileSelect({
                    name: fileName,
                    path: path,
                });
            }
        } catch (err) {
            console.error("Native dialog error:", err);
        }
    };

    return (
        <motion.div
            // Keep drag visuals
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                // We handle the actual logic via useEffect (Tauri Listener)
                // because browser dataTransfer lacks the full system path
            }}
            className={`w-full max-w-3xl aspect-video rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center transition-all
        ${isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.01]' : 'border-slate-800 bg-slate-900/20 hover:border-slate-700'}`}
        >
            <Upload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-blue-400' : 'text-slate-600'}`} />
            <h2 className="text-xl font-semibold text-white italic">Drop WAV / AIFF here</h2>
            <p className="text-slate-500 mt-2 mb-8 uppercase font-mono tracking-widest text-xs">Professional AI Mastering</p>

            <button
                onClick={handlePickFile}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-full text-sm font-medium transition-all border border-slate-700 active:scale-95"
            >
                <MousePointerClick size={16} />
                Or Select File
            </button>
        </motion.div>
    );
};