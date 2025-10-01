import Navbar from "@/components/common/navbar";
export default function ManifestoPage() {
  return (
    <div className="p-4 sm:p-8">
      <Navbar />
      <div className="flex flex-col gap-y-4 p-4 sm:px-8 bg-accent/20 backdrop-blur-md rounded-lg">
        <h1 className="text-[min(8vw,84px)] font-medium mt-4 sm:mt-6 mb-3 sm:mb-4 flex flex-wrap items-center justify-start gap-3 md:gap-4">
          Mind Sink Manifesto
        </h1>
        <p className="text-2xl font-medium mb-6">
          Let your thoughts <span className="font-lora italic">sink</span>.
        </p>
        <p className="text-lg mb-4">
          Mind Sink is built for clarity, not noise. No endless scroll, no ads,
          no distractions. Just a space to let your ideas rest and resurface
          when needed.
        </p>
        <p className="text-lg mb-4">
          Unlike Pinterest’s chaos and Refern’s complexity, Mind Sink is
          stripped down to the essentials. It is a simpler, calmer way to
          collect and revisit what matters.
        </p>
        <h2 className="text-2xl font-semibold mb-2">What We Stand For</h2>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>Focus: No infinite feeds or clutter.</li>
          <li>Simplicity: Clean and minimal by design.</li>
          <li>Control: Your thoughts stay yours.</li>
        </ul>
        <p className="text-lg">
          Mind Sink is not about consuming more. It is about creating space for
          less—so your thoughts can truly sink.
        </p>
      </div>
    </div>
  );
}
