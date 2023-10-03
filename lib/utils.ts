import { type ClassValue, clsx } from "clsx"
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { twMerge } from "tailwind-merge"
import { Action } from "~/types";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function download(action: any) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = action.url;
  a.download = action.output;

  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(action.url);
  document.body.removeChild(a);
};

export function getFileExtension(fileName: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }

  return '';
};

export function removeFileExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex !== -1) {
    return fileName.slice(0, dotIndex);
  }

  return fileName;
}

export async function convertFile(
  ffmpeg: FFmpeg,
  action: Action
): Promise<any> {
  const { file, to, file_name, file_type } = action;
  const input = getFileExtension(file_name);
  const output = removeFileExtension(file_name) + '.' + to;
  ffmpeg.writeFile(input, await fetchFile(file));

  let ffmpeg_cmd: any = [];
  // 3gp video
  if (to === '3gp')
    ffmpeg_cmd = [
      '-i',
      input,
      '-r',
      '20',
      '-s',
      '352x288',
      '-vb',
      '400k',
      '-acodec',
      'aac',
      '-strict',
      'experimental',
      '-ac',
      '1',
      '-ar',
      '8000',
      '-ab',
      '24k',
      output,
    ];
  else ffmpeg_cmd = ['-i', input, output];

  await ffmpeg.exec(ffmpeg_cmd);

  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: file_type.split('/')[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
};

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal'
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSize = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Bytes';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSize[i] ?? 'Bytes' : sizes[i] ?? 'Bytes'
  }`
};

export async function loadFfmpeg(): Promise<FFmpeg> {
  const ffmpeg = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  return ffmpeg;
}

export const extensions = {
  image: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'ico',
    'tif',
    'tiff',
    'svg',
    'raw',
    'tga',
  ],
  video: [
    'mp4',
    'm4v',
    'mp4v',
    '3gp',
    '3g2',
    'avi',
    'mov',
    'wmv',
    'mkv',
    'flv',
    'ogv',
    'webm',
    'h264',
    '264',
    'hevc',
    '265',
  ],
  audio: ['mp3', 'wav', 'ogg', 'aac', 'wma', 'flac', 'm4a'],
};