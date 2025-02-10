// src/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user"); 

    if (isLoggedIn) {
      router.push("/dashboard"); 
    } else {
      router.push("/auth2/login");
    }
  }, [router]);

};

export default HomePage;
