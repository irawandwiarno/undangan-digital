import ImageButton from "@/components/chinese/button-img";
import GradientText from "@/components/chinese/gradient-text";
import dahan from "@assets/images/chinese/cover/dahan.webp"
import pie from "@assets/images/chinese/cover/pie.webp"
import bgButton from "@assets/images/chinese/cover/bg-button.webp"




export default function CoverChinese({onOpen, tamu = ''}) {
    return (
        <main className="relative bg-linear-to-b overflow-hidden from-[#3F1114] to-[#CE3947]  min-h-dvh md:min-h-screen flex items-center justify-center">
            <div className="absolute h-full md:max-h-screen inset-4 border border-[#E2BA7A] rounded-3xl" />
            {/* Branch Top */}
            <img
                src={dahan}
                alt="branch"
                className="absolute -top-10 -left-10 w-full md:w-[85%] max-w-125 z-10"
            />

            {/* Branch Bottom */}
            <img
                src={dahan}
                alt="branch"
                className="absolute -bottom-10 -right-15 w-full md:w-[85%] md:-bottom-25 md:-right-15 max-w-150 rotate-180 z-10"
            />

            <img
                src={pie}
                alt="stamp"
                className="absolute top-29 right-9 md:top-20 md:right-10 w-19 md:w-22 z-10"
            />


            <div className="absolute w-[80%] h-[76%] bottom-0 rounded-t-full border-t border-x border-[#F7CB88] bg-linear-to-b to-[#401114] from-[#A62C34]"></div>
            <div className="absolute w-3/4 h-3/4 bottom-0 rounded-t-full bg-linear-to-b from-[#401114] to-[#A62C34]"></div>
            <div className="absolute mt-40 flex flex-col items-center justify-center z-20">
                <GradientText text='The intimate wedding of' className='text-xs font-alike mb-3' />
                <GradientText text='Dino' className='text-5xl font-parisienne ' />
                <GradientText text='&' className='text-2xl -mt-2 font-parisienne' />
                <GradientText text='Helen' className='text-5xl -mt-4 font-parisienne leading-20' />
                <div className="w-50 h-px bg-yellow-400 mx-auto mb-4" />
                <p className="text-center w-2/3 text-[11px] font-alike text-[#F3C783]">Because every meaningful celebration is made complete by the people we cherish most.</p>
                <p className="text-center w-2/3 text-lg my-3 font-alike text-[#F3C783]">03 | 07 | 2026</p>

                <div className="w-[66%] flex flex-col justify-center items-center gap-1 py-2 bg-linear-to-b to-[#ECDAC4] from-[#FFF5E3] rounded-xl">
                    <p className="text-[#3F1114] font-alike text-xs">A Place Reserved For,</p>
                    <div className="w-[94%] h-10 bg-linear-to-b from-[#ECDAC4] to-[#FFF5E3] rounded-lg flex items-center justify-center">
                        <p className="text-[#3F1114] font-alike text-base">
                            {tamu || 'Anda'}
                        </p>
                    </div>
                </div>

                <div className="w-1/2 mt-5">
                    <ImageButton bgButton={bgButton} onClick={onOpen}>
                        <p className="font-alike text-sm font-semibold bg-linear-to-b from-[#3F1114] to-[#A52D34] bg-clip-text text-transparent">OPEN INVITATION</p>
                    </ImageButton>
                </div>


            </div>
        </main>
    );
}