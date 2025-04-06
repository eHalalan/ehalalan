import { H2 } from '@/components/ui/headings';
import { Hero } from '@/components/landing-page/Hero';

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <Hero />

      <div className="flex flex-col justify-center items-center gap-4">
        <H2 className="!text-3xl text-center motion-preset-slide-up motion-duration-1000">
          What is eHalalan?
        </H2>

        <p className="text-center motion-preset-slide-up motion-delay-100 motion-duration-1000">
          eHalalan is a decentralized election system using blockchain.
        </p>

        <video
          width="600"
          className="rounded-lg motion-preset-slide-up motion-delay-200 motion-duration-1000"
          autoPlay
          muted
          playsInline
        >
          <source src="/video/app-logo-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-full md:w-1/2 border rounded-xl p-6 mt-16 mb-8 flex flex-col gap-1 motion-preset-slide-up motion-duration-1000">
        <H2 className="!text-3xl">Ready to get started?</H2>
        <span>Register today and start voting online.</span>
      </div>
    </div>
  );
}
