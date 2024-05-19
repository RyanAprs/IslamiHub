import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../config/hooks/useLogin";
import quranImg from "../../assets/quran.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-main-gradient flex flex-col md:flex-row items-center justify-between p-8 md:px-32 gap-5">
      <div className="font-poppins gap-2 md:gap-14 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="font-bold text-[24px]">IslamHub</div>
        <div className="bg-transparent border-blue-600 border-2 h-screen w-full md:h-auto md:w-[556px] flex flex-col justify-center p-10 rounded-xl shadow-lg gap-10">
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin} className="login flex flex-col gap-2">
            <div>
              <label htmlFor="" className="font-bold">
                Email
              </label>
              <input
                type="email"
                className="border-[1px] border-blue-500 bg-transparent rounded-xl p-4 mb-4 w-full mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="" className="font-bold">
                Password
              </label>
              <input
                type="password"
                className="border-[1px] border-blue-500 bg-transparent rounded-xl p-4 mb-4 w-full mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex md:flex-row flex-col items-center  justify-between">
              <div className="text-black ">
                Belum punya akun?{" "}
                <Link className="text-blue-600" to="/register">
                  Daftar
                </Link>
              </div>
              <Link className="text-blue-600 " to="/reset-password">
                Lupa password?
              </Link>
            </div>
            <div className="flex flex-col md:items-end items-center mt-3">
              <div className="flex items-end">
                <button
                  disabled={isLoading}
                  className="bg-blue-600 text-black font-bold px-4 py-2 w-[192px] h-[60px] rounded-xl hover:bg-blue-700 transition-colors duration-300"
                >
                  Masuk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden justify-center md:flex md:justify-end">
        <img
          className="w-60 h-60 md:w-96 md:h-96"
          src={quranImg}
          alt="IslamHub Logo"
        />
      </div>
    </div>
  );
};

export default Login;
