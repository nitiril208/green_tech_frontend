const RegisterBanner = () => {
  return (
    <div className="relative lg:block hidden">
      <img
        className="max-w-full xl:h-[850px] h-[980px]"
        src="../assets/img/Image.png"
      />

      <img
        className="absolute top-[60px] left-1/2 -translate-x-1/2 max-h-[365px] h-auto"
        src="../assets/img/pngwing.png"
      />
      <h2 className="absolute xl:bottom-[180px] bottom-[200px] left-1/2 -translate-x-1/2 text-white xl:text-[36px] text-[32px] xl:max-w-[505px] max-w-[400px] xl:leading-[46px] leading-[36px] w-full font-d-din-pro">
        <span className="text-[#73AF26]">Empower</span> your potential through
        our comprehensive training programs, where knowledge meets innovation
      </h2>
    </div>
  );
};

export default RegisterBanner;
