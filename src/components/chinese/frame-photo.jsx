import { FlowerFloat, FlowerHanging, FlowerSpreading, FlowerSwayLeft, FlowerSwayRight } from "@/utils/flower-jigle";

export default function FramedPhoto({
  photo,
  frame,
  flower,
  width = "w-72",
  photoSize = "100%",
  photoX = "50%",
  photoY = "50%",
}) {
  return (
    <div className={`relative ${width} flex justify-center items-center`}>
      <div className="absolute -right-4 -top-7 w-[50%]">
        <FlowerSpreading>
          <img src={flower} alt="" className="w-full" />
        </FlowerSpreading>
      </div>
      <div className="absolute -left-4 -top-7 w-[50%] -scale-x-100">
        <FlowerSpreading>
          <img src={flower} alt="" className="w-full" />
        </FlowerSpreading>
      </div>
      {/* frame di belakang sebagai ukuran referensi */}
      <img
        src={frame}
        alt=""
        className="relative w-[90%] h-auto pointer-events-none select-none"
      />

      {/* foto di depan, ikut ukuran frame */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${photo})`,
          backgroundSize: photoSize,
          backgroundPosition: `${photoX} ${photoY}`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}