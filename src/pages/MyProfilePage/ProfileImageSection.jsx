import { useNavigate } from "react-router-dom";
import { LuPencil, LuPackage } from "react-icons/lu";
import { Button } from "../../shared/ui/Button";

// user: 사용자 정보 객체
const ProfileImageSection = ({ user }) => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/uploadproduct");
  };

  return (
    <div className="md:w-1/3 flex flex-col self-center md:self-start">
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* 프로필 이미지 */}
          <img
            src={user.profileImg}
            alt="Profile"
            className="w-50 h-50 rounded-full object-cover border-4 border-white"
          />
          {/* 편집 버튼 */}
          <button className="absolute bottom-3 right-3 bg-indigo-500 text-white p-3 rounded-full shadow cursor-pointer hover:bg-indigo-400 transition-colors duration-100">
            <LuPencil />
          </button>
        </div>

        {/* 아이템 등록 버튼 */}
        <Button
          color="rose"
          className="mt-4 font-semibold"
          icon={<LuPackage />}
          onClick={handleUploadClick}
        >
          아이템 등록
        </Button>
      </div>
    </div>
  );
};

export default ProfileImageSection;
