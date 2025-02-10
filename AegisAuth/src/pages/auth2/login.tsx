import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");

    // Kullanıcı zaten giriş yaptıysa dashboard'a yönlendir
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      router.push("/dashboard");
    }
  }, [router]);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      if (response.status === 200) {
        localStorage.setItem("username", email); 
        setSuccessMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Hata detayları:", error);
      if (error.response) {
        const errorData = error.response.data;
        setErrorMessage(errorData.error || errorData.message || "Bilinmeyen bir hata oluştu.");
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
          Login to Your Account
        </h2>
        {successMessage && <div className="text-green-500 text-center mt-2">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/auth2/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
