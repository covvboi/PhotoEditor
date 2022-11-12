import './App.css';
// import InputTest from './TestFile/InputTest'
import MainCanvas from './component/MainCanvas'
import FilterHeader from './component/FilterHeader'
import RotateHeader from './component/RotateHeader'
// import SaveButton from './component/SaveButton'

function App() {
  return (
    <div className="image_editor">
      <div className="card">

        <div className="top_body">
          <FilterHeader></FilterHeader>
          {/* <RotateHeader></RotateHeader> */}
        </div>
        {/* <div className="rotate_header">
        </div> */}
        <MainCanvas></MainCanvas>
        {/* <SaveButton></SaveButton> */}
      </div>

    </div>
  );
}

export default App;
