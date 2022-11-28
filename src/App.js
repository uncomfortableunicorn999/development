import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import info from "./assets/info.json";
import recipeData from "./assets/info.json";
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Checkbox, FormGroup, ListItemSecondaryAction , Button} from '@material-ui/core';

import Recipe from './components/Recipe';
/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */

recipeData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});



function App() {
  const [totalTime, setTotal] = useState(0)
  const [sortState,setState] = useState({ selected: "" });
  const handleChange = ev => {
    console.log(ev.target.value)
    setState({ selected: ev.target.value });
  };
    const [times, setTimes] = useState({
      time1: false,
      time2: false,
      time3: false,
      time4: false
    });
  const [bookmarks, setBookmarks] = useState({
    "Apple Pie": false,
    "Apple Pear Galette With Apple Cider Caramel":false,
    "Chocolate Peanut Butter Pie":false,
    "Cranberry Lemon Meringue Pie":false,
    "Creme Brulee Pie":false,
    "Hazelnut, Pear and Cardamom Tart":false,
    "Dolester Miles's Lemon Meringue Tart":false,
    "Mississippi Mud Pie":false,
    "Pecan Sandie Pie":false,
    "Pumpkin Pie":false,
    "Chocolate Caramel Tart":false,
    "Sweet Potato Casserole Pie":false
  });


    const bookMarkHandler = (event) => {
      setBookmarks({ ...bookmarks, [event.target.value]: event.target.checked } )
            var num = parseInt(event.target.name)

        if(!event.target.checked){
        num= num*-1
      }
      setTotal(totalTime+num)
    };
  
      
    //   var num = parseInt(event.target.name)
    //   console.log(num)
    

    //   if(event.target.checked){
    //     setBookmarkItems([...bookMarkedItems, event.target.value])
    //   }else{
    //     setBookmarkItems( bookMarkedItems.filter(function(ele){ 
    //       return ele != event.target.value; 
    //   }))

    //   }
    
    const { time1, time2, time3, time4} = times;

    const selectTimeFilter = (event) => {
      setTimes({ ...times, [event.target.id]: event.target.checked });
    };

    const [authors, setAuthors] = useState({
      sifton: false,
      seneviratne: false,
      ko: false,
      guy: false,
      boer: false,
      severson: false,
      nyt: false,
      hesser: false
    });

    const { sifton, seneviratne, ko,guy,boer,severson,nyt,hesser} = authors;

    const selectAuthorFilter = (event) => {
      setAuthors({ ...authors, [event.target.id]: event.target.checked });
    };

    const resetHandler = (event)=> {
      setAuthors({sifton:false,seneviratne:false,ko:false,guy:false, boer:false, severson:false, nyt:false,hesser:false})
      setTimes({time1:false,time2:false, time3:false,time4:false})
      setBookmarks({"Apple Pear Galette With Apple Cider Caramel":false,"Apple Pie":false,
    "Chocolate Caramel Tart":false,"Cranberry Lemon Meringue Pie":false,
    "Chocolate Peanut Butter Pie":false,"Sweet Potato Casserole Pie":false,
    "Creme Brulee Pie":false, "Dolester Miles's Lemon Meringue Tart":false,
    "Mississippi Mud Pie":false,"Hazelnut, Pear and Cardamom Tart":false,
    "Pecan Sandie Pie":false,"Pumpkin Pie":false})
    setTotal(0)

    }
  

  const matchesTimeFilter = item =>{
    if (times["time1"] &&item.time <= 60 ) {
      return true
      
    } else if (times["time2"] && (item.time > 60 && item.time <= 120)) {
      return true
    }else if (times["time3"] && item.time > 120 && item.time <= 180) {
      return true
      
    }else if (times["time4"] &&item.time > 180 ) {
      return true
      
  }
  return false
};

const matchesAuthorFilter = item =>{
  if (authors["ko"] &&item.author=== "Genevieve Ko") {
    return true
  } else if (authors["sifton"] && item.author ==="Sam Sifton") {
    return true
  }else if (authors["seneviratne"] && item.author === "Samantha Seneviratne" ) {
    return true
  }else if (authors["guy"] && item.author === "Jerrelle Guy" ) {
    return true  
  }else if (authors["boer"] && item.author === "Clare do Boer" ) {
    return true  
  }else if (authors["severson"] && item.author === "Kim Severson" ) {
    return true  
  }else if (authors["nyt"] && item.author === "The New York Times" ) {
    return true  
  }else if (authors["hesser"] && item.author === "Amanda Hesser" ) {
    return true  
  }
return false
};

  const noAuthors = item => {
    for(var key in authors){
      if(authors[key]){
        return false;
      }
    }
    return true

  };
  const noTimes = item => {
    for(var key in times){
      if(times[key]){
        return false;
      }
    }
    return true

  };
  const matchesFilterType = item => {
	// all items should be shown when no filter is selected
    if(noAuthors(item) && noTimes(item)){
      return true
    }
    if(noAuthors(item)){
      return matchesTimeFilter(item)
    }
    if(noTimes(item)){
      return matchesAuthorFilter(item)
    }

    return matchesAuthorFilter(item) && matchesTimeFilter(item)
  
  };  

 
  const sortAlphabetically = (a,b) =>{
    if(sortState['selected'] ==="alphabetical"){
      console.log("should sort abc")
      if(a.name<b.name){
        return -1
      }
      return 1
    }
    
    if(sortState['selected']==="time"){
      console.log("should sort 123")

      return a.time - b.time;

    }
    return 0
  };

    

  
  const filteredData = recipeData.filter(matchesFilterType);


  





  return (

    
    <body>
      <div class="flex-col" className="App">
        <h1>Thanksgiving Pies</h1>

        <div class="d-flex">
        <aside class="MenuBar flex-row  ">
            <h1>Filter and Sort</h1>

            <div >
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sort By:</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  onChange={handleChange}
                  name="radio-buttons-group">
                  

                  <FormControlLabel value="alphabetical" control={<Radio />} label={<span style={{ fontSize: '1.25rem' }}>Alphabetical</span>} />
                  <FormControlLabel value="time" control={<Radio />} label={<span style={{ fontSize: '1.25rem' }}>Cook Time</span>}  />
                </RadioGroup>
              </FormControl>

            </div>
            <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Filter by Time:</FormLabel>
              <FormControlLabel label={<span style={{ fontSize: '1.25rem' }}>1 Hour or less</span>} control={<Checkbox checked={time1} onChange={selectTimeFilter} id={"time1"}/>} />
              <FormControlLabel label={<span style={{ fontSize: '1.25rem' }}>1 - 2 Hours</span>}control={<Checkbox checked={time2} onChange={selectTimeFilter} id={"time2"}/>}  />
              <FormControlLabel label={<span style={{ fontSize: '1.25rem' }}>2 - 3 Hours</span>}control={<Checkbox checked={time3} onChange={selectTimeFilter} id={"time3"}/>}  />
              <FormControlLabel label={<span style={{ fontSize: '1.25rem' }}>3+ Hours</span>}control={<Checkbox checked={time4} onChange={selectTimeFilter} id={"time4"}/>} />


            </FormControl>
            </div>
            { <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Filter By Author:</FormLabel>
              
              <FormControlLabel control={<Checkbox checked={ko} onChange={selectAuthorFilter} id={"ko"}/>} label={<span style={{ fontSize: '1.25rem' }}>Genevieve Ko</span>} />
              <FormControlLabel control={<Checkbox checked={guy} onChange={selectAuthorFilter} id={"guy"}/>} label={<span style={{ fontSize: '1.25rem' }}>Jerrelle Guy</span>} />
              <FormControlLabel control={<Checkbox checked={boer} onChange={selectAuthorFilter} id={"boer"} />} label={<span style={{ fontSize: '1.25rem' }}>Clare do Boer</span>}/>
              <FormControlLabel control={<Checkbox checked={severson} onChange={selectAuthorFilter} id={"severson"} />} label={<span style={{ fontSize: '1.25rem' }}>Kim Severson</span>} />
              <FormControlLabel control={<Checkbox checked={hesser} onChange={selectAuthorFilter} id={"hesser"} />} label={<span style={{ fontSize: '1.25rem' }}> Amanda Hesser</span>} />
              <FormControlLabel control={<Checkbox checked={nyt} onChange={selectAuthorFilter} id={"nyt"} />} label={<span style={{ fontSize: '1.25rem' }}>The New York Times</span>} />
              <FormControlLabel control={<Checkbox checked={seneviratne} onChange={selectAuthorFilter} id={"seneviratne"} />} label={<span style={{ fontSize: '1.25rem' }}>Samantha Seneviratne</span>} />
              <FormControlLabel control={<Checkbox checked={sifton} onChange={selectAuthorFilter} id={"sifton"} />} label={<span style={{ fontSize: '1.25rem' }}>Sam Sifton</span>} />
            </FormControl>
            </div> }
            <div>
              <h3>Bookmarks</h3>
              {Object.keys(bookmarks).filter(function(ele){
        return bookmarks[ele];
      }).map((item) => (<li>
                   {item}
                 </li>))}
              
              <p>Total time: {totalTime}</p>
            </div>
            <div>
              <Button variant="contained" onClick={() => resetHandler()}>Reset</Button>
            </div>

            {/* <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Filter By Bookmarks:</FormLabel>
              <FormControlLabel control={<Checkbox />} label="Bookmarks" />
              

            </FormControl>
            </div>
             */}
           

          </aside>
          <main class="Item-grid">
            {filteredData.sort(sortAlphabetically).map((item => ( // TODO: map bakeryData to BakeryItem components
              <Recipe item={item} handler={bookMarkHandler} bookmarkList={bookmarks}  />
            )))}
          </main>
        </div>


       

      </div>
    </body>

  );

}

export default App;
