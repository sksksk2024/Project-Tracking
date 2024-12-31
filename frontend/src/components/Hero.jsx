import devices from './../images/illustration-devices.svg';

function Hero() {
  return (
    <main className="mt-108M lg:mt-0 font-barlow flex gap-16 flex-col-reverse lg:flex-row justify-center lg:justify-start items-center w-[100vw] h-[50vh] sm:h-[50vh] lg:h-[60vh] relative">
      <div className="flex flex-col gap-4 max-w-screen mx-auto w-full lg:block lg:max-w-800MW xl:max-w-[100vw] uppercase pr-48P md:pr-0">
        <div className="flex gap-4 items-center">
          <span className="font-semibold text-xs text-white px-16P py-8P bg-very-dark-blue rounded-40BR tracking-wide">
            New
          </span>
          <p className="font-barlow-condensed text-grayish-blue tracking-0.2">
            Monograph Dashboard
          </p>
        </div>
        <h1 className="font-barlow-condensed font-bold text-2xl lg:text-4xl lg:my-32M text-very-dark-blue leading-9 lg:leading-2xs-tight">
          Powerful insights into your team
        </h1>
        <p className="font-normal text-dark-grayish-blue lg:my-32M normal-case">
          Project planning and time tracking for agile teams
        </p>
        <div className="font-barlow-condensed flex gap-4 items-center uppercase">
          <button className="btn text-white bg-red hover:bg-light-red duration-200 border-none tracking-wider uppercase">
            Schedule a demo
          </button>

          <p className="font-barlow-condensed text-grayish-blue tracking-0.2">
            to see a live preview
          </p>
        </div>
      </div>
      <img
        src={devices}
        className="z-0 w-full max-w-600MW relative translate-x-[20vw] lg:translate-x-[0px] lg:max-w-600MW xl:max-w-800MW"
        alt="devices"
      />
    </main>
  );
}

export default Hero;
