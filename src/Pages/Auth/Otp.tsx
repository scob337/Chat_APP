/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { IForm } from "../../interfaces";
import { optInput } from "../../Data";
import Input from "../../Components/ui/Input";
import axios from "axios";
import { OTP, baseURL } from "../../Api/Api";
import Button from "../../Components/ui/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BodyAuth from "../../Components/ui/BodyAuth";
import HeaderAuth from "../../Components/HeaderAuth";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { GrSettingsOption } from "react-icons/gr";
const Otp = () => {
  const MySwal = withReactContent(Swal);
  // ---------------State-------------------
  const [form, setForm] = useState<IForm>({
    otp: "",
    mobile_number: "",
    fcm_token: "",
  });

  // ---------------Handler ----------------
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}${OTP}`, form);
      const token = res.data.token;
      const mobile = res.data.user.mobile;
      localStorage.setItem("mobile", mobile);
      localStorage.setItem("token", token);
      await MySwal.fire({
        title: `${res.data.message}`,
      });

      window.location.pathname = "/";
    } catch (err: any) {
      if (err.response?.data?.status === "422") {
        MySwal.fire({
          title: `${err.response?.data?.message[0]}`,
        });
      } else {
        MySwal.fire({
          title: `The OTP field is required.`,
        });
      }
    }
  };
  const mobileNumber = localStorage.getItem("mobileNumber");
  // -------- Render ---------
  const renderInputs = optInput.map((input) => {
    return (
      <div key={input.name}>
        <Input
          id={input.name}
          border="focus:border-primary"
          name={input.name}
          value={form[input.name]}
          type={input.type}
          placeholder={input.label}
          onChange={changeHandler}
        />
      </div>
    );
  });
  return (
    <>
      <HeaderAuth />
      <BodyAuth
        link="/qr-code"
        name="Collega con il codice QR"
        center="text-start"
      >
        <div className="flex gap-5 items-center justify-between border-b-2 border-b-[#e9e7e7] pb-[48px] mb-[48px]">
          <div>
            <h1 className="text-[26px] font-medium text-gray-500">
              Inserisci il codice sul telefono
            </h1>
            <span className="font-medium text-gray-500">
              Collega l'account CvoxApp
              <strong className="text-gray-600 mr-2 ml-1">
                {mobileNumber}
              </strong>
              <Link to="/sign-in" className="text-primary">
                (modificare)
              </Link>
            </span>

            <div className="text-[18px] mt-4 flex flex-col gap-3 font-semibold text-gray-500">
              <p>1. Apri CvoxApp sul tuo telefono</p>
              <p className="flex items-center gap-2">
                2. Tocca Menu
                <span className="inline-block bg-gray-200 p-1 rounded-md">
                  <HiDotsVertical />
                </span>
                su Android, o Impostazioni
                <span className="inline-block bg-gray-200 p-1 rounded-md">
                  <GrSettingsOption />
                </span>
                su iPhone
              </p>
              <p>
                3. Tocca
                <span className="font-bold text-gray-600">
                  Dispositivi collegati
                </span>
                e poi
                <span className="font-bold text-gray-600">
                  Dispositivi collegati
                </span>
              </p>
              <p>
                4. Tocca "Collega con numero di telefono" invece e <br />{" "}
                inserisci questo codice sul tuo telefono
              </p>
            </div>
          </div>
          <div className="w-[30%] mx-auto">
            <form
              className="space-y-5 flex flex-col justify-center items-center"
              onSubmit={submitHandler}
            >
              {renderInputs}
              <Button
                type="submit"
                className="BtnColor py-2 text-white transition-all duration-300 ease-in-out px-4"
                width="w-fit"
              >
                Conferma
              </Button>
            </form>
          </div>
        </div>
      </BodyAuth>
    </>
  );
};

export default Otp;
