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
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({ content, colorCode, postType, z, x, y })
  );
  formData.append("file", new Blob([file]));

  //   formData.append("data[content]", content);
  //   formData.append("data[colorCode]", colorCode);
  //   formData.append("data[postType]", postType);
  //   formData.append("data[z]", z);
  //   formData.append("data[x]", x);
  //   formData.append("data[y]", y);
  //   formData.append("file", file);
  console.log(formData);

  const { data } = await instance.post("attachment", formData, {
    ...Authorization("multipart/form-data"),
    type: "multipart/form-data",
  });

  return data;
};
