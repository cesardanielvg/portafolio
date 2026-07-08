import Link from "next/link";

export default function Nav() {
  return (
    <nav className="mx-auto flex w-full max-w-3xl items-center gap-6 px-6 py-6 print:hidden">
      <Link href="/" className="text-sm font-medium hover:underline">
        Info
      </Link>
      <Link href="/cv" className="text-sm font-medium hover:underline">
        CV
      </Link>
    </nav>
  );
}
