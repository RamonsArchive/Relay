import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-y-3 w-full overflow-y-auto scrollbar-hide p-5">
      <div className="flex flex-col gap-y-3 max-w-lg mx-auto items-center bg-slate-50 p-5 rounded-md shadow-md">
        <h1 className="font-plex-sans font-regular text-[16px] sm:text-[18px] md:text[20px]">
          About Me
        </h1>
        <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
          Last updated: 06/27/2025
        </p>
        <div className="flex flex-col gap-y-3 w-full">
          <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">
            1. Introduction
          </h2>
          <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
            {`I am a cat lover, gym goer, soccer player, and a software engineer. I've lived in Long Beach CA during my early childhood, until I moved to Irvine CA, before moving to Placerville CA for my high school years, and then finally moving to San Diego CA for my college years. Every city has its own unique charm, and I've been fortunate to experience them all.`}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/assets/images/prettyMe.png"
              alt="Me"
              width={100}
              height={100}
              className="w-full h-56 rounded-md object-cover"
            />
            <img
              src="/assets/images/whisper.png"
              alt="Whisper"
              width={100}
              height={100}
              className="w-full h-56 rounded-md object-cover"
            />
            <img
              src="/assets/images/family.png"
              alt="Family"
              width={100}
              height={100}
              className="w-full h-56 rounded-md object-cover"
            />
            <video
              width={400}
              height={300}
              controls
              autoPlay
              muted // Required for autoplay in most browsers
              loop
              className="rounded-md shadow-lg w-full h-56 object-cover"
            >
              <source src="/assets/videos/test_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">
            2. Education
          </h2>
          <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
            {`I am a third year student at UC San Diego studying Cognitive Science with a specialization in Machine Learning and Neural Computation, minoring in Computer Science. Expected graduation: June 2027.`}
          </p>
          <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">
            3. Experience
          </h2>
          <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
            {`I've built several full-stack projects including Relay, a comprehensive e-commerce platform with hybrid database architecture, payment processing, and real-time inventory management.`}
            {`I've also developed custom machine learning models using YOLOv8 for object detection, conducted statistical research analyzing media performance data, and created AI-powered transcription systems.`}
          </p>
          <h2 className="font-plex-sans font-regular text-[14px] sm:text-[16px] md:text[18px]">
            4. Skills
          </h2>
          <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
            <strong>Frontend:</strong> Next.js, React, TypeScript, Tailwind CSS
            <br />
            <strong>Backend:</strong> Node.js, MySQL, Prisma, Sanity CMS
            <br />
            <strong>Cloud & APIs:</strong> Vercel, Oracle Cloud, Stripe, Google
            Maps
            <br />
            <strong>ML/AI:</strong> YOLOv8, OpenCV, Python, Statistical Analysis
            <br />
            <strong>Tools:</strong> Git, Auth.js, Redis, Webhook Integration
          </p>
          <p className="font-plex-sans font-light text-[10px] md:text-[12px]">
            I am looking for an internship for the summer of 2026. I am open to
            any opportunities, so feel free to contact me at
            clutchdev.apps@gmail.com or on my social media.
          </p>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex items-center justify-center flex-1 bg-slate-600 rounded-md"
            >
              <button className="text-white font-semibold px-2 py-1 text-[10px] sm:text-[12px] md:text-[14px] rounded-md transition-all duration-300 ease-in-out hover:bg-slate-700 w-full">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
