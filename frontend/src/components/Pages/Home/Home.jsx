import MessageContainer from "../Messages/MessageContainer";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
	return (
		<div className="flex sm:h-[450px] md:h-[550px] w-full max-w-6xl mx-auto
                     rounded-lg overflow-hidden
                     bg-white/10 backdrop-blur-md border border-white/20">
			<Sidebar />
			<MessageContainer/>
		</div>
	);
};

export default Home;



