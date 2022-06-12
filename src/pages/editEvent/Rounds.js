
import AccordionItem from "../../components/AccordionItem";
// styles
import styles from  '../../components/Accordion.module.css'

import SubComponent from "./SubComponent";
import Test from "./Test";
import Groups from "./Groups";

export default function Rounds({SC,event,selectedPlayersOptions}) {

  console.log("in round event is - ", event)
  console.log("in round SP is - ",selectedPlayersOptions)
 
  const faqs = []


  for (let i = 0; i < event.eventRoundCount; i++) {
 faqs.push(i+1)
 }
 
    return (
     <div>
     <ul className={styles.accordion}>
       {faqs.map((faq, index) => (
         <AccordionItem eventId= {event.id} selectedPlayersOptions={selectedPlayersOptions} key={index} faq={faq} />
        
       ))}
     </ul>
     <SC foo = {<Groups/>}/>
     <SubComponent foo = {<Test/>}/>
     </div>
   ); 
 
   
   
   
 };


