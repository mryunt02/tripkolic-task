import Navbar from './components/Navbar';
import ToursList from './components/ToursList';

export default function Home() {
  return (
    <main className='min-h-screen pt-16 px-4'>
      <Navbar />
      <ToursList />
    </main>
  );
}
