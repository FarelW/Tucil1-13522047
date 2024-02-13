import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-black text-green-500 min-h-screen flex justify-center items-center relative animate-gradient">
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-roboto-mono-bold mb-4 neon-text">
          Welcome to FW Cyberpunk 2077 Hacking Game
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-roboto-mono ">
          Start hacking your way through the cyberpunk world!
        </p>
      <Link href="/program" className="text-lg md:text-xl lg:text-2xl font-roboto-mono text-green-500 mt-[50px] block hover:underline">
            Go to Home Page
      </Link>
      </div>
    </main>
  );
}
