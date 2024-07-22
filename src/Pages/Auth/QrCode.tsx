import { QRCode } from "react-qrcode-logo";
import { HiDotsVertical } from "react-icons/hi";
import { GrSettingsOption } from "react-icons/gr";
import HeaderAuth from "../../Components/HeaderAuth";
import BodyAuth from "../../Components/ui/BodyAuth";
import { useState, useEffect } from "react";
import { baseURL, GENERATE } from "../../Api/Api";
import axios from "axios";
import UAParser from "ua-parser-js";
import Pusher from "pusher-js";

const QrCode = () => {
  const [getQrToken, setGetQrToken] = useState("");
  const [browserInfo, setBrowserInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchQrToken = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}${GENERATE}`);
        setGetQrToken(response.data.channel_name);
      } catch (error) {
        console.error("Error fetching QR token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const parser = new UAParser();
    const result = parser.getResult();
    const browserDetails = `${result.browser.name} ${result.browser.version}`;
    setBrowserInfo(browserDetails);

    fetchQrToken();
    const intervalId = setInterval(() => {
      fetchQrToken();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
  localStorage.setItem("getQr", getQrToken);
  console.log(getQrToken);

  const qrValue = `${getQrToken}-${browserInfo}`;

  // Pusher
  useEffect(() => {
    const pusher = new Pusher("4c00b6f46d8e7edd0f0c", {
      authEndpoint:
        "https://cvoxxmpp.dev.itvalues.site/CVOX-WS/broadcasting/auth",
      cluster: "mt1",
      encrypted: true,
    });
    const channel = pusher.subscribe(`${getQrToken}`);
    channel.bind(
      "AuthLoginEvent",
      (data: { token: string; user: { mobile: string } }) => {
        console.log("Received message:", data);
        const token = data.token;
        const mobile = data.user.mobile;
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("token", token); 
        if (token || mobile) {
          window.location.pathname = "/";
        }
      }
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [getQrToken]);

  return (
    <div>
      <HeaderAuth />
      <BodyAuth
        link="/sign-in"
        name="Collega con il numero di telefono"
        center="text-start"
      >
        <div className="flex justify-between items-center border-b-2 border-b-[#e9e7e7] pb-[48px] mb-[48px]">
          <div>
            <h3 className="mb-6 text-[28px] font-semibold text-gray-500">
              Utilizza CvoxChat sul tuo computer
            </h3>

            <div className="text-[18px] mt-4 flex flex-col gap-3 font-semibold text-gray-500">
              <p>1. Apri CvoxApp sul tuo telefono</p>
              <p className="flex items-center gap-2">
                2. Tocca Menu
                <span className="inline-block bg-gray-200 p-1 rounded-md">
                  <HiDotsVertical />
                </span>
                su Android، o Impostazioni
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
              <p>4. Punta il telefono QR</p>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center bg-gray-200 w-[256px] h-[256px]">
              <div className="loader flex justify-center items-center"></div>
            </div>
          ) : (
            qrValue && (
              <div>
                <QRCode
                  value={qrValue}
                  logoImage="public/border.png"
                  logoWidth={60}
                  logoHeight={60}
                  fgColor="#4DA3D9"
                  bgColor="#EEEEEE"
                  size={256}
                  qrStyle="squares"
                  eyeRadius={[
                    { outer: 10, inner: 0 },
                    { outer: 10, inner: 0 },
                    { outer: 10, inner: 0 },
                  ]}
                />
                <p className="text-gray-400 text-[14px] text-center mt-[10px]">
                  QrCode cambia ogni 60 secondi
                </p>
              </div>
            )
          )}
        </div>
      </BodyAuth>
    </div>
  );
};

export default QrCode;
