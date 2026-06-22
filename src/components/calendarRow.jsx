import dateMark from '@assets/images/sutji/undangan/date-mark.webp';
import { motion } from 'framer-motion';


export default function CalendarRow({ value }) {
    return (
        <div className="w-4/5 mt-4 mx-auto">
            <div className="flex justify-between items-center">
                {value?.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <DateBox value={item} index={index} overlay={index === 3 ? dateMark : undefined} />
                    </div>
                ))}
            </div>

        </div>
    );
}

function DateBox({ value, index, overlay }) {
    return (
        <motion.div
            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1, }}
            viewport={{ once: true, amount: 1, }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 * index }}
            className="relative w-10 md:w-11 h-12 bg">
            {overlay && (
                <img
                    src={overlay}
                    alt="overlay"
                    className='absolute inset-0 m-auto w-11 h-auto z-0 -translate-x-4 -translate-y-2'
                />
            )}
            <p className="absolute inset-0 z-10 text-2xl font-bold text-primary font-pacific-northwest">
                {value}
            </p>
        </motion.div>
    )
}