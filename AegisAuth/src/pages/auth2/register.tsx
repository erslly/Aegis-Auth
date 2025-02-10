import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";  
import zxcvbn from "zxcvbn";

const Register = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    const result = zxcvbn(password);
    setPasswordStrength(result.score); 
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const passwordMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Şifreler eşleşmiyor.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', { username, email, password });

      if (response.status === 201) {
        setSuccessMessage("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        setTimeout(() => {
          router.push("http://localhost:3000/auth2/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Hata detayları:", error);
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.error) {
          setErrorMessage(errorData.error);
        } else if (errorData.message) {
          setErrorMessage(errorData.message);
        } else {
          setErrorMessage("Bilinmeyen bir hata oluştu.");
        }
      } else if (error.request) {
        setErrorMessage("Sunucuya bağlanırken bir sorun oluştu.");
      } else {
        setErrorMessage("Bir hata oluştu: " + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-300">
      <div onClick={toggleTheme} className="absolute top-4 right-4 cursor-pointer">
        {darkMode ? (
          <SunIcon className="w-7 h-7 text-yellow-500" />
        ) : (
          <MoonIcon className="w-7 h-7 text-gray-800" />
        )}
      </div>
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Create Your Account
        </h2>
        {successMessage && (
          <div className="text-green-500 text-center mt-2">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <div className="w-full h-2 mt-2 bg-gray-200 dark:bg-gray-800 rounded-full">
            <div
              className={`h-full rounded-full ${passwordStrength === 0 ? 'bg-red-600' : passwordStrength === 1 ? 'bg-yellow-400' : passwordStrength === 2 ? 'bg-blue-400' : 'bg-blue-600'}`}
              style={{ width: `${(passwordStrength + 1) * 25}%` }}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            {password && confirmPassword && (
              <div className="absolute right-3 top-3">
                {passwordMatch ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500" />
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/auth2/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
