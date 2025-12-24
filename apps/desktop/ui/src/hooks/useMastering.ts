import { useState } from 'react';
import type { MasteringFile } from '../types/mastering';

export const useMastering = () => {
    const [file, setFile] = useState<MasteringFile | null>(null);
    const [step, setStep] = useState<number>(0); // 0: idle, 1: processing, 2: done
    const [progress, setProgress] = useState(0);

    const startMastering = (selectedFile: MasteringFile) => {
        setFile(selectedFile);
        setStep(1);
        setProgress(0);

        // Имитация процесса (потом заменим на реальный запрос к Node.js)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStep(2);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    const reset = () => {
        setFile(null);
        setStep(0);
        setProgress(0);
    };

    return { file, step, progress, startMastering, reset };
};

