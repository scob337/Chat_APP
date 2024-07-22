import { JitsiMeeting } from "@jitsi/react-sdk";
import { useRef } from "react";
interface ExternalApi {
  executeCommand: (command: string, args: string[]) => void;
}
const Meet = () => {
  // ------------Ref----------
  const externalApiRef = useRef<ExternalApi | null>(null);

  // --------- Jitsi ------------
  const roomName = "CvoxRoomNameMeeting";
  const domain = "meet.jit.si";
  const configOverwrite = {
    requireDisplayName: false,
    startWithAudioMuted: true,
    startWithVideoMuted: true,
    disableThirdPartyRequests: true,
    disableDeepLinking: true,
    prejoinPageEnabled: false,
    enableWelcomePage: false,
    enableClosePage: false,
    enableInsecureRoomNameWarning: true,
    enableNoisyMicDetection: true,
    resolution: 720,
  };


  const handleApiReady = (externalApi: ExternalApi) => {
    externalApiRef.current = externalApi as ExternalApi;
    if (externalApiRef.current) {
      (externalApiRef.current as ExternalApi).executeCommand("mute", ["audio"]);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        flex: 1,
        display: "grid",
        flexDirection: "column",
      }}
    >
      <JitsiMeeting
        roomName={roomName}
        domain={domain}
        configOverwrite={configOverwrite}
        displayName={"rajnikant"}
        containerStyles={{ display: "flex", flex: "auto" }}
        onApiReady={handleApiReady}
      />
    </div>
  );
};
export default Meet;
