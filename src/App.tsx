import React,{ lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

const Index = lazy(() => import('./page/Index'));
const MarkdownContent = lazy(() => import('./page/content'));

function App() {
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/MarkdownContent/:id" element={<MarkdownContent />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
