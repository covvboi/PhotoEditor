import './App.css';
import MainCanvas from './component/MainCanvas'
import FilterHeader from './component/FilterHeader'
import WindowAlert from './component/WindowAlert'

function App() {
  return (
    <div className="image_editor">
      <WindowAlert></WindowAlert>
      <div className="card">
        <div className="top_body">
          <FilterHeader ></FilterHeader>
        </div>
        <MainCanvas></MainCanvas>
      </div>
    </div>
  );
}

export default App;
