import React from "react";

const InputError = ({ errors }: { errors: string[] }) => {
  return (
    <ul>
      {errors.map((error, i) => (
        <li key={i}>
          <p className="text-xs text-red-500">{error}</p>
        </li>
      ))}
    </ul>
  );
};

export default InputError;
