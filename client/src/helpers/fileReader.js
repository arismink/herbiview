export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target.result;
      console.log(res);
      resolve(res);
    }
    reader.readAsDataURL(file)
  });
}