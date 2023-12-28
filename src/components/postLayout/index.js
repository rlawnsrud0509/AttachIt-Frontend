import React, { useEffect, useRef, useState } from "react";
import Menubar from "../menubar";
import { useRecoilValue } from "recoil";
import { postArrayAtom } from "../../store";

const PostLayout = () => {
  const baseMapRef = useRef();
  const mapRef = useRef();
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [zIndex, setZIndex] = useState(21);

  const postArray = useRecoilValue(postArrayAtom);

  //마우스 눌렀을때 시작위치저장 & 움직일 div움직일수잇게함

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setStartPos({ x: event.clientX, y: event.clientY });
  };

  //0px 안된상태에서 타이밍맞게 마우스 땠을경우 0px안되고 유지되는거 방지

  const handleMouseUp = () => {
    if (parseInt(mapRef.current.style.left.replace("px", "")) > 0) {
      mapRef.current.style.left = "0px";
    }
    if (parseInt(mapRef.current.style.top.replace("px", "")) > 0) {
      mapRef.current.style.top = "0px";
    }
    if (
      parseInt(mapRef.current.style.left.replace("px", "")) <
      -baseMapRef.current.offsetWidth
    ) {
      mapRef.current.style.left = "auto";
      mapRef.current.style.right = "0px";
    }
    if (
      parseInt(mapRef.current.style.top.replace("px", "")) <
      -baseMapRef.current.offsetHeight
    ) {
      mapRef.current.style.top = "auto";
      mapRef.current.style.bottom = "0px";
    }

    setIsMouseDown(false);
  };

  //마우스 움직이고 있고, 누른거 체크후 마우스따라 움직임 & 벗어나는것 금지

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      const offsetX = event.clientX - startPos.x;
      const offsetY = event.clientY - startPos.y;

      if (mapRef.current.offsetLeft + offsetX >= 0)
        mapRef.current.style.left = "0px";
      if (mapRef.current.offsetTop + offsetY >= 0)
        mapRef.current.style.top = "0px";
      if (
        -mapRef.current.offsetLeft >=
        mapRef.current.offsetWidth - baseMapRef.current.offsetWidth
      ) {
        mapRef.current.style.left = "auto";
        mapRef.current.style.right = "0px";
      }
      if (
        -mapRef.current.offsetTop >=
        mapRef.current.offsetHeight - baseMapRef.current.offsetHeight
      ) {
        mapRef.current.style.top = "auto";
        mapRef.current.style.bottom = "0px";
      }
      mapRef.current.style.left = `${mapRef.current.offsetLeft + offsetX}px`;
      mapRef.current.style.top = `${mapRef.current.offsetTop + offsetY}px`;

      setStartPos({ x: event.clientX, y: event.clientY });
    }
  };

  useEffect(() => {
    const baseRef = baseMapRef.current;

    baseRef.addEventListener("mousedown", handleMouseDown);
    baseRef.addEventListener("mouseup", handleMouseUp);
    baseRef.addEventListener("mousemove", handleMouseMove);

    return () => {
      baseRef.removeEventListener("mousedown", handleMouseDown);
      baseRef.removeEventListener("mouseup", handleMouseUp);
      baseRef.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseDown, startPos]);

  return (
    <div
      ref={baseMapRef}
      className="w-screen h-screen relative bg-orange-200 overflow-hidden"
    >
      <Menubar
        parentRef={baseMapRef}
        setClickRef={setIsMouseDown}
        setZIndex={setZIndex}
        ZIndex={zIndex}
      />
      <div
        ref={mapRef}
        className={`w-[10000px] h-[7000px] z-10 absolute bg-white text-black cursor-grab active:cursor-grabbing text-[10rem] font-bold  bg-[url('../public/images/background.png')]`}
      >
        {postArray}
      </div>
    </div>
  );
};

export default PostLayout;
