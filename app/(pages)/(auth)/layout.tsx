import BottomText from './auth/components/BottomText';
import Logo from './auth/components/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="m-auto flex w-full max-w-lg flex-col items-center rounded-lg bg-white px-8 py-7 shadow-lg sm:px-12">
        <div className="mb-8">
          <Logo />
        </div>
        <div className="w-full">{children}</div>
        <div className="mt-8 w-full text-center">
          <BottomText />
        </div>
      </div>
    </div>
  );
}
