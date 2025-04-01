"use client";
import "../app/globals.css";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loadingbar">
      <Image
        src="https://yuanshen.site/imgs/loading-bar.png"
        alt="Loading..."
        data-longdesc="https://ys.mihoyo.com/main/"
        width={500}
        height={62.5}
      />
    </div>
  );
};

export default Loader;
