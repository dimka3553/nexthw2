type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className="text-white bg-primary px-5 py-2 rounded-md hover:scale-105 active:scale-95 transition-[0.15s]"
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
