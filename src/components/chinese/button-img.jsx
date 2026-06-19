export default function ImageButton({ bgButton, children, onClick, disable = false }) {
  return (
    <button 
    disabled={disable}
    onClick={onClick}
    className="relative inline-flex items-center justify-center">
      <img src={bgButton} alt="" className="w-full h-full object-contain" />
      <span className="absolute inset-0 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}