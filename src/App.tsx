import { Layout } from './components/Layout';
import { Search } from './components/Search';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <Layout>
      <SearchProvider>
        <Search />
      </SearchProvider>
    </Layout>
  );
}

export default App;
