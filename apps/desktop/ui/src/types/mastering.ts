export interface MasteringFile {
    name: string;
    path: string;
    lastModified?: number;
    size?: number;
    bitDepth?: number;   // например, 24
    sampleRate?: number; // например, 44100
    format?: string;     // например, 'WAV'
}