import React,{useEffect,useState} from 'react'
import axios from 'axios';import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';


function Homepage() {
  const [admin,setadmin] =useState({email:'',pw:''});const[addevb,setaddevb]=useState(false);const [smary,setsmary]=useState([]);const[smaryview,setsmaryview]=useState(false)
  const [addevent,setaddevent] =useState({eventname:"",dateofevent:"",cheifguest:"",numofparticipants:"",outcome:"",accounttype:"",amount:"",done:""});const [sv,setsv]=useState(false)
  const [register,setregister]=useState(false);const [loginad,setloginad]=useState(true);const[addev,setaddev]=useState(false);const [dob,setdob]=useState('')
  const [match,setmatch]=useState(false);const [cpw,setcpw]=useState('');let [signup,setsignup]=useState(''),a=0;const[vw,setvw]=useState(false);const [sd,setsd]=useState(false)
  const [home,sethome]=useState(false);const[success,setsuccess]=useState(false); const [mul,setmul]=useState(false);const[pview,setpview]=useState(false)
  const [inputList, setInputList] = useState([{eventname:"",nameofparticular:"",amount:0}]);let data=[],edata=[],v=[];const[totalamount,settotalamount]=useState([])
  let [event,setevent]=useState([]); let [eventbt,seteventbt]=useState([]); let [filterevent,setfilterevent]=useState([]);const [start,setstart]=useState('');const [last,setlast]=useState('')
  let [change,setchange]=useState(false);let [count,setcount]=useState(0);const[val,setval]=useState('');const [value,setvalue]=useState([]);const [all,setall]=useState([])
  const [edited,setedited]=useState(false); const [editeb,setediteb]=useState(false);const [editp,seteditp]=useState(false);const [sum,setsum]=useState([])
  

  
//login   
  const login=()=>{	
axios.post('http://localhost:4000/login',admin).then((response) => {
    if(response.data!="") {setloginad(false);sethome(true);} else{setmatch(true)}},
    (error) => {console.log(error) });
}
//signin
const sign=()=>{
    if(admin.pw===cpw){
    axios.post('http://localhost:4000/createadmin',admin);setsignup(true)}
    else{setsignup(false)}
}
//add event budjet
const addevebud=()=>{
  inputList.map(i=>{i.eventname=val});
    axios.post('http://localhost:4000/createeventbudjet',inputList);
    setsuccess(true);
    let changeex={eventname:val,done:'1'}
    axios.post('http://localhost:4000/event/:eventname',changeex)
    setvalue(oldArray => [...oldArray,val]);
    count=0;
  setcount(0);
  inputList.map(e=>{e.amount=parseInt(e.amount);count=count+e.amount;})
    axios.post('http://localhost:4000/summary/:eventname',{eventname:val,tamount:count})
    setInputList([])
    
}
//add event
const addeve=()=>{
    addevent.accounttype=document.getElementById("account").value;
    axios.post('http://localhost:4000/createevent',addevent);
    axios.post('http://localhost:4000/createsummary',addevent)
    setsuccess(true)
}
//get all events
const eventbudt=()=>{setpview(false);setsmaryview(false);setsv(false);setsd(false)
  setevent([]);data=[];setval([]);setvalue([])
  axios.get('http://localhost:4000/event')
    .then((res) => {
      data.push(...res.data)
      setevent(data)
 }).catch((err) => {
      console.log(err);})
      setaddevb(true);
  setsuccess(false);setaddev(false);setmul(true);
call();}
//filter whose expenditure is not added
data=event.filter(word=>word.done!=="1");
filterevent=data;
const call=()=>{setfilterevent(filterevent); }


//updating expenditure
const aed=()=>{
  seteditp(false);setcount('');let n=[];
 inputList.map(k=>{k.eventname=addevent.eventname;
    axios.post('http://localhost:4000/eventbudjet/:eventname',k);
  })
  count=0;
  setcount(0);
  inputList.map(e=>{e.amount=parseInt(e.amount);count=count+e.amount;});
setcount(count);
  sum.map(e=>(e.eventname===addevent.eventname)?<>{count=count+e.tamount};{setcount(count)}</>:null);
axios.post('http://localhost:4000/summary/:eventname',{eventname:inputList[0].eventname,tamount:count})
n.push(...eventbt);n.push(...inputList)
 setsuccess(true);seteventbt(n)
 sum.map(e=>(e.eventname===addevent.eventname)?e.tamount=count:null);
 setsum(sum)

}
// handle input change
  const handleInputChange = (e, index) => {setcount('')
  
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
//getting value of a button clicked
  const addb=(e,index)=>{
   setval(index.eventname)
    setcount(0)
setchange(true);setsuccess(false);setInputList([{eventname:"",nameofparticular:"",amount:0}]);
  }
// handle click event of the Remove button
  const handleRemoveClick = index => {
    setcount('')
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 // handle click event of the Add button
  const handleAddClick = () => {setcount('')
    setInputList([...inputList,{eventname:"",nameofparticular:"",amount:0}]);
  };
//caluculating total of entered inputs
const total=()=>{
  count=0;
  setcount(0);
  inputList.map(e=>{
e.amount=parseInt(e.amount);count=count+e.amount;})
 setcount(count);setvw(true)

}
//close of all modals
const final=()=>{setchange(false);setedited(false);setediteb(false);seteditp(false)}
//edit the events
const editeventdetails=(e)=>{
  setaddevent(e);setedited(true)}
const led=()=>{setedited(false)
  axios.post('http://localhost:4000/event/:eventname',addevent);
  axios.post('http://localhost:4000/summary/:eventname',addevent);
  
}
//edit budjet
const editadvancedetails=(e)=>{
  setaddevent(e);
  setediteb(true)}
const ceb=()=>{
  setediteb(false);addevent.accounttype=document.getElementById("account").value;
    axios.post('http://localhost:4000/event/:eventname',addevent);
    axios.post('http://localhost:4000/summary/:eventname',addevent);
}
//edit expenditure
const editeventbudjet=(e)=>{
  setInputList([{eventname:"",nameofparticular:"",amount:0}])
  setsuccess(false);
  setaddevent(e);seteditp(true)
 }
//getting all past events and their budjets
const past=()=>{setsv(false);setsd(false);setsum([]);setall([])
  data=[];edata=[];seteventbt([]);v=[];setsmaryview(false)
  axios.get('http://localhost:4000/summary')
.then((res) => {
  v.push(...res.data)
  setsum(v)
   }).catch((err) => {
  console.log(err);})
  axios.get('http://localhost:4000/eventbudjet')
      .then((res) => {
        edata.push(...res.data)
        seteventbt(edata);
   }).catch((err) => {
        console.log(err);})
axios.get('http://localhost:4000/event')
        .then((res) => {
          data.push(...res.data)
          data=data.filter(word=>word.done==="1")
          setall(data)
           }).catch((err) => {
          console.log(err);});
  setpview(true);setaddev(false);setaddevb(false);
}

const send=(i)=>{
 axios.post('http://localhost:4000/summary/:eventname',{eventname:i.eventname,dateofbill:dob})
 let ddata=[];
 axios.get('http://localhost:4000/summary')
 .then((res) => {
  ddata.push(...res.data)
  setsum(ddata);
}).catch((err) => {
  console.log(err);})
}
const getsummary=()=>{let s=[];setsd(false)
 console.log(document.getElementById("accountsum").value)
 axios.get('http://localhost:4000/summary')
 .then((res) => {
   s.push(...res.data)
  setsmary(s)
}).catch((err) => {
  console.log(err);})
setsv(true)
}

const getdates=()=>{
  let m=[];setsv(false)
  axios.get('http://localhost:4000/summary')
  .then((res) => {
    m.push(...res.data)
   setsmary(m)
 }).catch((err) => {
   console.log(err);})
 setsd(true)
}
const sed=()=>{setedited(false)}

return (
        <div >
  
            {(loginad===true)?<><br/><br/>
              <h1 style={{color:"darkblue",fontWeight:"700",textAlign:"center",fontFamily:"Comic Sans MS"}}>ADMIN LOGIN </h1>
              <br/><br/>
         <form class="form-inline justify-content-center"> 
            <div class="card border-silver col-sm-5"><br/>
              {(match===true)?<span style={{color:"red"}}>INVALID email or password</span>:null}<br/>
                 <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{admin.email=e.target.value}} type="text" placeholder="email" require="true"/> <br/>
                 <input className="form-control form-control-sm ml-3 w-75" type="password"onChange={(e)=>{admin.pw=e.target.value}} placeholder="password"/><br/>
                 <form class="form-inline justify-content-center">
                 <Button  onClick={login}style={{width:"25%",fontWeight:"700"}}>LOGIN</Button> &nbsp;&nbsp; &nbsp;&nbsp;
                 <Button  onClick={()=>{setregister(true);setloginad(false)}} style={{width:"25%",fontWeight:"700",background:"white",color:"red"}}>SIGN UP</Button></form><br/>
         </div></form>
        </>
        :null}


          {(register===true)?<><br/>
               <form class="form-inline justify-content-center">
            <div class="card border-silver col-sm-5"><br/>
                 {(signup===true)?<span style={{color:"darkblue",fontWeight:"700"}}>Successfully Registered</span>:null}<br/>
                 {(signup===false)?<span style={{color:"red"}}>passwords are not matched</span>:null}<br/>
                 <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{admin.email=e.target.value}} type="text" placeholder="email"/> <br/>
                 <input className="form-control form-control-sm ml-3 w-75" type="password"onChange={(e)=>{admin.pw=e.target.value}} placeholder="password"/><br/>
                 <input className="form-control form-control-sm ml-3 w-75" type="password"onChange={(e)=>{setcpw(e.target.value)}} placeholder="confirm password"/><br/>
                 <form class="form-inline justify-content-center">
                 <Button onClick={sign}style={{width:"25%",fontWeight:"700"}}>SIGN UP</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                 <Button  style={{width:"25%",fontWeight:"700",background:"white",color:"red"}}onClick={()=>{setregister(false);setloginad(true)}}>BACK TO LOGIN</Button>
                 </form><br/>
         </div></form>
        </>
        :null}


      {(home===true)?<> 
            <br/>
            <div style={{backgroundColor:"#4B515D"}}>
            <Button variant="outline-secondary" onClick={()=>{setaddev(true);setaddevb(false);setsuccess(false);setpview(false);setval([]);setsv(false);setsd(false);setvalue([]);setsmaryview(false)}} style={{width:"25%",fontWeight:"700",color:"white"}}>ADD EVENT</Button>
            <Button variant="outline-secondary" onClick={past}style={{width:"25%",fontWeight:"700",color:"white"}}>PAST EVENTS</Button>
            <Button variant="outline-secondary" onClick={eventbudt}style={{width:"25%",fontWeight:"700",color:"white"}}>EVENT BUDJECT </Button>
            <Button variant="outline-secondary" onClick={()=>{setsmaryview(true);setaddev(false);setaddevb(false);setpview(false)}}style={{width:"25%",fontWeight:"700",color:"white"}}>SUMMARY</Button>
           </div>
           <br/>


        {(addev===true)?<>
            <form class="form-inline justify-content-center">
            <div class="card border-silver col-sm-8"><br/>
            {(success===true && addev==true)?
            <><span style={{color:"darkblue",fontWeight:"700"}}>Successfully submitted</span><br/></>:<><br/>
            <h5 style={{fontFamily:"Comic Sans MS",paddingRight:"80%",fontWeight:"700"}}>EVENT DETAILS</h5><br/>
            <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{addevent.eventname=e.target.value}} type="text" placeholder="eventname" /> <br/>
            <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{addevent.dateofevent=e.target.value}} type="date" placeholder="dateofevent"/> <br/>
            <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{addevent.cheifguest=e.target.value}} type="text" placeholder="cheifguest"/> <br/>
            <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{addevent.numofparticipants=e.target.value}} type="text" placeholder="numofparticipants"/> <br/>
            <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{addevent.outcome=e.target.value}} type="text" placeholder="outcome"/> <br/>
            <h5 style={{fontFamily:"Comic Sans MS",paddingRight:"80%",fontWeight:"700"}}>EVENT BUDJECT</h5><br/>
            <select class="form-control form-control-sm ml-3 w-75" id="account">
              <option value="NSS">NSS account</option>
              <option value="college">college account</option></select><br/>
            <input className="form-control form-control-sm ml-3 w-75" onChange={(e)=>{addevent.amount=e.target.value}} type="text" placeholder="advanceamount"/> <br/>
            <Button  onClick={addeve}style={{width:"25%",fontWeight:"700"}}>SUBMIT</Button></>}
             </div></form></>:null}


        {(addevb===true)?<>
            <form class="form-inline justify-content-center">
            <div class="card border-silver col-sm-8"><br/>
            <h5 style={{fontFamily:"Comic Sans MS",paddingRight:"80%",fontWeight:"700"}}>PENDING EVENTS BUDJET</h5><br/>
            {filterevent.map((j,emp)=>{
              return(
             <div class="card border-silver col-sm-8">{
               (!value.includes(j.eventname))?
               <Button variant="light"  id="id" value={j.eventname} onClick={(e)=>addb(e,j)} style={{fontWeight:"700"}}>
             {j.eventname} +</Button>:null}
           <Modal show={change} onHide={final}><br/>
              {(success===true)?<><span style={{color:"darkblue",fontWeight:"700",textAlign:"center"}}>Successfully submitted</span></>:<>
             <h5 style={{fontFamily:"Comic Sans MS",fontWeight:"700",textAlign:"center"}}>{val}</h5><br/>
                {inputList.map((x, i) => {
               return (<>
               <form class="form-inline justify-content-center">
               <input className="form-control"name="nameofparticular" value={x.nameofparticular} onChange={e => handleInputChange(e, i)} type="text" placeholder="name of particular"/> &nbsp;&nbsp;&nbsp;&nbsp;
               <input className="form-control" name="amount" value={x.amount} onChange={e => handleInputChange(e, i)} type="text" placeholder="amount"/> &nbsp;&nbsp;&nbsp;
               </form>  
                 <br/><form class="form-inline justify-content-center">
                 {inputList.length !== 1 && <Button  variant="danger" onClick={() => handleRemoveClick(i)} style={{width:"25%",fontWeight:"700"}}>Remove</Button>}&nbsp;&nbsp;&nbsp;
               {inputList.length - 1 === i &&  <Button onClick={handleAddClick} style={{width:"25%",fontWeight:"700"}}>Add Row</Button>}</form><br/>
                 </>      
               );})}</>}       
              {(success===false)?<form class="form-inline justify-content-center">
             <Button variant="secondary" onClick={total}style={{width:"25%",fontWeight:"700"}}>VIEW TOTAL</Button>&nbsp;&nbsp;
             {(vw==true && count!=0)?<h5 style={{fontFamily:"Comic Sans MS",fontWeight:"700"}}>{count} rupees</h5>:null}</form>:null}<br/>
             <form class="form-inline justify-content-center">
             {(success===false)?<>  <Button  onClick={(e)=>addevebud(e,j)} style={{width:"25%",fontWeight:"700"}}>SUBMIT</Button>&nbsp;&nbsp;</>:null}
               <Button  onClick={final}style={{width:"25%",fontWeight:"700"}}>CLOSE</Button></form><br/></Modal></div> )})}</div>
               </form></>:null}
           </>:null}


             {(pview===true)?<>
              
               <br/>{
                (all.map((i,index)=>(<><br/>
            <div class="container card border-secondary mb-3" style={{maxWidth: "50%"}}><br/><h5 style={{fontFamily:"Comic Sans MS",color:"#990049",fontWeight:"700",textAlign:"center"}}>EVENT DETAILS 
            <Button variant="light"  onClick={()=>editeventdetails(i)} style={{width:"10%",fontWeight:"700"}}> ✎ </Button></h5>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Event Name</div><div class="col-6 col-sm=6">{i.eventname}</div></div>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Date Of Event</div><div class="col-6 col-sm=6">{i.dateofevent}</div></div>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Cheif Guest</div><div class="col-6 col-sm=6">{i.cheifguest}</div></div>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Number Of Participants</div><div class="col-6 col-sm=6">{i.numofparticipants}</div></div>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Outcome</div><div class="col-6 col-sm=6">{i.outcome}</div></div>
           <br/> <h5 style={{fontFamily:"Comic Sans MS",fontWeight:"700",textAlign:"center" ,color:"darkblue"}}>ADVANCE BUDJET DETAILS<Button variant="light"  onClick={()=>editadvancedetails(i)} style={{width:"10%",fontWeight:"700"}}> ✎ </Button></h5>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Account Name</div><div class="col-6 col-sm=6">{i.accounttype}</div></div>
            <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">Amount</div><div class="col-6 col-sm=6">{i.amount}</div></div><br/>
            <h5 style={{fontFamily:"Comic Sans MS",color:"#990049",fontWeight:"700",textAlign:"center"}}>EVENT EXPENDITURE<Button variant="light"  onClick={()=>editeventbudjet(i)} style={{width:"10%",fontWeight:"700"}}> ✎</Button></h5> 
            <div class="row border" style={{fontWeight:"650",fontFamily:"Comic Sans MS",textAlign:"center",backgroundColor:"lightgrey"}}><div class="col-6 col-sm=6">Name of particular</div><div class="col-6 col-sm=6">Amount</div></div>
             {(eventbt.map(j=>((i.eventname===j.eventname)?<>
              <div class="row border" style={{fontWeight:"600",textAlign:"center"}}><div class="col-6 col-sm=6">{j.nameofparticular}</div><div class="col-6 col-sm=6">{j.amount}</div></div></>:null
             )))}<br/>
             {(sum.length!==0)?<> {(sum[index].dateofbill===null)? <form class="form-inline justify-content-center"> 
             <input className="form-control" type="date" onChange={(e)=>setdob(e.target.value)}/>&nbsp;&nbsp;&nbsp;&nbsp;
             <Button value={ i.eventname} onClick={(e)=>send(i)}>SEND</Button></form>:null}<br/>
             <span style={{fontFamily:"Comic Sans MS",fontWeight:"700",textAlign:"center" }}>Total Amount = {sum[index].tamount}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
             Advance = {i.amount}</span>
             <span style={{fontFamily:"Comic Sans MS",fontWeight:"700",textAlign:"center" ,color:"darkblue"}}>Amount : : 
            {((sum[index].tamount-i.amount)>=0)?`REFUND ${sum[index].tamount-i.amount}`:`BALANCE ${-(sum[index].tamount-i.amount)}`}</span><br/>
            </> :null} </div></>
              )))}</>:null}



           {(smaryview===true)?<><form class="form-inline justify-content-center">
            <select class="form-control form-control-sm ml-3 w-75" id="accountsum" onChange={()=>{setsv(false);setsd(false)}}>
              <option value="NSS">NSS account</option>
              <option value="college">college account</option>
              <option value="NSS college">BOTH accounts</option></select></form><br/><form class="form-inline justify-content-center">
             from : &nbsp;&nbsp;&nbsp;<input className="form-control" type="date" onChange={(e)=>{setstart(e.target.value);setsd(false)}}/>&nbsp;&nbsp;&nbsp; to :&nbsp;&nbsp;&nbsp;
              <input className="form-control" type="date" onChange={(e)=>{setlast(e.target.value);setsd(false)}}/></form><br/>
              <Button onClick={getsummary}>Get all events</Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={getdates}>Get events between selected dates</Button><br/>
              {(sv===true)?<>
             <br/>
              <div class="row border" style={{fontWeight:"700",textAlign:"center",padding:"1%",fontFamily:"Comic Sans MS"}}>
                <div class="col  ">Event Name</div><div class="col ">Date of Event</div>
                <div class="col ">Account Type</div><div class="col ">Total Amount</div><div class="col ">Date of Bill</div>
                </div>
                {(smary.length!==0)?<>
              {smary.map(word=>(<>
              
                {((document.getElementById("accountsum").value).includes(word.accounttype))?
                <>
                <div class="row border " style={{fontWeight:"550",textAlign:"center",padding:"1%"}}>
                <div class="col " >{word.eventname}</div><div class="col ">{word.dateofevent}</div>
                <div class="col ">{word.accounttype}</div><div class="col ">{word.tamount}</div><div class="col ">{word.dateofbill}</div>
                </div>      
                </>:null}</>))}</>:null}
                </>:null}
                {(sd===true)?<>
             <br/>
              <div class="row border" style={{fontWeight:"700",textAlign:"center",padding:"1%",fontFamily:"Comic Sans MS"}}>
                <div class="col  ">Event Name</div><div class="col ">Date of Event</div>
                <div class="col ">Account Type</div><div class="col ">Total Amount</div><div class="col ">Date of Bill</div>
                </div>
                {(smary.length!==0)?<>
              {smary.map(word=>(<>
                {((document.getElementById("accountsum").value).includes(word.accounttype)&& word.dateofevent>=start && word.dateofevent<=last)?
                <>
                <div class="row border " style={{fontWeight:"550",textAlign:"center",padding:"1%"}}>
                <div class="col " >{word.eventname}</div><div class="col ">{word.dateofevent}</div>
                <div class="col ">{word.accounttype}</div><div class="col ">{word.tamount}</div><div class="col ">{word.dateofbill}</div>
                </div>      
                </>:null}</>))}</>:null}
                </>:null}
                
             
                </>:null}


