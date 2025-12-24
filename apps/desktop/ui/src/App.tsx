import { useMastering } from './hooks/useMastering';
import { Sidebar } from './components/Sidebar';
import { StatusHeader } from './components/StatusHeader';
import { Dropzone } from './components/Dropzone';
import { FileAudio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioSpecs } from './components/AudioSpecs';

function App() {
    const { file, step, progress, startMastering, reset } = useMastering();

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">

            <Sidebar />

            <main className="flex-1 flex flex-col relative">

                <StatusHeader fileName={file?.name} isProcessing={step === 1} />

                <div className="mb-12 flex flex-col items-center">
                    <AudioSpecs file={file} />
                </div>

                <section className="flex-1 flex flex-col items-center justify-center p-12">
                    <AnimatePresence mode="wait">

                        {step === 0 ? (
                            <Dropzone onFileSelect={startMastering} key="drop" />
                        ) : (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-xl text-center"
                            >
                                {/* Секция с круговым лоадером и иконкой */}
                                <div className="relative w-24 h-24 mx-auto mb-10 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    />
                                    <FileAudio className="text-blue-500 w-10 h-10" />
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-8 italic tracking-tight">
                                    {step === 1 ? 'AI Mastering in progress...' : 'Mastering Complete!'}
                                </h2>

                                {/* Прогресс бар */}
                                <div className="w-full bg-slate-900/50 h-1.5 rounded-full overflow-hidden border border-slate-800">
                                    <motion.div
                                        className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>

                                <p className="mt-4 text-slate-500 font-mono text-[10px] tracking-[0.2em]">{progress}% ANALYZED</p>

                                {step === 2 && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={reset}
                                        className="mt-12 bg-white text-black px-10 py-3 rounded-full font-bold hover:bg-blue-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all active:scale-95"
                                    >
                                        Start New Track
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                    </AnimatePresence>
                </section>

                {/* Фоновое свечение для красоты */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />
            </main>
        </div>
    );
}

export default App;