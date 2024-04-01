import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './DropDown.css'

export default function DropDown({
   data,
   multiSelect,
   label,
   dropDownWidth = 280,
   menuHeight = 320,
   optionHeight = 40,
   onChangeFunc = () => {}
}) {
   const [isOpen, setOpen] = useState(false);
   const [selectedList, setSelectedList] = useState([]);
   const [scrollTop, setScrollTop] = useState(0);

   /**
    Function recived as prop to capture
    selected list for parent component
   */
   useEffect(() => {   
       onChangeFunc(selectedList)
   }, [selectedList])

   function handleOpen() {
       setOpen(!isOpen);
   }

   
   function DisplayTitle() {
       if (selectedList.length) {
           return selectedList.reduce((acc, item) => {
               acc += data[item].name + ", ";
               return acc;
            }, "").slice(0, -2);
        } else {
            return "Select An Option";
        }
    }
    
    function handleClickOption(event) {
        let selectedItem = parseInt(event.currentTarget.dataset.id);
 
        if (!selectedList.includes(selectedItem)) {
            if (!multiSelect) {
                setSelectedList([selectedItem]);
            } else if (multiSelect) {
                setSelectedList(list => [...list, selectedItem]);
            }
        } else {
            let newSelectedList = [...selectedList];
            newSelectedList = newSelectedList.filter(item => item !== selectedItem);
            setSelectedList(newSelectedList);
        }
    }

   function handleSelectAll() {
       if (selectedList.length === data.length) { 
           setSelectedList([]);
       }
       else { 
           setSelectedList(data.map(item => item.id));
       }
   }

   function OptionTile(item) {
       let isSelected = selectedList.includes(item.id);

       return (
           <div
               className={`dd-options ${isSelected ? 'checked' : ""}`}
               data-id={item.id}
               onClick={handleClickOption}
               key={item.id}
               style={{ height: optionHeight }}
           >
               {multiSelect && (
                   <input
                       type="checkbox"
                       checked={isSelected}
                       onChange={() => { }}
                   />
               )}
               <p>
                   {item.name}
               </p>
           </div>
       );
   }

   function handleScroll({ target }) {
       setScrollTop(target.scrollTop);
   };

   function createVirtualizedList() {
       const startIdx = Math.floor(scrollTop / optionHeight);
       const endIdx = Math.min(
           startIdx + Math.ceil(menuHeight / optionHeight),
           data.length
       );
       const visibleItems = data.slice(startIdx, endIdx);

       return (
           <div style={{ height: `${data.length * optionHeight}px` }}>
               <div
                   style={{
                       position: "relative",
                       top: `${startIdx * optionHeight}px`,
                       height: `${visibleItems.length * optionHeight}px`,
                   }}
               >
                   {visibleItems.map(item => OptionTile(item))}
               </div>
           </div>
       )
   }

   function DisplayOptionsList() {
       return (
           <>
               {multiSelect && (
                   <div
                       className="dd-options multi-select"
                       key="select-all"
                       onClick={handleSelectAll}
                       style={{ height: optionHeight }}
                   >
                       <input
                           type="checkbox"
                           checked={selectedList.length === data.length}
                           onChange={() => { }}
                       />
                       <p>
                           {selectedList.length === data.length ? "Deselect All" : "Select All"}
                       </p>
                       <hr />
                   </div>
               )}

               {createVirtualizedList()}
           </>
       );
   }

   return (
       <div className='dd-container'
           style={{ width: `${dropDownWidth}px` }}
       >
           <div className='dd-header'>
               <div className='dd-title'>
                   {DisplayTitle()}
               </div>
               <label className="input-label"> {label} </label>
               <button onClick={handleOpen}>
                   {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
               </button>
           </div>

           {isOpen && (
               <div
                   className='dd-menu'
                   onScroll={handleScroll}
                   style={{ height: `${menuHeight}px`, overflowY: "scroll" }}
               >
                   {DisplayOptionsList()}
               </div>
           )}
       </div>
   );
}
