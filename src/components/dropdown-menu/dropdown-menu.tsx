import { useState } from 'react';
import { REGIONS, Regions } from '../../constants/regions';

interface Props {
  handleRegionChange: (region: Regions) => void;
}

export function DropdownMenu({ handleRegionChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuButtonClick = () => {
    toggleDropdown();
  };

  const handleMenuItemsClick = (region: Regions) => {
    handleRegionChange(region);
    toggleDropdown();
  };

  const renderOptions = () => {
    return Object.values(REGIONS).map((region) => (
      <div key={region} className="text-[14px] hover:bg-green-100">
        <DropdownItem key={region} onClick={() => handleMenuItemsClick(region)}>
          {region}
        </DropdownItem>
      </div>
    ));
  };

  return (
    <div className="relative inline-block w-[160px] text-left">
      <div className="hover:bg-green-100">
        <button
          type="button"
          className="flex w-full justify-between rounded-md bg-white p-1 pl-3 text-[16px] font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-green-100 focus:outline-hidden"
          onClick={handleMenuButtonClick}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Region
          <svg
            className="mr-2 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`absolute top-8 right-0 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition-opacity duration-200 ${
          isOpen
            ? 'visible scale-100 opacity-100'
            : 'invisible scale-95 opacity-0'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        {renderOptions()}
      </div>
    </div>
  );
}

interface DropdownItemProps {
  children: React.ReactNode | string;
  onClick: () => void;
}

function DropdownItem({ children, onClick }: DropdownItemProps) {
  return (
    <button className="w-full" role="menuitem" onClick={onClick}>
      {children}
    </button>
  );
}
