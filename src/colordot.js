import React, { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useOnClickOutside } from "./hooks";
const ColorDot = ({ value, onChange }) => {
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setPickerIsOpen(false));

  return (
    <div className="inline-block py-0.5 px-1.5 m-1">
      <div
        color={value}
        onClick={() => setPickerIsOpen(!pickerIsOpen)}
        className="py-4 px-5 inline-block"
        style={{ background: value }}
      />
      {pickerIsOpen && (
        <div ref={ref}>
          <ChromePicker
            className="absolute"
            color={value}
            onChange={(v) => onChange(v.hex)}
            disableAlpha
          />
        </div>
      )}
    </div>
  );
};

export default ColorDot;
