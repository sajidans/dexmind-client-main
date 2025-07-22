import '../../styles/PageLoader.css';

const PageLoader = () => {
  return (
    <>
      <div className="loader-wrapper">
        {/* From Uiverse.io by SelfMadeSystem */}
        <div className="loader">
          <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
            <defs xmlns="http://www.w3.org/2000/svg">
              <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="b">
                <stop stopColor="#973BED"></stop>
                <stop stopColor="#007CFF" offset="1"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2="0" x2="0" y1="64" x1="0" id="c">
                <stop stopColor="#FFC800"></stop>
                <stop stopColor="#F0F" offset="1"></stop>
                <animateTransform
                  repeatCount="indefinite"
                  keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                  keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                  dur="8s"
                  values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                  type="rotate"
                  attributeName="gradientTransform"
                ></animateTransform>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="d">
                <stop stopColor="#00E0ED"></stop>
                <stop stopColor="#00DA72" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#b)"
              d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813..."
              className="dash"
              id="y"
              pathLength="360"
            ></path>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ "--rotation-duration": "0ms", "--rotation-direction": "normal" }} viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="10"
              stroke="url(#c)"
              d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54"
              className="spin"
              id="o"
              pathLength="360"
            ></path>
          </svg>

          <div className="w-2"></div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ "--rotation-duration": "0ms", "--rotation-direction": "normal" }} viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#d)"
              d="M 4,4 h 4.6230469 v 25.919922..."
              className="dash"
              id="u"
              pathLength="360"
            ></path>
          </svg>
        </div>

        <div className="loader-text">ZENTOR</div>
      </div>
    </>
  );
};

export default PageLoader;
