import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ColorDot from "./colordot";
import { ToastContainer, toast } from "react-toastify";
import Toggle from "./utils/toggle";
import colors from "nice-color-palettes";
import { exampleNames } from "./example-names";
import { Avatar } from "y-avatars";
import { CopyToClipboard } from "react-copy-to-clipboard";
import loader from "./loader.gif";
const paletteColors = colors;
const AvatarWrapper = ({ name, playgroundColors, size, variant, radius }) => {
  const [avatarName, setAvatarName] = useState(name);
  const handleFocus = (event) => event.target.select();
  const ref = useRef();
  const [copyValue, setCopyValue] = useState(name);
  const copied = () =>
    toast.success("Copied", {
      className: "shadow-none bg-green-600 dark:bg-indigo-900",
    });

  useEffect(() => {
    if (ref.current) {
      const svgNode = ref.current.innerHTML;
      const svgStart = svgNode.indexOf("<svg");
      const svgEnd = svgNode.indexOf("</svg>") + 6;
      const svgResult = svgNode.substring(svgStart, svgEnd).toString();
      setCopyValue(svgResult);
    }
  }, [copyValue, variant, playgroundColors]);

  return (
    <>
      <div>
        <div
          className="Avatar flex align-middle justify-center py-3 px-1"
          ref={ref}
        >
          <Avatar
            name={avatarName}
            colors={playgroundColors}
            size={size}
            variant={variants[variant]}
            radius={radius}
          />
        </div>
        <input
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
          className="rounded-full py-1.5 text-sm hover:border-yellow-200 dark:hover:border-yellow-500 dark:focus:border-yellow-400 focus:border-yellow-400 px-1 text-center border-2 dark:border-gray-600 border-gray-200 bg-transparent"
          onFocus={(e) => handleFocus(e)}
        />
        <div className="flex justify-center">
          <CopyToClipboard text={copyValue} onCopy={copied}>
            <button className="w-9/12 rounded-full py-1.5 my-3 text-sm  bg-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 dark:hover:border-yellow-400 dark:hover:bg-transparent border-2 border-yellow-400 text-white">
              Copy
            </button>
          </CopyToClipboard>
        </div>
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
      </div>
    </>
  );
};

const getRandomPaletteIndex = () =>
  Math.floor(Math.random() * (paletteColors.length - 0 + 1)) + 0;

const avatarSizes = {
  small: 60,
  medium: 80,
  large: 100,
};

const Button = ({ content, ...props }) => {
  return (
    <button
      {...props}
      className="py-2 px-3 dark:text-white rounded m-1 capitalize  dark:bg-gray-600 bg-gray-200 bg-opacity-70 dark:hover:bg-gray-700 hover:bg-gray-100 "
    >
      {content}
    </button>
  );
};
const variants = {
  frame: "frame",
  ring: "ring",
  sunset: "sunset",
  pixel: "pixel",
  marble: "marble",
  smilly: "smilly",
  triangle: "triangle",
  patterns: "patterns",
  classic: "classic",
};

