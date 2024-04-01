import './App.css';
import DropDown from './Components/DropDown';
import {dataList, dataListLong} from './data';

function App() {
  return (
    <div className="App">
      <div>
        <p>  Single Select List</p>
        <DropDown data={dataList} multiSelect={false} label={"Name"}/> 
      </div>
      <div>
        <p>  Multi Select List </p>
        <DropDown data={dataList} multiSelect={true} label={"Name"}/> 
      </div>
      <div>
        <p> Extremely Long Single Select List (Virtualized)</p>
        <DropDown data={dataListLong} multiSelect={false} label={"Name"}/> 
      </div>

    </div>
  );
}

export default App;
