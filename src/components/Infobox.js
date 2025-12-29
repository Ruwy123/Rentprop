import Link from "next/link";
const InfoBox = ({
  heading,
  backgroundcolor = "bg-grey-100",
  textcolor = "bg-grey-600",
  buttonInfo,
  children,
}) => {
  return (
    <div
      className={`${backgroundcolor} ${textcolor} bg-gray-100 p-6 rounded-lg shadow-md`}
    >
      <h2 className={`${textcolor} text-2xl font-bold`}>{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block bg-[#1E2D24] text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
