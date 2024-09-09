export default function Grid() {
  return (
    <div className="h-full w-full bg-background md:bg-grid-lg-[#0E5F3E] bg-grid-[#0E5F3E] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
