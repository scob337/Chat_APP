import { useEffect } from "react";
import Button from "../Components/ui/Button";

const WelcomePage = () => {
  useEffect(() => {
  }, []);
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-[400px] m-auto text-center   ">
      <div className=" img w-[400px] h-[230px] m-auto">
        <img
          src="/public/Cvox.jpeg"
          alt="welcome-Image"
          className="w-[400px] h-[230px]
        object-cover
        "
        />
      </div>
      <div className="text">
        <h2 className="text-[24px]  text-[#47525D] w-full">
          Scarica cvox per sistemi operativi windows
        </h2>
        <p className="text-[#47525D] text-[16px] font-medium w-[70%] m-auto ">
          Puoi effettuare chiamate, condividere lo schermo e goderti
          un'esperienza più veloce quando scarichi l'app Windows
        </p>
      </div>
      <Button
        type="submit"
        className="bg-[#008069] py-2 rounded-lg text-white
          m-auto
          transition-all
          hover:opacity-80
          w-[40%]
        "
      >
        scaricamento
      </Button>
    </div>
  );
};

export default WelcomePage;
