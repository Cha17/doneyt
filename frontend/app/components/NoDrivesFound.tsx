import Image from "next/image";

interface NoDrivesFoundProps {
  message?: string;
}

export default function NoDrivesFound({
  message = "No drives found",
}: NoDrivesFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center col-span-full">
      <Image
        src="/images/ndf.png"
        alt="No drives found"
        width={400}
        height={400}
        className="object-contain max-w-full"
      />
      <p className="mt-4 text-white text-base font-normal text-center">
        {message}
      </p>
    </div>
  );
}