<Modal show={edited} onHide={sed}>
            <input className="form-control form-control-sm ml-3 w-75"   defaultValue={addevent.eventname} onChange={(e)=>{addevent.eventname=e.target.value}} disabled type="text" placeholder="eventname" /> <br/>
            <input className="form-control form-control-sm ml-3 w-75" defaultValue={addevent.dateofevent} onChange={(e)=>{addevent.dateofevent=e.target.value}} type="date" placeholder="dateofevent"/> <br/>
            <input className="form-control form-control-sm ml-3 w-75" defaultValue={addevent.cheifguest} onChange={(e)=>{addevent.cheifguest=e.target.value;}} type="text" placeholder="cheifguest" /> <br/>
            <input className="form-control form-control-sm ml-3 w-75"defaultValue={addevent.numofparticipants}onChange={(e)=>{addevent.numofparticipants=e.target.value}} type="text" placeholder="numofparticipants"/> <br/>
            <input className="form-control form-control-sm ml-3 w-75" defaultValue={addevent.outcome}onChange={(e)=>{addevent.outcome=e.target.value}} type="text" placeholder="outcome"/> <br/>
            <Button  onClick={led}style={{width:"25%",fontWeight:"700"}}>SUBMIT</Button> 
</Modal>


<Modal show={editeb} onHide={final}>
<select class="form-control form-control-sm ml-3 w-75" id="account">
              <option value="NSS">NSS account</option>
              <option value="college">college account</option></select><br/>
            <input className="form-control form-control-sm ml-3 w-75" defaultValue={addevent.amount} onChange={(e)=>{addevent.amount=e.target.value;}} type="text" placeholder="advanceamount"/> <br/>
            <Button  onClick={ceb}style={{width:"25%",fontWeight:"700"}}>SUBMIT</Button> 
