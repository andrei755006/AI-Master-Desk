import { useMastering } from './hooks/useMastering';
import { Sidebar } from './components/Sidebar';
import { StatusHeader } from './components/StatusHeader';
import { Dropzone } from './components/Dropzone';
import { FileAudio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioSpecs } from './components/AudioSpecs';
import { MasteringSettings } from './components/MasteringSettings';

function App() {
    const { file, step, progress, selectFile, runProcess, reset, settings } = useMastering();

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col relative">
                <StatusHeader fileName={file?.name} isProcessing={step === 2} />

                <section className="flex-1 flex flex-col items-center justify-center p-12">
                    <AnimatePresence mode="wait">

                        {step === 0 && (
                            <Dropzone onFileSelect={selectFile} key="drop" />
                        )}

                        {step === 1 && (
                            <div className="flex flex-col items-center gap-8 w-full">
                                <AudioSpecs file={file} />
                                <MasteringSettings
                                    key="settings"
                                    settings={settings}
                                    onStart={runProcess}
                                />
                            </div>
                        )}

                        {(step === 2 || step === 3) && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-xl text-center"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-10 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    />
                                    <FileAudio className="text-blue-500 w-10 h-10" />
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-8 italic tracking-tight">
                                    {step === 2 ? 'AI Mastering in progress...' : 'Mastering Complete!'}
                                </h2>

                                <div className="w-full bg-slate-900/50 h-1.5 rounded-full overflow-hidden border border-slate-800">
                                    <motion.div
                                        className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                <p className="mt-4 text-slate-500 font-mono text-[10px] tracking-[0.2em]">
                                    {step === 2 ? `${progress}% ANALYZED` : 'PROCESS FINISHED'}
                                </p>

                                {step === 3 && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={reset}
                                        className="mt-12 bg-white text-black px-10 py-3 rounded-full font-bold hover:bg-blue-50 transition-all active:scale-95"
                                    >
                                        Start New Track
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />
            </main>
        </div>
    );
}

export default App;