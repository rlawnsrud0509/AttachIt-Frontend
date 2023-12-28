import { useMutation } from "react-query";
import { saveAttachment } from "./api";

export const useSaveAttachmentMutation = ({
  content,
  colorCode,
  postType,
  z,
  x,
  y,
  file,
}) => {
  const { mutate: saveAttachmentMutate, ...restMutation } = useMutation({
    mutationFn: () =>
      saveAttachment({
        content,
        colorCode,
        postType,
        z,
        x,
        y,
        file,
      }),
  });

  return { saveAttachmentMutate, ...restMutation };
};
