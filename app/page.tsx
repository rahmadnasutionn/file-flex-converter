import FileUpload from '~/components/file-upload';
import { Icon, Icons } from '~/components/icons';

export interface Features {
  icon: Icon;
  title: string;
  content: string;
}

export default function Home() {

  const features: Features[] = [
    {
      icon: Icons.setting,
      title: 'High-Quality Results',
      content:
        'High Quality result'
    },
    {
      icon: Icons.file,
      title: 'Free',
      content:
        'Supports more than 1500 file conversions, You can conver videos, files, audio, images'
    },
    {
      icon: Icons.shield,
      title: 'Secure',
      content:
        'We delete uploaded files directly after conversion and conversion results are deleted after 24 hours'
    },
  ];

  return (
    <main className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col items-center gap-4 text-center max-w-[64rem]">
        <h1 title='Back to Home' className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Free File Converter
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Easily convert files from one format to another format many many times, online
        </p>
      </div>

      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
        </div>
        <div className="mx-auto relative grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>
          {features.map(({ title, content, icon: Icon }, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex min-h-[180px] flex-col justify-start rounded-md p-6">
                <Icon className="h-8 w-8 mb-3" />
                <div className="space-y-2">
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm">{content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-20">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Start Converting Now
          </h2>
        </div>

        <FileUpload />
      </section>
    </main>
  );
};
