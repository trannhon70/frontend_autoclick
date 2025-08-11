declare module "otp-input-react" {
  import * as React from "react";

  export interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    OTPLength?: number;
    otpType?: "number" | "alpha" | "alphanumeric";
    disabled?: boolean;
    autoFocus?: boolean;
    secure?: boolean;
    inputClassName?: string;
    className?: string;
  }

  const OTPInput: React.FC<OTPInputProps>;
  export default OTPInput;
}
