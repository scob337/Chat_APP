/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, useEffect, useRef } from "react";
import Button from "../../Components/ui/Button";
import { baseURL, LOGIN } from "../../Api/Api";
import axios from "axios";
import Input from "../../Components/ui/Input";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HeaderAuth from "../../Components/HeaderAuth";
import BodyAuth from "../../Components/ui/BodyAuth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import lottie from "lottie-web";
import AnimationChat from "../../Lottie/AnimationChat.json";
const SignIn = () => {
  const MySwal = withReactContent(Swal);
  // ---------------State-------------------
  const [phone, setPhone] = useState("+39");

  const [country, setCountry] = useState("Italy");
  const [mobileNumber, setMobileNumber] = useState(phone);

  // -----------Ref-----------
   const container = useRef(null);
useEffect(() => {
  lottie.loadAnimation({
    container: container.current!,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: AnimationChat,
  });
}, []);
  // ----- Navigate ----------
  const navigate = useNavigate();

  // ---------------Handler ----------------
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}${LOGIN}`, {
        mobile_number: mobileNumber,
      });
      await MySwal.fire({
        title: res.data.message,
      });

      navigate("/otp");
    } catch (err: any) {
      MySwal.fire({
        title: `${err.response?.data?.message}`,
      });
    }
  };
  const handlePhoneChange = (phone: string, data: any) => {
    setPhone(phone);
    setMobileNumber(`+${data.dialCode}`);
    const countrys = data.name;
    setCountry(countrys);
  };
  useEffect(() => {
    localStorage.setItem("mobileNumber", mobileNumber);
  }, [mobileNumber]);
  return (
    <>
      <HeaderAuth />

      <BodyAuth
        link="/qr-code"
        name="Collega con il codice QR"
        center="text-center"
      >
        <div>
          <div className="flex flex-col gap-5 items-center justify-center border-b-2 border-b-[#e9e7e7] pb-[48px] mb-[48px]">
            <div className="text-center">
              <h1 className="text-[26px] font-medium text-gray-500">
                Inserisci il numero di telefono
              </h1>
              <p className="font-medium text-gray-500">
                Seleziona un Paese e inserisci il tuo numero di telefono CvoxApp
              </p>
            </div>
            <div className="w-[30%] mx-auto">
              <form
                className="space-y-5 flex flex-col justify-center items-center"
                onSubmit={submitHandler}
              >
                <div className="relative">
                  <span className="absolute top-[45%] left-[35%] translate-y-[-50%] z-10 text-[18px] text-gray-600">
                    {" "}
                    | {country}
                  </span>
                  <PhoneInput
                    country={""}
                    enableSearch={true}
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={false}
                  />
                </div>
                <Input
                  value={mobileNumber}
                  type="text"
                  border="focus:border-primary"
                  placeholder="Enter Mobile"
                  onChange={(e) => setMobileNumber(e.target.value)}
                />

                <Button
                  type="submit"
                  className="BtnColor py-2 text-white transition-all duration-300 ease-in-out px-8 rounded-3xl
          "
                  width="w-fit"
                >
                  Avanti
                </Button>
              </form>
            </div>
          </div>
        </div>
      </BodyAuth>
    </>
  );
};

export default SignIn;
