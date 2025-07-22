/* eslint-disable react/prop-types */

export const Button1 = ({ className, name, dataAos, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`Button1 ss-button2 ${className}`}
    >
      {name}
    </button>
  );
};

export const ButtonGlow = ({ className, name, dataAos, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`ss-glowBTN ButtonGlow ${className}`}
    >
      {name}
    </button>
  );
};

export const Button2 = ({ className, name, dataAos, onClick, disabled, type }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      disabled={disabled}
      className={`Button2 ${className}`}
      type={type}
    >
      {name}
    </button>
  );
};

export const Button5 = ({ className, name, dataAos, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`Button5 ${className}`}
    >
      {name}
    </button>
  );
};

export const Button6 = ({
  name,
  className = "",
  dataAos,
  onClick,
  width = "228px",
  height = "43px",
  radius = "7.48px",
}) => {
  const customStyle = {
    width,
    height,
    borderRadius: radius,
  };

  return (
    <button
      onClick={onClick}
      data-aos={dataAos}
      className={`button5 ${className}`}
      style={customStyle}
    >
      {name}
    </button>
  );
};

export const ToggleButton = ({ className, dataAos, onClick }) => {
  return (
    <div
      data-aos={dataAos}
      onClick={onClick}
      className={`ToggleButton ${className}`}
    >
      <input type="checkbox" />
    </div>
  );
};

// Fixed single valid version of GlowButton
export const GlowButton = ({ text = "Asset History", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative text-[1.5rem] px-6 py-3 text-green-400 font-semibold rounded border border-transparent
      bg-gradient-to-r from-transparent via-green-500/30 to-transparent
      hover:from-green-600/30 hover:to-green-600/30
      hover:text-white
      shadow-md shadow-green-400/20
      transition-all duration-300
      before:absolute before:inset-0 before:rounded before:border before:border-green-400
      before:opacity-50 before:hover:opacity-100 before:transition-all"
    >
      <span className="relative z-10">{text}</span>
    </button>
  );
};
