import CallsContent from "../../../Components/ui/CallsContent";
import SidesComponents from "../../../Components/ui/SidesComponents";
import { PhoneCall } from "../../../Data";

const SideCalls = () => {
  // --------- Render ----------------

  const PhoneCalling = PhoneCall.map((i) => {
    return (
      <CallsContent
        key={i.id}
        name={i.name}
        icons={i.icons}
        time={i.time}
        link={i.link}
      />
    );
  });
  return (
    <SidesComponents>
      <div className="overflow-y-auto">
        <div className="flex items-center w-full gap-1 p-4">
          <p className="font-bold text-[18px]">Chiama il numero</p>
          <span className="text-primary font-medium">(10)</span>
        </div>
        <div className="w-full overflow-y-auto">
          <div className="flex flex-col">{PhoneCalling}</div>
        </div>
      </div>
    </SidesComponents>
  );
};

export default SideCalls;
