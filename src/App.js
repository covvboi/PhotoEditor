import './App.css';
// import InputTest from './TestFile/InputTest'
import MainCanvas from './component/MainCanvas'
import FilterHeader from './component/FilterHeader'
import RotateFooter from './component/RotateFooter'
// import SaveButton from './component/SaveButton'

function App() {
  return (
    <div className="image_editor">
      <div className="card">

      <div className="top_body">
        <FilterHeader></FilterHeader>
      </div>

        <RotateFooter></RotateFooter>
        <MainCanvas></MainCanvas>
        {/* <SaveButton></SaveButton> */}
      </div>

    </div>
  );
}

export default App;
