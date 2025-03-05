import { ControlBar } from './components/control-bar/control-bar';
import { CountryTable } from './components/country-table/country-table';

export function App() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white">
        <header className="flex min-h-20 items-center justify-center bg-emerald-200">
          <h2 className="text-center text-4xl font-semibold">
            React Performance
          </h2>
        </header>
        <ControlBar />
        <CountryTable />
      </div>
    </div>
  );
}
