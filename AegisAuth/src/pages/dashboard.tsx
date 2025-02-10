import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");

    // Kullanıcı adını al
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      setTimeout(() => {
        router.replace("/auth2/login");
      }, 500);
    } else {
      setUsername(storedUsername);
    }

    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API Hatası: " + res.statusText); 
        }
        return res.json(); 
      })
      .then((data) => {
        setTotalUsers(data.totalUsers);
        setActiveUsers(data.activeUsers);
      })
      .catch((err) => {
        console.error("API Hatası:", err);
        setError("Veriler yüklenemedi!"); 
      });
  }, [router]);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    router.push("/auth2/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Yönetim Paneli
          </h1>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-400">
              {darkMode ? (
                <SunIcon className="w-6 h-6 text-yellow-500" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Hoş Geldiniz, {username}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Başarıyla giriş yaptınız. Yönetim panelinizi kullanabilirsiniz.
          </p>

          {error ? (
            <p className="text-red-500 mt-4">{error}</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold">Toplam Kullanıcı</h3>
                <p className="text-3xl mt-2">{totalUsers !== null ? totalUsers : "Yükleniyor..."}</p>
              </div>
              <div className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold">Aktif Kullanıcılar</h3>
                <p className="text-3xl mt-2">{activeUsers !== null ? activeUsers : "Yükleniyor..."}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
