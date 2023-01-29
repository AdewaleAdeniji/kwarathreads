const ImageTag = (props) => {
  return (
    <img
      src={props?.src}
      {...props}
      alt={props?.alt}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src =
          "https://i0.wp.com/www.silocreativo.com/en/wp-content/uploads/2017/11/error-404-animacion-CSS.gif?resize=675%2C368&quality=100&strip=all&ssl=1";
      }}
    />
  );
};
export default ImageTag;
