'use client';

import { 
  useState, 
  useEffect, 
  useRef 
} from 'react';

import ReactDropzone from 'react-dropzone';
import { toast } from 'sonner';

import {
  convertFile,
  download,
  extensions,
  formatBytes,
  loadFfmpeg,
} from '~/lib/utils';

import { Icons } from './icons';

import { Skeleton } from '~/components/ui/skeleton';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '~/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from '~/components/ui/badge';
import { Button } from './ui/button';
import type { Action } from '~/types';
import { FFmpeg } from '@ffmpeg/ffmpeg';

export default function FileUpload() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);

  const acceptedFiles = {
    'image/*': [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.webp',
      '.ico',
      '.tif',
      '.tiff',
      '.raw',
      '.tga',
    ],
    'audio/*': [],
    'video/*': [],
  };

  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };
  const downloadAll = (): void => {
    for (let action of actions) {
      !action.is_error && download(action);
    }
  };
  
  const convert = async (): Promise<any> => {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);
    for (let action of tmp_actions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt,
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt,
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };
  const handleUpload = (data: Array<any>): void => {
    handleExitHover();
    setFiles(data);
    const tmp: Action[] = [];
    data.forEach((file: any) => {
      const formData = new FormData();
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });
    setActions(tmp);
  };

  const handleHover = () => setIsHover(true);
  const handleExitHover = () => setIsHover(false);
  const updateAction = (file_name: String, to: String) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          console.log('FOUND');
          return {
            ...action,
            to,
          };
        }

        return action;
      }),
    );
  };

  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };

  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsLoaded(true);
  };

  if (actions.length) {
    return (
      <div className="space-y-6">
        {actions.map((action: Action, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!isLoaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1 w-96">
                <span className="text-gray-400 text-sm">
                  ({formatBytes(action.file_size)})
                </span>
              </div>
            </div>

            {action.is_error ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Error Converting File</span>
                <Icons.fileWarn className='w-4 h-4' />
              </Badge>
            ) : action.is_converted ? (
              <Badge variant="default" className="flex gap-2">
                <span>Done</span>
                <Icons.check className='w-4 h-4' />
              </Badge>
            ) : action.is_converting ? (
              <Badge variant="default" className="flex gap-2">
                <span>Converting</span>
                <span className="animate-spin">
                  <Icons.loader className='animate-spin w-8 h-8' />
                </span>
              </Badge>
            ) : (
              <div className="text-gray-400 text-md flex items-center gap-4">
                <span>Convert to</span>
                <Select
                  onValueChange={(value) =>
                    updateAction(action.file_name, value)
                  }
                >
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 text-md font-medium">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.file_type.includes('image') && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                    {action.file_type.includes('video') && (
                      <Tabs defaultValue="video" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            Video
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            Audio
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                    {action.file_type.includes('audio') && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action.is_converted ? (
              <Button variant="outline" onClick={() => download(action)}>
                Download
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
              >
                <Icons.close className='w-5 h-5' />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="space-y-4 w-fit">
              <Button
                size="lg"
                className="rounded font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {actions.length > 1 ? 'Download All' : 'Download'}
              </Button>
              <Button
                size="lg"
                onClick={reset}
                variant="outline"
                className="rounded"
              >
                Convert Another Files
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!is_ready || is_converting}
              className="rounded font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {is_converting ? (
                <span className="animate-spin text-lg">
                  <Icons.loader className='w-6 h-6' />
                </span>
              ) : (
                <span>Convert</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={acceptedFiles}
      onDropRejected={() => {
        handleExitHover();
        toast('Allowed files: videos, images, audi');
      }}
      onError={() => {
        handleExitHover();
        toast('Something went wrong, please try again!');
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className=" bg-gray-50 dark:bg-zinc-800 h-72 lg:h-80 xl:h-96 rounded-md shadow-sm border-2 cursor-pointer w-[90vw] mx-auto max-w-6xl flex items-center justify-center focus-visible:outline-transparent"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-gray-500">
            {isHover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <Icons.fileSymlink className='w-6 h-6' />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, right there
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <Icons.uploadCloud className='w-6 h-6' />
                </div>
                <h3 className="text-center font-semibold text-2xl">
                  Click, or drop your files here
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
}