import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
const Application = lazy(() => import('./Application'));
// import Archived from './pages/Archived'
// import Favourites from './pages/Favourites'
// import Saved from './pages/Saved'

function App() {
    return (
        <>
            {/* <UsernamePopup /> */}
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Suspense fallback={<Spinner />}>
                        <Application />
                    </Suspense>} />
                    {/* <Route path="/favourites" element={<Favourites />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/archived" element={<Archived />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