const Playground = () => {
  const defaultPlaygroundColors = paletteColors[66];
  const [playgroundColors, setPlaygroundColors] = useState(
    defaultPlaygroundColors
  );
  const [dotColor0, setDotColor0] = useState(playgroundColors[0]);
  const [dotColor1, setDotColor1] = useState(playgroundColors[1]);
  const [dotColor2, setDotColor2] = useState(playgroundColors[2]);
  const [dotColor3, setDotColor3] = useState(playgroundColors[3]);
  const [dotColor4, setDotColor4] = useState(playgroundColors[4]);

  const SizeDot = ({ size, isselected, ...props }) => {
    const getSize = () => {
      switch (size) {
        case avatarSizes.large:
          return 20;
        case avatarSizes.medium:
          return 14;
        case avatarSizes.small:
          return 8;
        default:
          return 0;
      }
    };
    return (
      <button
        className={`rounded-full m-0.5 ${
          isselected
            ? "dark:bg-yellow-500 bg-yellow-400"
            : " dark:bg-gray-600 bg-gray-200 bg-opacity-70 dark:hover:bg-gray-700 hover:bg-gray-100 "
        } ${
          getSize() === 8
            ? "w-5 h-5 mt-3"
            : getSize() === 14
            ? "w-7 h-7 mt-2"
            : "w-9 h-9 mt-1"
        }`}
        {...props}
      ></button>
    );
  };

  const filteredColors = [
    dotColor0,
    dotColor1,
    dotColor2,
    dotColor3,
    dotColor4,
  ];

  const handleRandomColors = () => {
    setPlaygroundColors(paletteColors[getRandomPaletteIndex()]);
  };

  const [loading, setLoading] = useState(true);
  const [avatarSize, setAvatarSize] = useState(avatarSizes.medium);
  const [variant, setVariant] = useState(variants.pixel);
  const [borderRadius, setBorderRadius] = useState(50);
  useEffect(() => {
    setDotColor0(playgroundColors[0]);
    setDotColor1(playgroundColors[1]);
    setDotColor2(playgroundColors[2]);
    setDotColor3(playgroundColors[3]);
    setDotColor4(playgroundColors[4]);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [playgroundColors]);
  const Navbutton = ({ variantType, content }) => {
    return (
      <button
        className={`transition-all duration-500 py-2 px-3 dark:text-white rounded m-1  capitalize ${
          variant === variantType
            ? " dark:bg-gray-600 bg-gray-200 bg-opacity-90"
            : " dark:hover:bg-gray-700 hover:bg-gray-100 bg-opacity-70 "
        } `}
        onClick={() => setVariant(variantType)}
      >
        {content}
      </button>
    );
  };
  return (
    <main className="text-black bg-white dark:bg-gray-800 dark:text-white text-sm">
      {loading ? (
        <div className="loader text-white h-screen ">
          <img src={loader} alt={loader} className="m-auto" draggable="false" />
          <p className="text-center -mt-40">
            Y_avatar's Loading<span className="animate-ping text-lg">...</span>
          </p>
        </div>
      ) : (
        <>
          <header className="bg-white dark:bg-gray-900 flex justify-around align-middle h-full">
            <div className="w-12 h-12 p-2 my-2 rounded-full bg-blue-900 relative">
              <div className="w-8 h-8 p-2 rounded-full bg-indigo-600">
                <div className="w-2 h-2 rounded-full bg-yellow-400 absolute bottom-0 right-0"></div>
                <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
              </div>
            </div>
            <div className="p-1 h-full bg-gray-50 bg-opacity-40 dark:bg-gray-800 dark:text-white rounded m-1">
              <Navbutton variantType={variants.pixel} content="pixel" />
              <Navbutton variantType={variants.sunset} content="sunset" />
              <Navbutton variantType={variants.ring} content="ring" />
              <Navbutton variantType={variants.marble} content="marble" />
              <Navbutton variantType={variants.smilly} content="smilly" />
              <Navbutton variantType={variants.frame} content="frame" />
              <Navbutton variantType={variants.triangle} content="triangle" />
              <Navbutton variantType={variants.patterns} content="patterns" />
              <Navbutton variantType={variants.classic} content="classic" />
            </div>
            <div className="p-1 h-full bg-gray-50 bg-opacity-40 dark:bg-gray-800 dark:text-white rounded m-1 flex justify-center align-middle">
              <ColorDot
                value={dotColor0}
                onChange={(color) => setDotColor0(color)}
              />
              <ColorDot
                value={dotColor1}
                onChange={(color) => setDotColor1(color)}
              />
              <ColorDot
                value={dotColor2}
                onChange={(color) => setDotColor2(color)}
              />
              <ColorDot
                value={dotColor3}
                onChange={(color) => setDotColor3(color)}
              />
              <ColorDot
                value={dotColor4}
                onChange={(color) => setDotColor4(color)}
              />
              <div>
                <Button
                  onClick={() => handleRandomColors()}
                  content="Random palette"
                />
              </div>
              <div className=" py-2 px-3  rounded m-1 capitalize  ">
                <input
                  type="range"
                  name="name"
                  className="slider dark:text-white dark:bg-gray-600 bg-gray-200 bg-opacity-70 "
                  min="0"
                  max="50"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  id=""
                />
              </div>
              <Toggle />
              <div className="flex align-middle justify-center">
                {Object.entries(avatarSizes).map(([key, value], index) => (
                  <SizeDot
                    key={index}
                    isselected={value === avatarSize}
                    onClick={() => setAvatarSize(value)}
                    size={value}
                  />
                ))}
              </div>
            </div>
          </header>

          <div className="bg-gray-50 dark:bg-gray-800 flex flex-auto flex-wrap p-5">
            {exampleNames.map((exampleName, name) => (
              <div className="px-2 m-2">
                <AvatarWrapper
                  key={name}
                  size={avatarSize}
                  name={exampleName}
                  playgroundColors={filteredColors}
                  variant={variant}
                  radius={borderRadius}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Playground;
