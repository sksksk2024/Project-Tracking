import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Loader from './Loader';
import logo from '../images/logo.svg';
import hamburger from '../images/icon-hamburger.svg';
import close from '../images/icon-close.svg';

function Header() {
  const [isHidden, setIsHidden] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State to store message to be shown in the modal

  // Toggle menu visibility
  const MenuStart = () => setIsHidden(!isHidden);

  // React Query: Mutation for login
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          method: 'POST', // Ensure this is POST
          headers: {
            'Content-Type': 'application/json', // Necessary header
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setModalMessage(data.message); // Set message from server response
      setIsModalOpen(true); // Open the modal on successful login
    },
    onError: (error) => {
      setModalMessage(`Error: ${error.message}`);
      setIsModalOpen(true); // Open the modal on error
    },
  });

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="font-barlow-condensed flex flex-col lg:flex-row gap-10 justify-around items-center my-48M relative">
      <div className="flex justify-between items-center w-full">
        <img
          className="min-w-32MW w-[2.5vw] lg:max-w-48MW"
          src={logo}
          alt="brand"
        />

        {/* Accessing the menu - Mobile */}
        <div
          className="relative cursor-pointer min-w-24MW w-[2.5vh] h-[2.5vh] block lg:hidden"
          onClick={MenuStart}
        >
          {/* Hamburger Icon */}
          <img
            src={hamburger}
            alt="burger menu"
            className={`z-10 absolute inset-0 w-full h-full transition-transform transition-opacity duration-300 ${
              isHidden
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-75 rotate-180 pointer-events-none'
            }`}
          />
          {/* Close (X) Icon */}
          <img
            src={close}
            alt="close menu"
            className={`absolute z-10 inset-0 w-full h-full transition-transform transition-opacity duration-300 ${
              isHidden
                ? 'opacity-0 scale-75 rotate-180 pointer-events-none'
                : 'opacity-100 scale-100 rotate-0'
            }`}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isHidden ? 'animate-comeOut cursor-none' : 'z-50 animate-comeIn'
        } relative lg:hidden`}
      >
        <ul
          className={`animate-fade absolute flex flex-col items-center justify-center gap-4 font-bold text-very-dark-blue text-lg w-[90vw] p-16P bg-white rounded-5BR ${
            isHidden ? 'select-none' : '-translate-x-1/2'
          }`}
        >
          <li className="relative cursor-pointer group">
            <button disabled className="cursor-pointer">
              Product
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-black group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative cursor-pointer group">
            <button disabled className="cursor-pointer">
              Features
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-black group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative cursor-pointer group">
            <button disabled className="cursor-pointer">
              Pricing
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-black group-hover:w-full transition-all duration-300"></span>
          </li>
          <hr className=" border-light-grayish-blue border-solid border w-full" />
          <li className="relative cursor-pointer group">
            <button className="text-grayish-blue" onClick={() => mutate()}>
              {isLoading ? <Loader /> : 'Login'}
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-grayish-blue group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="relative hidden lg:flex gap-8 font-bold text-lg p-16P">
        <ul className="flex gap-8 mr-8 text-very-dark-blue">
          <li className="relative cursor-pointer group">
            <button disabled className="cursor-pointer">
              Product
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-black group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative cursor-pointer group">
            <button disabled className="cursor-pointer">
              Features
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-black group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative cursor-pointer group">
            <button disabled className="cursor-pointer">
              Pricing
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-2H bg-black group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative">
            <div className="absolute top-12.8I translate-x-[200%] w-2 h-2 rounded-50BR bg-grayish-blue border-grayish-blue"></div>
          </li>
          <li className="relative cursor-pointer group">
            <button className="text-grayish-blue ml-8" onClick={() => mutate()}>
              {isLoading ? <Loader /> : 'Login'}
            </button>
            <span className="absolute left-8 bottom-0 w-0 h-2H bg-grayish-blue group-hover:w-3/5 transition-all duration-300"></span>
          </li>
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog id="my_modal_2" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Login Status</h3>
            <p className="py-4">{modalMessage}</p>
            <form method="dialog" className="modal-backdrop">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}
    </header>
  );
}

export default Header;
