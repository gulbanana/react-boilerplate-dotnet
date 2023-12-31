import "./normalize.css";
import "./globals.css";
import { createRoot } from 'react-dom/client';
import MasterDetail from "./MasterDetail";

let root = createRoot(document.getElementById('app')!);
root.render(<MasterDetail />);