import { Authorization, instance } from "../../apis";

export const saveAttachment = async ({
  content,
  colorCode,
  postType,
  z,
  x,
  y,
  file,
}) => {
  const { data } = await instance.post(
    "attachment",
    {
      data: {
        content,
        colorCode,
        postType,
        z,
        x,
        y,
      },
      file: {
        file,
      },
    },
    Authorization()
  );

  return data;
};
