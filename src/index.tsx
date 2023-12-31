import "./normalize.css";
import { createRoot } from 'react-dom/client';
import CharacterView from './CharacterView';

let root = createRoot(document.getElementById('app')!);
root.render(<CharacterView id={1} />);