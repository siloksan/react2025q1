import { Regions } from '../../constants/regions';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { SearchBox } from '../search-box/search-box';

interface Props {
  setRegion: React.Dispatch<React.SetStateAction<Regions>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function ControlBar({ setRegion, setSearchTerm }: Props) {
  return (
    <div className="flex w-full flex-wrap justify-between p-3">
      <SearchBox setSearchTerm={setSearchTerm} />
      <DropdownMenu setRegion={setRegion} />
    </div>
  );
}
