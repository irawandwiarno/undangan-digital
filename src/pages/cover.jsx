import frameImg from '@assets/images/cover/frame.webp';
import yai from '@assets/images/cover/yai.webp';
import couple from '@assets/images/cover/pasangan.webp';

export default function Cover({ isOpen = false, tamu = '', onOpen = () => { } }) {
    return (
        <main className="w-screen h-dvh md:h-screen overflow-hidden bg-white flex items-center justify-center">
            <div className='relative w-full md:max-w-sm bg-white'>
                <div className="relative w-full my-auto">
                    <img src={frameImg} alt="frame" className='w-full h-auto object-contain' />

                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-6"
                    >
                        <img src={yai} alt="couple" className='w-7/12 mt-3 h-auto object-contain object-center' />
                        <div className='w-full my-2 flex justify-center'>
                            <img src={couple} alt="couple" className='w-7/12 my-3 mr-7 h-auto object-contain object-center' />
                        </div>
                        <h1 className='text-4xl text-center text-primary font-pacific-northwest'>
                            Sutji & Windy
                        </h1>
                        <p className='text-xs font-bold mt-1 text-center text-primary font-glacial-indifference'>
                            we invite you to celebrate our wedding
                        </p>

                        <p className='text-base font-bold mt-5 text-center text-primary font-glacial-indifference'>
                            Dear,
                        </p>
                        <p className='text-lg capitalize font-bold my-3 text-center line-clamp-1 text-primary font-glacial-indifference'>
                            {tamu || 'Anda'}
                        </p>
                        <div className='w-full mt-2 flex justify-center'>
                            <button onClick={onOpen} className='bg-primary text-white font-glacial-indifference mx-auto py-2 px-4 rounded-full hover:bg-primary/80 transition-colors duration-300'>
                                Buka Undangan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}