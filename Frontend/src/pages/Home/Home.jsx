const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-80  h-[calc(100vh-7rem)] xl:h-[calc(100vh-8rem)] 2xl:h-[calc(100vh-9rem)] "> 
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center hidden sm:block text-black">
          Please Select a section <br/>from the Left Bar
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center sm:hidden block text-black">
          Please Select a section <br/>from the Top Bar
        </p>
      </div>
    </>
  );
};

export default Home;
