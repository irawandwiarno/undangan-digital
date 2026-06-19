import { motion } from "framer-motion";
import bg from "@assets/images/chinese/cover/background.webp"
import dahan from "@assets/images/chinese/cover/dahan.webp"
// import flowerLog from "@assets/images/chinese/cover/flower-log.webp"

export default function CoverDino() {
    return (
        <section className="relative w-full min-h-dvh md:min-h-screen overflow-hidden bg-red-900 flex">

            {/* LEFT EMPTY (desktop only) */}
            <div className="hidden md:block md:w-15/16 bg-blue-500" />

            {/* RIGHT CONTENT */}
            <div className="relative w-full md:w-md overflow-hidden flex items-center justify-center">

                {/* Background */}
                <img
                    src={bg}
                    alt="bg"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Branch Top */}
                <img
                    src={dahan}
                    alt="branch"
                    className="absolute -top-10 -left-5 w-[80%] max-w-125"
                />

                {/* Branch Bottom */}
                <img
                    src={dahan}
                    alt="branch"
                    className="absolute -bottom-10 -right-15 w-[90%] max-w-150 rotate-180 "
                />

                {/* Flower */}
                {/* <img
                    src={flowerLog}
                    alt="stamp"
                    className="absolute top-16 right-8 w-20 md:w-24"
                /> */}

                {/* Outer Border */}
                <div className="absolute inset-1 border border-[#E2BA7A] rounded-3xl" />

                {/* CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-md mx-auto px-6 py-10 text-center"
                >
                    {/* Arch */}
                    <div className="flex justify-center items-center min-h-dvh md:min-h-screen px-6">

                        <div className="my-auto">
                            <p className="text-yellow-300 text-sm font-[Alike]">
                                The intimate wedding of
                            </p>

                            <h1 className="text-yellow-200 text-5xl font-serif">Dino</h1>
                            <p className="text-yellow-300 text-xl">&</p>
                            <h1 className="text-yellow-200 text-5xl font-serif">
                                Helen
                            </h1>

                            <div className="w-20 h-[1px] bg-yellow-400 mx-auto mb-4" />

                            <p className="text-yellow-200 text-xs mb-6">
                                Because every meaningful celebration is made complete by the
                                people we cherish most.
                            </p>

                            <p className="text-yellow-300 tracking-widest text-lg mb-6">
                                03 | 07 | 2026
                            </p>

                            <div className="bg-yellow-100 text-red-900 rounded-2xl px-4 py-3 shadow-inner mb-6">
                                <p className="text-xs">A Place Reserved For,</p>
                                <p className="font-semibold text-lg">
                                    Bpk. EXAMPLE NAME
                                </p>
                            </div>

                            <button className="px-6 py-3 rounded-full bg-linear-to-b from-yellow-300 to-yellow-500 text-red-900 font-semibold shadow-md hover:scale-105 transition">
                                OPEN INVITATION
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}