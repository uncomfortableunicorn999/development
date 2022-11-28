// TODO: create a component that displays a single bakery item
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button ,Checkbox} from '@material-ui/core';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React from 'react';
const Recipe = (props) => {
    
 
    return (

        <div class="RecipeItem">
            <div class="flex-row">
                <img src={props.item.image} class="RecipeImage " alt={props.item.name} />
            </div>

            <div class="flex-row">
                <div>
                    <h2 class=" font-bold">{props.item.name}</h2>
                    <h5>{props.item.author}</h5>
                </div>
                <div class="flex items-center justify-between">
                    <h5>Time: {props.item.time} mins</h5>
                    <div className="download-file">
                        <Checkbox
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            onChange={props.handler}
                            checked ={props.bookmarkList[props.item.name]}
                            name= {props.item.time}
                            value ={props.item.name}
                        ></Checkbox>
                    </div>
                </div>
            </div>
        </div>


    );

};

export default Recipe;


