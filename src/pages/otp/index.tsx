import { Fragment, useState, type FC } from "react";
import OTPInput from "otp-input-react";
const Otp: FC = () => {
    const [otp, setOtp] = useState("");
    return <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-105">
            <div className="p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" className="mx-auto mb-6 w-48 h-48 animate-pulse">
                    <circle cx={200} cy={200} r={150} fill="#3B82F6" />
                    <circle cx={200} cy={200} r={120} fill="#FFFFFF" />
                    <circle cx={200} cy={200} r={90} fill="#3B82F6" />
                    <circle cx={200} cy={200} r={60} fill="#FFFFFF" />
                    <text x={200} y={200} textAnchor="middle" fill="#2563EB" fontSize={40} fontWeight="bold" dy=".3em" className="text-center">OTP</text>
                </svg>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Verify OTP</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Enter the 6-digit code sent to +91 8888888888</p>
                <div className="flex justify-center space-x-4 mb-6">
                    <OTPInput
        value={otp}
        onChange={setOtp}
        OTPLength={6}
        otpType="number"
        inputClassName="otp-input"
        autoFocus
      />

                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Didn't receive code?
                    <a href="#" className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-500">Resend OTP</a>
                </div>
                <a href="https://abhirajk.vercel.app/" >
                    <button className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600
      transition-transform duration-300 hover:scale-105
      dark:bg-blue-600 dark:hover:bg-blue-700">
                        Verify OTP
                    </button>
                </a>
            </div>
        </div>

    </div>
}

export default Otp