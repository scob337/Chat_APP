const WelcomePage = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-[28px] text-[24px] font-bold">
      <div className="w-[400px] h-[400px] rounded-2xl overflow-hidden">
        <img
          src="/public/Cvox.jpeg"
          alt="welcome-Image"
        />
      </div>
      <div>
        <p>Benvenuto A Cvox </p>
      </div>
    </div>
  );
};

export default WelcomePage;
