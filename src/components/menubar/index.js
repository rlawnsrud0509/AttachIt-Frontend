import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useRecoilState } from "recoil";
import { postArrayAtom } from "../../store";
import Attachment from "../attachment";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../../services/auth/mutate";

const Menubar = ({ parentRef, setClickRef, setZIndex, ZIndex, mapRef }) => {
  const containerRef = useRef();
  const [postArray, setPostArray] = useRecoilState(postArrayAtom);
  const navigate = useNavigate();
  const { userLogoutMutate } = useUserLogoutMutation();

  useEffect(() => {
    containerRef.current.style.left = `${
      (parentRef.current.offsetWidth - containerRef.current.offsetWidth) / 2
    }px`;
  }, [parentRef, containerRef, window]);

  const [color, setColor] = useState(1);

  return (
    <div className="cont" ref={containerRef}>
      <img
        width={153}
        height={56}
        className="logo"
        src={`images/logo${color}.png`}
        alt="logo"
      />
      <img
        onClick={() => {
          setPostArray([
            ...postArray,
            <Attachment
              colorCode={color}
              name={"김준경"}
              isEdit={true}
              postType={"text"}
              setClickState={setClickRef}
              defaultX={
                parentRef.current.offsetWidth / 2 -
                parentRef.current.offsetWidth / 4
              }
              defaultY={
                parentRef.current.offsetHeight / 2 -
                parentRef.current.offsetHeight / 4
              }
              setZIndex={setZIndex}
              zIndex={ZIndex}
            />,
          ]);
        }}
        className="Post"
        src={`images/textpost${color}.png`}
        alt="txtPost"
      />
      <img
        className="Post"
        src={`images/filepost${color}.png`}
        alt="filePost"
        onClick={() => {
          setPostArray([
            ...postArray,
            <Attachment
              colorCode={color}
              name={"김준경"}
              isEdit={true}
              postType={"file"}
              setClickState={setClickRef}
              defaultX={
                mapRef.current.offsetWidth / 2 - mapRef.current.offsetWidth / 4
              }
              defaultY={
                mapRef.current.offsetHeight / 2 -
                mapRef.current.offsetHeight / 4
              }
              setZIndex={setZIndex}
            />,
          ]);
        }}
      />
      <div className="palette">
        <div className="flex gap-2">
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#FF5B73",
              boxShadow: color === 1 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(1);
            }}
          ></div>
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#FF9F46",
              boxShadow: color === 2 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(2);
            }}
          ></div>
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#FFDB5B",
              boxShadow: color === 3 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(3);
            }}
          ></div>
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#51D977",
              boxShadow: color === 4 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(4);
            }}
          ></div>
        </div>
        <div className="flex gap-2">
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#5B9DFF",
              boxShadow: color === 5 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(5);
            }}
          ></div>
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#FF9FF0",
              boxShadow: color === 6 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(6);
            }}
          ></div>
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#B57CFF",
              boxShadow: color === 7 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(7);
            }}
          ></div>
          <div
            className="w-8 h-8 rounded-[999999px] hover:cursor-pointer"
            style={{
              backgroundColor: "#D9D9D9",
              boxShadow: color === 8 ? "0px 0px 0px 1.5px #B57CFF" : "",
              border: "2.5px solid white",
            }}
            onClick={() => {
              setColor(8);
            }}
          ></div>
        </div>
      </div>
      <div className="w-[1px] h-full bg-[#DDDEE3] ml-8" />
      <div
        className="flex flex-col h-full justify-center items-center box-boxShadow ml-6 cursor-pointer"
        onClick={() => {
          if (!window.localStorage.getItem("access-token"))
            window.location.href =
              "https://auth.bssm.kro.kr/oauth?clientId=ffe90891&redirectURI=http://localhost:3000/auth";
          else userLogoutMutate();
        }}
      >
        {window.localStorage.getItem("access-token") ? (
          <>
            <img width={40} height={40} src="images/logout.png" alt="logout" />
            <div className="font-normal">로그아웃</div>
          </>
        ) : (
          <>
            <img width={40} height={40} src="images/login.png" alt="login" />
            <div className="font-normal">로그인</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menubar;
