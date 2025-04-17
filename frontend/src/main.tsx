import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'

import Layout from './shared/Layout'
import NotFound from './shared/NotFound'

import Home from './modules/home/Home'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
