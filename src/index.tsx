import { createRoot } from 'react-dom/client';
import Character from './Character';

let root = createRoot(document.getElementById('app')!);
root.render(<Character id={1} />);