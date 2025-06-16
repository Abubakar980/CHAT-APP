import { getRandomAvatar } from "../../../utils/avatars";

const Conversation = ({ user, emoji, isSelected, onClick }) => {
  const avatar = getRandomAvatar(user.username, user.gender);

  return (
    <>
      <div
        onClick={onClick}
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : "hover:bg-sky-500"}`}
      >
        <div className='relative'>
          <div className='w-12 rounded-full overflow-hidden'>
            <img src={avatar} alt='user avatar' />
          </div>
          {/* online green dot */}
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{user.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
          <p className='text-sm text-gray-400'>@{user.username}</p>
        </div>
      </div>

      <div className='divider my-0 py-0 h-1' />
    </>
  );
};

export default Conversation;
