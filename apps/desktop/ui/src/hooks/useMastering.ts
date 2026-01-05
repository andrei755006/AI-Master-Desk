import { useState } from 'react';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import type { MasteringFile } from '../types/mastering';

export const useMastering = () => {
    const [file, setFile] = useState<MasteringFile | null>(null);
    const [step, setStep] = useState<number>(0);
    const [progress, setProgress] = useState(0);

    const [targetSampleRate, setTargetSampleRate] = useState("44100");
    const [targetFormat, setTargetFormat] = useState("WAV");
    const [targetBitDepth, setTargetBitDepth] = useState("24");

    const selectFile = (selectedFile: MasteringFile) => {
        setFile(selectedFile);
        setStep(1);
    };

    const runProcess = async () => {
        if (!file) return;

        setStep(2);
        setProgress(0);

        // Слушаем прогресс от Rust бэкенда
        const unlisten = await listen<{ progress: number, status: string }>('mastering-progress', (event) => {
            setProgress(event.payload.progress);
        });

        try {
            // Вызываем реальную команду Rust
            await invoke('process_audio', { path: file.path });
            setStep(3);
        } catch (error) {
            console.error("Mastering error:", error);
            setStep(0); // Возвращаем в начало при ошибке
        } finally {
            unlisten(); // Очищаем слушателя
        }
    };

    const reset = () => {
        setFile(null);
        setStep(0);
        setProgress(0);
    };

    return {
        file,
        step,
        progress,
        selectFile,
        runProcess,
        reset,
        settings: {
            targetSampleRate,
            setTargetSampleRate,
            targetFormat,
            setTargetFormat,
            targetBitDepth,
            setTargetBitDepth
        }
    };
};