const HeroSection = ({ handleFilter, filterValue, isLoggedIn }) => {
  return (
    <div className="relative mt-16 overflow-hidden md:mt-18 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative pb-4">
        <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-14">
          <div className="text-center">
            {!isLoggedIn && (
              <>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 font-display sm:text-5xl md:text-6xl xl:text-7xl">
                  <span className="block xl:inline">Get the best</span>
                  <span className="block text-brand">
                    Garments, Wares and Clothes
                  </span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Experience the elegance of Kwara with every thread.
                </p>
              </>
            )}
            <div className="relative max-w-3xl px-4 mx-auto mt-10 sm:px-6">
              <form action="/" acceptCharset="UTF-8" method="get">
                <input
                  defaultValue="all"
                  autoComplete="off"
                  type="hidden"
                  name="price"
                  id="price"
                />
                <input
                  defaultValue="all"
                  autoComplete="off"
                  type="hidden"
                  name="type"
                  id="type"
                />
                <input
                  defaultValue="any"
                  autoComplete="off"
                  type="hidden"
                  name="technology"
                  id="technology"
                />
                <input
                  defaultValue="trending"
                  autoComplete="off"
                  type="hidden"
                  name="order"
                  id="order"
                />
                <div className="relative w-full max-w-xl mx-auto bg-white rounded-full h-18 lg:max-w-none">
                  <input
                    placeholder="e.g. Shirt"
                    className="rounded-full w-full h-18 bg-transparent py-0 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-cool-indigo-200 focus:border-cool-indigo-200"
                    type="text"
                    name="query"
                    id="query"
                    value={filterValue}
                    onChange={(e) => handleFilter(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute inline-flex items-center h-12 px-4 py-2 text-sm text-white transition duration-150 duration-300 ease-in-out rounded-full outline-none right-3 top-3 bg-cool-indigo-600 sm:px-6 sm:text-base sm:font-medium hover:bg-cool-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500"
                  >
                    <svg
                      className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search
                  </button>
                </div>
              </form>{" "}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default HeroSection;
