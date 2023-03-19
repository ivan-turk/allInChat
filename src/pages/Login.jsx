import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext"; //zna koji context mora koristiti
import heroImage from "../media/hero.jpg";

const Login = () => {
  const navigate = useNavigate(); //kreiranje hook-a za navigaciju
  const { currentUser, signinWithGoogle } = UserAuth(); //koristimo propove iz "value" iz contexta

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser]); //renderiraj samo kad se promjeni state

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">All-In ↗ Chat</h1>
          <p className="mb-5">
            Dobrodošli na All-In instant chat.. Jedan klik, jedna soba, puno
            ljudi, uživajte 😎
          </p>
          <button onClick={handleLogin} className="btn btn-outline">
            Login with Google
          </button>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
        <div>
          <p>Copyright © 2023 - Created by Ivan Turk for Algebra purposes</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
