import React from "react";
import { useRef, useState, useEffect } from "react";
import { color } from "../../style";
import { useSaveAttachmentMutation } from "../../services/attachment/mutation";

const Attachment = ({
  setClickState,
  colorCode,
  contents,
  files,
  name,
  time,
  zIndex,
  setZIndex,
  isEditing,
  postType,
  defaultX,
  defaultY,
}) => {
  const postRef = useRef();

  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [text, setText] = useState("");
  const [file, setfile] = useState(null);
  const [isEdit, setIsEdit] = useState(isEditing);

  const { saveAttachmentMutate } = useSaveAttachmentMutation({
    content: text,
    colorCode: colorCode,
    postType: postType,
    z: zIndex,
    x: postRef.current?.style.left,
    y: postRef.current?.style.top,
    file: file,
  });

  const handleMouseDown = (event) => {
    setClickState(false);
    setIsMouseDown(true);
    setStartPos({ x: event.clientX, y: event.clientY });
    postRef.current.style.transform = "scale(1.03)";
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    postRef.current.style.transform = "scale(1)";
    setZIndex(zIndex + 1);
    postRef.current.style.zIndex = `${zIndex}`;
  };

  //마우스 움직이고 있고, 누른거 체크후 마우스따라 움직임 & 벗어나는것 금지

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      setClickState(false);

      const offsetX = event.clientX - startPos.x;
      const offsetY = event.clientY - startPos.y;

      postRef.current.style.left = `${postRef.current.offsetLeft + offsetX}px`;
      postRef.current.style.top = `${postRef.current.offsetTop + offsetY}px`;
      postRef.current.style.zIndex = "9999999";

      setStartPos({ x: event.clientX, y: event.clientY });
    }
  };

  useEffect(() => {
    postRef.current.style.top = `${defaultY}px`;
    postRef.current.style.left = `${defaultX}px`;
  }, []);

  useEffect(() => {
    const post = postRef.current;

    post.addEventListener("mousedown", handleMouseDown);
    post.addEventListener("mouseup", handleMouseUp);
    post.addEventListener("mousemove", handleMouseMove);

    return () => {
      post.removeEventListener("mousedown", handleMouseDown);
      post.removeEventListener("mouseup", handleMouseUp);
      post.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseDown, startPos]);

  return (
    <div
      ref={postRef}
      className={`w-64 h-64 text-[1rem] bg-[] absolute z-20 cursor-pointer flex flex-col items-center justify-between p-2`}
      style={{
        backgroundImage: `url('images/post${colorCode}.png')`,
        backgroundSize: "contain",
      }}
    >
      {isEdit ? (
        postType === "TEXT" ? (
          <textarea
            value={text}
            onFocus={() => {
              setIsMouseDown(false);
              setClickState(false);
            }}
            onChange={(event) => {
              setText(event.target.value);
            }}
            maxLength={110}
            placeholder="내용을 입력하세요"
            className=" p-2 w-full h-[180px] outline-none bg-transparent resize-none font-normal placeholder:text-[202020] placeholder:opacity-[0.7] flex"
          />
        ) : !file ? (
          <>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setfile(e.target.value)}
            />
            <label
              for="file"
              className="m-2 w-[228px] h-[179px] flex justify-center items-center rounded-lg font-normal cursor-pointer"
              style={{ backgroundColor: color[colorCode] }}
            >
              클릭해서 파일 업로드
            </label>
          </>
        ) : (
          <div
            className="w-[228px] h-[71px] flex flex-col justify-between p-2 box-border relative m-2"
            style={{ backgroundColor: color[colorCode] }}
          >
            <div className="font-normal w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {file.substring(file.lastIndexOf("\\") + 1)}
            </div>
            <div className="w-full flex justify-between text-[12px] text-[#202020] opacity-[0.4]"></div>
          </div>
        )
      ) : postType === "TEXT" ? (
        <div className="font-normal w-full break-words p-2">{text}</div>
      ) : (
        <div
          className="w-[228px] h-[71px] flex flex-col justify-between p-2 box-border relative m-2"
          style={{ backgroundColor: color[colorCode] }}
        >
          <div className="font-normal">
            {file.substring(file.lastIndexOf("\\") + 1)}
          </div>
          <div className="w-full flex justify-between text-[12px] text-[#202020] opacity-[0.4]">
            <div className="font-normal">클릭하여 다운로드</div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-between items-end">
        <div className="flex gap-2 font-normal text-[14px] text-[#202020] opacity-[0.4]">
          <div>{name}</div>
          <div>{time}</div>
        </div>
        {isEdit && (
          <div
            className="w-[35px] h-[35px] mr-12 rounded-lg text-black text-[1.1rem] flex justify-center items-center hover:opacity-[0.6] hover:scale-[1.03]"
            style={{ backgroundColor: color[colorCode] }}
            onClick={() => {
              saveAttachmentMutate();
              setIsEdit(false);
            }}
          >
            ✓
          </div>
        )}
      </div>
    </div>
  );
};

export default Attachment;
