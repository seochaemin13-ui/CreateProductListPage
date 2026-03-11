import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil';
import './index.css'
import App from './App.jsx'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start({
      serviceWorker: {
        url: '/CreateProductListPage/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    })
  }
}

const root = createRoot(document.getElementById('root'));

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <RecoilRoot> 
        <Suspense fallback={<div>로딩 중...</div>}>
          <App />
        </Suspense>
      </RecoilRoot>
    </StrictMode>,
  )
}).catch(err => {
  console.error("MSW 활성화 실패:", err);
});