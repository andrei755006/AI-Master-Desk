/**
 * Represents the audio file metadata
 */
export interface MasteringFile {
    name: string;
    path: string;
    lastModified?: number;
    size?: number;
    bitDepth?: number;
    sampleRate?: number;
    format?: string;
}

/**
 * Shared settings state structure
 */
export interface MasteringSettingsState {
    targetSampleRate: string;
    setTargetSampleRate: (val: string) => void;
    targetFormat: string;
    setTargetFormat: (val: string) => void;
    targetBitDepth: string;
    setTargetBitDepth: (val: string) => void;
}

/**
 * Props for the MasteringSettings component
 */
export interface MasteringSettingsProps {
    settings: MasteringSettingsState;
    onStart: () => void;
}