</Modal>

<Modal show={editp} onHide={final}><br/>
            <>{inputList.map((x, i) => {
               return (<>
               <form class="form-inline justify-content-center">
               <input className="form-control"name="nameofparticular" value={x.nameofparticular} onChange={e => handleInputChange(e, i)} type="text" placeholder="name of particular"/> &nbsp;&nbsp;&nbsp;&nbsp;
               <input className="form-control" name="amount" value={x.amount} onChange={e => handleInputChange(e, i)} type="text" placeholder="amount"/> &nbsp;&nbsp;&nbsp;
               </form>  
                <br/><form class="form-inline justify-content-center">
                {inputList.length !== 1 && <Button  variant="danger" onClick={() => handleRemoveClick(i)} style={{width:"25%",fontWeight:"700"}}>Remove</Button>}&nbsp;&nbsp;&nbsp;
               {inputList.length - 1 === i &&  <Button onClick={handleAddClick} style={{width:"25%",fontWeight:"700"}}>Add Row</Button>}</form><br/></>);})}</>
              {(success===false)?<form class="form-inline justify-content-center">
              <Button variant="secondary" onClick={total}style={{width:"25%",fontWeight:"700"}}>VIEW TOTAL</Button>&nbsp;&nbsp;
             {(vw==true && count!=0)?<h5 style={{fontFamily:"Comic Sans MS",fontWeight:"700"}}>{count} rupees</h5>:null}</form>:null}<br/>
             <form class="form-inline justify-content-center">
             {(success===false)?<>  <Button  onClick={aed} style={{width:"25%",fontWeight:"700"}}>SUBMIT</Button>&nbsp;&nbsp;</>:null}</form><br/>
</Modal>

</div>
    )
}

export default Homepage
 