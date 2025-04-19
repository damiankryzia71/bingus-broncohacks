import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'

import Layout from './shared/Layout'
import NotFound from './shared/NotFound'

import Daily from './modules/daily/Daily'
import Journal from './modules/journal/Journal'
import History from './modules/history/History'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Daily />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/history" element={<History />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
