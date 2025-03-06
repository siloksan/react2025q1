import { Regions } from '../../constants/regions';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { SearchBox } from '../search-box/search-box';

interface Props {
  handleRegionChange: (region: Regions) => void;
  handleSearch: (searchTerm: string) => void;
}

export function ControlBar({ handleRegionChange, handleSearch }: Props) {
  return (
    <div className="flex w-full flex-wrap justify-between p-3">
      <SearchBox handleSearch={handleSearch} />
      <DropdownMenu handleRegionChange={handleRegionChange} />
    </div>
  );
}
