import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Multiselect from 'multiselect-react-dropdown';
import { useFirestore } from '../hooks/useFirestore';
import { useCollection } from '../hooks/useCollection';
import { useState } from 'react';

const customStyles = {
  content: {
    size: '80%',
    top: '40%',
    left: '50%',
    right: '20%',
    bottom: '10%',
    marginRight: '-10%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement');




export default function BasicModal({eventId,selectedPlayerArray,roundNo,roundId}) {

  console.log("in basic Modal - slectedPlayerArray is - ",selectedPlayerArray)
  console.log("in basic Modal - Round No  is - ",roundNo)
  console.log("in basic Modal - event id is - ",eventId)


  const { addDocument, response } = useFirestore('events/'+ eventId +"/rounds")

   const { documents, error } = useCollection(
    // 'events', ["uid", "==", user.uid]
   //   'events', ["eventName", "==", 'Can you see this'], ['createdAt', 'desc']
   'events/'+ eventId +"/rounds/" + roundId +"/groups"
    
   )
 
     documents &&   console.log("in basic modal - documents is - " ,{documents})

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const specificModalIsOpen=[""]
  //const [modalIsOpenMap,setModalIsOpenMap]= React.useState(new Map())
  const [modalIsOpenMap,setModalIsOpenMap]= React.useState([])
 // 
 // var modalIsOpenMap = new Map()

  documents && documents.map((document) => (
   // modalIsOpenMap.set(document.id,false)
   modalIsOpenMap[document.roundNo] = false

  )
  )

  console.log("specific Modal array - ",modalIsOpenMap)

  function openModal(isOpenDocId) {
    //setIsOpen(true);
   // modalIsOpenMap.set(isOpenDocId,true)
   modalIsOpenMap[isOpenDocId] = true

   setModalIsOpenMap(modalIsOpenMap)
    console.log("Running on click - ", modalIsOpenMap)
    //modalIsOpenMap.set(isOpenDocId,true)
    //console.log("Running on click - ", modalIsOpenMap.get(isOpenDocId))
  
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
  //  setIsOpen(false);
  }

  const handleSubmit = (e) => {
    
  //    console.log("selectedPlayers")
  //    console.log(e)
  //    console.log(e.target)
  //    e.preventDefault()
     
 
 
    
  //   selectedPlayers.forEach(selectedPlayer=>{
  //    selectedPlayersUserIds.push(selectedPlayer.userId)
  //    selectedPlayersFullNames.push(selectedPlayer.fullname)
 
  //  })
  //    console.log(selectedPlayersUserIds)
  const x =  addDocument(  'events/'+ eventId +"/rounds/" + roundId+ "/groups",{
      
 
    selectedPlayers,
    groupNo:documents.length + 1
//      selectedPlayersFullNames,
    })
     
 
     
   }





  return (
    <div>
      {/* <button onClick={openModal}>Create Group</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form onSubmit={handleSubmit}>
        <Multiselect
            options= {selectedPlayerArray}
            closeOnSelect='true'
            displayValue="name"  // Property name to display in the dropdown options
            onSelect={(selectedList) => setSelectedPlayers(selectedList)}
            value={selectedPlayers}
          />
          <button>Submit</button>
        </form> 
      </Modal> */}


      {documents && documents.map((document) => (
          <li key={document.id}>
           <button onClick={()=>openModal(document.groupNo)}>{"Group " +document.id}</button>
      {console.log(document.id, modalIsOpenMap[document.groupNo])}
<Modal
key = {document.id}
       // isOpen={modalIsOpen}
       //isOpen ={modalIsOpenMap.get(document.id)}
       isOpen ={modalIsOpenMap[document.groupNo]}
       onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{"Group - " + document.id}</h2>
        <button onClick={closeModal}>close</button>
       
        <form onSubmit={handleSubmit}>
        <Multiselect
            options= {document.selectedPlayers}
            closeOnSelect='true'
            displayValue="name"  // Property name to display in the dropdown options
            onSelect={(selectedList) => setSelectedPlayers(selectedList)}
            value={selectedPlayers}
          />
          <button>Submit</button>
        </form>
      </Modal>


          </li>
        ))}








    </div>
  );
}

//ReactDOM.render(<App />, appElement);